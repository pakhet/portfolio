terraform {
  required_version = ">= 1.6"
  required_providers {
    google      = { source = "hashicorp/google", version = "~> 6.0" }
    google-beta = { source = "hashicorp/google-beta", version = "~> 6.0" }
  }
  # State lives in a private GCS bucket. The bucket name is passed at init time
  # (`terraform init -backend-config="bucket=..."`) so it isn't in the public repo.
  backend "gcs" {
    prefix = "portfolio"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
}

data "google_project" "this" {}

# ── APIs ──────────────────────────────────────────────────────────────────────
locals {
  services = [
    "run.googleapis.com",
    "artifactregistry.googleapis.com",
    "iam.googleapis.com",
    "iamcredentials.googleapis.com",
    "sts.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "firebase.googleapis.com",
    "firebasehosting.googleapis.com",
    "billingbudgets.googleapis.com",
  ]
}

resource "google_project_service" "apis" {
  for_each           = toset(local.services)
  service            = each.value
  disable_on_destroy = false
}

# ── Container registry (with cleanup so storage stays inside the free tier) ───
resource "google_artifact_registry_repository" "images" {
  repository_id = "portfolio"
  location      = var.region
  format        = "DOCKER"
  description   = "Portfolio site images"

  docker_config { immutable_tags = true }

  cleanup_policy_dry_run = false
  cleanup_policies {
    id     = "keep-recent"
    action = "KEEP"
    most_recent_versions { keep_count = 5 }
  }
  cleanup_policies {
    id     = "delete-old"
    action = "DELETE"
    condition { older_than = "2592000s" } # 30 days
  }

  depends_on = [google_project_service.apis]
}

# ── Cloud Run service ─────────────────────────────────────────────────────────
# Runtime identity has zero IAM roles: the site needs no GCP API access.
resource "google_service_account" "runtime" {
  account_id   = "portfolio-runtime"
  display_name = "Portfolio Cloud Run runtime (no permissions)"
}

resource "google_cloud_run_v2_service" "site" {
  name                = var.service_name
  location            = var.region
  ingress             = "INGRESS_TRAFFIC_ALL"
  deletion_protection = false

  template {
    service_account                  = google_service_account.runtime.email
    max_instance_request_concurrency = 80
    scaling {
      min_instance_count = 0                 # scale to zero = ~$0 when idle
      max_instance_count = var.max_instances # hard cap on cost during traffic spikes
    }
    containers {
      # Placeholder until CI pushes the first real image; CI owns the image after that.
      image = "us-docker.pkg.dev/cloudrun/container/hello"
      ports { container_port = 8080 }
      resources {
        limits            = { cpu = "1", memory = "256Mi" }
        cpu_idle          = true # only billed while handling requests
        startup_cpu_boost = true
      }
      startup_probe {
        tcp_socket { port = 8080 } # works for both the placeholder and real image
      }
    }
  }

  lifecycle {
    ignore_changes = [template[0].containers[0].image, client, client_version]
  }

  depends_on = [google_project_service.apis]
}

# Public website: anyone may invoke it.
resource "google_cloud_run_v2_service_iam_member" "public" {
  name     = google_cloud_run_v2_service.site.name
  location = var.region
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# ── Firebase Hosting (free custom domain + CDN + TLS in front of Cloud Run) ───
resource "google_firebase_project" "this" {
  provider   = google-beta
  project    = var.project_id
  depends_on = [google_project_service.apis]
}

# ── Budget alert: email if spend goes above a few dollars ─────────────────────
resource "google_billing_budget" "monthly" {
  count           = var.billing_account_id == "" ? 0 : 1
  billing_account = var.billing_account_id
  display_name    = "portfolio-monthly"

  budget_filter { projects = ["projects/${data.google_project.this.number}"] }
  amount {
    specified_amount {
      currency_code = "USD"
      units         = tostring(var.monthly_budget_usd)
    }
  }
  threshold_rules { threshold_percent = 0.5 }
  threshold_rules { threshold_percent = 0.9 }
  threshold_rules { threshold_percent = 1.0 }

  depends_on = [google_project_service.apis]
}

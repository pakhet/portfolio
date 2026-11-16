# These values go into GitHub repository *variables* (Settings → Secrets and
# variables → Actions → Variables). None are secrets, but keeping them out of the
# code keeps the public repo free of project identifiers.

output "GCP_PROJECT_ID" { value = var.project_id }
output "GCP_REGION" { value = var.region }
output "GCP_WIF_PROVIDER" { value = google_iam_workload_identity_pool_provider.github.name }
output "GCP_DEPLOYER_SA" { value = google_service_account.deployer.email }
output "CLOUD_RUN_URL" { value = google_cloud_run_v2_service.site.uri }

variable "project_id" {
  description = "GCP project ID."
  type        = string
}

variable "region" {
  description = "Region for Cloud Run and Artifact Registry. us-central1 has the broadest free tier."
  type        = string
  default     = "us-central1"
}

variable "service_name" {
  description = "Cloud Run service name (must match firebase.json)."
  type        = string
  default     = "portfolio"
}

variable "max_instances" {
  description = "Upper bound on Cloud Run instances — a cost ceiling if the site is flooded."
  type        = number
  default     = 2
}

variable "github_repository_id" {
  description = "Numeric GitHub repository ID (gh api repos/OWNER/REPO --jq .id)."
  type        = string
}

variable "billing_account_id" {
  description = "Billing account ID for the budget alert. Leave empty to skip the budget."
  type        = string
  default     = ""
}

variable "monthly_budget_usd" {
  description = "Monthly budget that triggers email alerts at 50/90/100%."
  type        = number
  default     = 5
}

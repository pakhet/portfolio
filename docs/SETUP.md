# First-time setup

You do this once. After that, every push to `main` deploys automatically.

## 0. Install tools (macOS)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node gh terraform helm kind gitleaks
brew install --cask google-cloud-sdk docker
```

## 1. GitHub repository

1. Set your commit email to your GitHub **noreply** address, so your personal email never ends up in public commit history. You'll find it under GitHub → Settings → Emails → "Keep my email addresses private".
   `git config --global user.email "<id>+<username>@users.noreply.github.com"`
2. Create the repo (public) and push:
   `gh repo create portfolio --public --source . --push`
3. In the repo settings:
   - **Settings → Code security:** turn on secret scanning and push protection. Both are free for public repos.
   - **Settings → Environments:** create `production` and restrict it to the `main` branch.
   - **Settings → Branches:** protect `main` by requiring a PR and passing `pipeline` checks.
4. Get the numeric repo ID for Terraform: `gh api repos/<you>/portfolio --jq .id`

## 2. GCP project

```bash
gcloud auth login
gcloud projects create <project-id>
gcloud billing projects link <project-id> --billing-account <billing-account-id>
gcloud config set project <project-id>
gcloud auth application-default login
```

Create a private bucket for Terraform state:

```bash
gcloud storage buckets create gs://<project-id>-tfstate --location us-central1 --uniform-bucket-level-access --public-access-prevention
gcloud storage buckets update gs://<project-id>-tfstate --versioning
```

## 3. Terraform

```bash
cd infra/terraform
cp terraform.tfvars.example terraform.tfvars   # fill in; this file is git-ignored
terraform init -backend-config="bucket=<project-id>-tfstate"
terraform apply
terraform output
```

Copy each output into **GitHub → Settings → Secrets and variables → Actions → Variables**:
`GCP_PROJECT_ID`, `GCP_REGION`, `GCP_WIF_PROVIDER` and `GCP_DEPLOYER_SA`.

Push any commit to `main`, and the pipeline builds, signs and deploys the site.
Your site is now live at `https://<project-id>.web.app`.

## 4. Register a domain and connect it

**Registrar:** use one that sells at cost and includes WHOIS privacy for free,
such as **Cloudflare Registrar** or **Porkbun**. Turn on 2FA (a hardware key or
passkey if offered) and registrar lock right away. Your domain is a high-value
target: whoever controls its DNS can issue TLS certificates for it.

**Choosing a name:** your name (`rachelcoleman.dev`, `.com`, `.io`) ages well.
`.dev` forces HTTPS in every browser, which is a nice touch for a security professional.

**Connect it to Firebase Hosting:**

1. Open Firebase console → Hosting → **Add custom domain**, and enter the apex domain (and `www`).
2. Firebase shows a **TXT** record (ownership) and **A** records. Add them at your registrar's DNS.
   On Cloudflare, set these records to **DNS only** (grey cloud) so Firebase can issue the certificate.
3. Wait for "Connected" and the certificate to issue. It usually takes minutes, but can take up to 24 hours.
4. Harden the DNS:
   - **DNSSEC:** turn it on at the registrar.
   - **CAA records:** only allow the CAs Firebase uses to issue certificates for your domain:
     ```
     CAA 0 issue "pki.goog"
     CAA 0 issue "letsencrypt.org"
     ```
   - **Email spoofing protection:** if you won't send mail from the domain, publish records that stop anyone spoofing it:
     ```
     TXT  @        "v=spf1 -all"
     TXT  _dmarc   "v=DMARC1; p=reject; adkim=s; aspf=s"
     MX   @        0 .
     ```

## Monthly cost, roughly

| Item | Cost |
|---|---|
| Cloud Run (scale-to-zero, free tier: 2M requests/mo) | $0 |
| Firebase Hosting (free tier: 10 GB storage, 360 MB/day transfer) | $0 |
| Artifact Registry (≤5 images, ~0.5 GB free) | ~$0 |
| Terraform state bucket | < $0.05 |
| Domain | ~$10–15 **per year** |

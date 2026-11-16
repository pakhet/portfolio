# Portfolio

Personal portfolio site plus a home for security projects. It's built like a
production service on purpose: containerized, defined as code, deployed by a
keyless CI/CD pipeline with supply-chain controls. It also costs about $0 a month to run.

## Architecture

```
GitHub ── PR ──► CI: build · npm audit · gitleaks · Trivy (image + IaC) · helm lint · kind deploy test
   │
   └─ main ──► CD (OIDC → Workload Identity Federation, no stored keys)
                 ├─ build image → Artifact Registry (immutable tags, cleanup policy)
                 ├─ SBOM (SPDX) + cosign keyless signature & attestation
                 ├─ deploy → Cloud Run (scale-to-zero, max 2 instances, zero-permission runtime SA)
                 └─ Firebase Hosting (custom domain, managed TLS, global CDN) ──rewrite──► Cloud Run
```

| Path | What |
|---|---|
| `site/` | Astro static site, hardened nginx config, Dockerfile |
| `deploy/helm/portfolio/` | Helm chart: non-root, read-only root FS, all caps dropped, seccomp, default-deny NetworkPolicy, PDB |
| `infra/terraform/` | All GCP resources: APIs, registry, Cloud Run, WIF, least-privilege IAM, budget alert |
| `.github/workflows/pipeline.yml` | CI + CD |

## Why Cloud Run and not Kubernetes?

The same image deploys to Kubernetes (CI proves this on every PR with a
throwaway [kind](https://kind.sigs.k8s.io) cluster). Production runs on Cloud
Run because, for a low-traffic static site, a GKE cluster would cost roughly
$20–60 a month for capacity sitting idle. Cloud Run scales to zero and stays inside the
free tier. If this ever outgrows it, the Helm chart is ready to go.

## Security posture

- **No long-lived credentials.** CI authenticates through OIDC and Workload Identity Federation. The trust is pinned to this repo's numeric ID and the `production` environment.
- **Least privilege.** The deployer's roles are scoped per resource. The runtime service account has no roles at all.
- **Supply chain.** Dependabot keeps dependencies current, and Trivy fails the build on fixable HIGH/CRITICAL CVEs or IaC misconfigurations. Every release gets an SBOM and a signed image, verifiable with `cosign verify`.
- **Hardened serving.** The site is static and loads no JavaScript. It's served by unprivileged nginx with a strict CSP (`default-src 'none'`), HSTS, COOP/CORP and Permissions-Policy, and the server version is hidden.
- **Cost guardrails.** Cloud Run is capped at a maximum instance count, there's a budget alert, and the registry has a cleanup policy.

## Local development

```bash
cd site && npm install && npm run dev
```

See [docs/SETUP.md](docs/SETUP.md) for first-time cloud setup and domain registration.

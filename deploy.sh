#!/bin/bash
# Deploy fafo-utah-kirk to Cloudflare Pages (direct-upload project, not Git-connected).
# Cloudflare Pages is the canonical site and normally deploys AUTOMATICALLY on push via
# .github/workflows/deploy.yml (GitHub Pages is disabled). This script is the manual
# fallback if Actions is down or the CLOUDFLARE_API_TOKEN secret breaks:
#   bash deploy.sh
# Auth: reads the wrangler OAuth token from its (XDG-relocated) config. If expired,
# run `npx wrangler login` first and approve in the browser.
set -e
cd "$(dirname "$0")"
STAGE=$(mktemp -d)
git archive main | tar -x -C "$STAGE"
export CLOUDFLARE_API_TOKEN=$(python -c "
import re
t = open(r'C:/Users/walki/AppData/Roaming/xdg.config/.wrangler/config/default.toml').read()
print(re.search(r'oauth_token = \"([^\"]+)\"', t).group(1))")
export CLOUDFLARE_ACCOUNT_ID="4ff969ce831c43ea0c37553883217353"
npx wrangler pages deploy "$STAGE" --project-name fafo-utah-kirk --branch main --commit-dirty=true
rm -rf "$STAGE"

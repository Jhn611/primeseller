# Deploy

## Local check

```bash
npm ci
npm run build
docker compose up -d --build
```

The container serves the site on `127.0.0.1:3340`.

## Server deploy from GitHub

```bash
cd /opt/ivanjhn
git clone https://github.com/<USER>/<REPO>.git business-card-site
cd business-card-site
docker compose up -d --build
```

For updates:

```bash
cd /opt/ivanjhn/business-card-site
git pull --ff-only
docker compose up -d --build
```

## Caddy example

Add a site block that proxies your domain to the container:

```caddy
example.ivanjhn.ru {
    reverse_proxy 127.0.0.1:3340
}
```

Then validate and reload:

```bash
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

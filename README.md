# Rubiks-Gem
Generate images of OLLs and PLLs cases.

**Demo:** https://rubiks.luiz734.qzz.io/

## Screenshots
![full-app](screenshots/full-pll.png "")

Change the looking as you like:

![full-app](screenshots/t-shape.png "")

Remove background, captions and export:

![full-app](screenshots/corners.png "")


## Build using Docker (better)
```bash
docker compose run --rm build
```
Or with podman:
```bash
podman compose run --rm build
```

# Build manually
```bash
npm run build
```
After that check the `dist` directory.

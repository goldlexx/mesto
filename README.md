# Mesto — vanilla JavaScript app

Mesto is a photo-sharing interface built with JavaScript modules and Webpack. User profiles and cards are loaded from the Practicum Mesto API.

## Run locally

```
git clone https://github.com/goldlexx/mesto.git
cd mesto
npm ci
npm run dev
```

## Backend access

The app requires a compatible Mesto API for profile and card operations. No access token is embedded in the frontend source or bundle. Browser-side environment variables are public after a build; use an authorized backend or proxy to provide credentials safely. If the API is unavailable, the page shows the failed request instead of silently logging it.

`MESTO_API_BASE_URL` can be set in the environment before building to point at a compatible API base URL. The default remains the historical Practicum cohort endpoint.

## Build

```sh
npm run build
```

The published demo is [available on GitHub Pages](https://goldlexx.github.io/mesto/).










# Chess Advisor — Vercel Site

Static download page for private distribution of ChessAdvisor_AutoDetect.

## Setup

### 1. Set your password

Run this in Node.js (or the browser console) to get the SHA-256 hash of your chosen password:

```js
crypto.subtle.digest('SHA-256', new TextEncoder().encode('yourpassword'))
  .then(b => console.log([...new Uint8Array(b)].map(x => x.toString(16).padStart(2,'0')).join('')))
```

Paste the resulting hex string into `public/index.html`, replacing `REPLACE_WITH_SHA256_OF_YOUR_PASSWORD`.

### 2. Host the download zip

Upload `dist/ChessAdvisor_AutoDetect.zip` somewhere (GitHub Releases, Google Drive direct link, etc.)
and replace `DOWNLOAD_URL_HERE` in `public/index.html` with the direct download URL.

> **GitHub Releases** is recommended — upload the zip as a release asset and use the asset URL.

### 3. Deploy to Vercel

```bash
npm i -g vercel   # one-time
cd vercel_site
vercel --prod
```

Vercel will serve:
- `/`             → the download page
- `/pieces/*.png` → piece template images (used by the page's preview strip)

## File structure

```
vercel_site/
  vercel.json          routing + cache headers
  public/
    index.html         the page
    pieces/            25 piece PNGs served as CDN assets
```

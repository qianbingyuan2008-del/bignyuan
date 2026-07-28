import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'

await rm('dist', { recursive: true, force: true })
await mkdir('dist/src', { recursive: true })
await mkdir('dist/server', { recursive: true })
await mkdir('dist/.openai', { recursive: true })
await mkdir('dist/public', { recursive: true })
await cp('index.html', 'dist/index.html')
await cp('src/main.js', 'dist/src/main.js')
await cp('src/style.css', 'dist/src/style.css')
await cp('.openai/hosting.json', 'dist/.openai/hosting.json')
await cp('public', 'dist/public', { recursive: true })
await cp('CNAME', 'dist/CNAME')
await cp('.nojekyll', 'dist/.nojekyll')
await cp('404.html', 'dist/404.html')
await cp('robots.txt', 'dist/robots.txt')
await cp('sitemap.xml', 'dist/sitemap.xml')

const inlineAssets = [
  { path: 'public/images/qianbingyuan-portrait.jpg', mime: 'image/jpeg' },
  { path: 'public/images/qianbingyuan-mountain.jpg', mime: 'image/jpeg' },
  { path: 'public/images/life-sunset.jpg', mime: 'image/jpeg' },
  { path: 'public/images/travel-bridge.jpg', mime: 'image/jpeg' },
  { path: 'public/images/travel-mountain.jpg', mime: 'image/jpeg' },
  { path: 'public/images/travel-city-lake.jpg', mime: 'image/jpeg' },
  { path: 'public/images/hands-on-beads.jpg', mime: 'image/jpeg' },
  { path: 'public/images/qianbingyuan-portrait.webp', mime: 'image/webp' },
  { path: 'public/images/qianbingyuan-mountain.webp', mime: 'image/webp' },
  { path: 'public/images/life-sunset.webp', mime: 'image/webp' },
  { path: 'public/images/travel-bridge.webp', mime: 'image/webp' },
  { path: 'public/images/travel-mountain.webp', mime: 'image/webp' },
  { path: 'public/images/travel-city-lake.webp', mime: 'image/webp' },
  { path: 'public/images/hands-on-beads.webp', mime: 'image/webp' },
  { path: 'public/images/social-cover-og.png', mime: 'image/png' },
  { path: 'public/favicon.svg', mime: 'image/svg+xml' }
]
const images = new Map()

for (const asset of inlineAssets) {
  const data = (await readFile(asset.path)).toString('base64')
  images.set(`./${asset.path}`, `data:${asset.mime};base64,${data}`)
}

const css = await readFile('src/style.css', 'utf8')
const js = await readFile('src/main.js', 'utf8')
let html = await readFile('index.html', 'utf8')

html = html
  .replace('<link rel="stylesheet" href="./src/style.css" />', `<style>${css}</style>`)
  .replace('<script type="module" src="./src/main.js"></script>', `<script type="module">${js}</script>`)

for (const [imagePath, dataUri] of images) {
  html = html.replaceAll(imagePath, dataUri)
}

const worker = `const html = ${JSON.stringify(html)};
export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname !== "/" && url.pathname !== "/index.html") {
      return new Response("Not found", { status: 404 });
    }
    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=UTF-8",
        "cache-control": "public, max-age=300"
      }
    });
  }
};`
await writeFile('dist/server/index.js', worker)

console.log('Static site built successfully in dist/')

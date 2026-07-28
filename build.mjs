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

const imagePaths = [
  'qianbingyuan-portrait.jpg',
  'qianbingyuan-mountain.jpg',
  'life-sunset.jpg',
  'travel-bridge.jpg',
  'travel-mountain.jpg',
  'travel-city-lake.jpg',
  'hands-on-beads.jpg'
]
const images = new Map()

for (const imagePath of imagePaths) {
  const data = (await readFile(`public/images/${imagePath}`)).toString('base64')
  images.set(`./public/images/${imagePath}`, `data:image/jpeg;base64,${data}`)
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

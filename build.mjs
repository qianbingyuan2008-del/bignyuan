import { cp, mkdir, rm } from 'node:fs/promises'

await rm('dist', { recursive: true, force: true })
await mkdir('dist/src', { recursive: true })
await mkdir('dist/server', { recursive: true })
await mkdir('dist/.openai', { recursive: true })
await cp('index.html', 'dist/index.html')
await cp('src/main.js', 'dist/src/main.js')
await cp('src/style.css', 'dist/src/style.css')
await cp('server/index.js', 'dist/server/index.js')
await cp('.openai/hosting.json', 'dist/.openai/hosting.json')
await cp('public', 'dist', { recursive: true })

console.log('Static site built successfully in dist/')

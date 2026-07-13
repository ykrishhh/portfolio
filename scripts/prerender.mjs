/**
 * Post-build prerender script.
 * Renders the SPA to static HTML using puppeteer-core + system Chrome.
 * Only runs when CI=true or PRERENDER=true env var is set.
 *
 * Usage: PRERENDER=true node scripts/prerender.mjs
 */

const { execSync } = await import('child_process');
const { existsSync, readFileSync, writeFileSync } = await import('fs');
const { resolve, dirname } = await import('path');
const { fileURLToPath } = await import('url');

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const distDir = resolve(root, 'dist');
const indexHtml = resolve(distDir, 'index.html');

async function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/snap/bin/chromium',
  ];
  // Add common macOS/Windows paths for local dev
  if (process.platform === 'darwin') {
    candidates.push(
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
    );
  }
  if (process.platform === 'win32') {
    candidates.push(
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    );
  }

  for (const path of candidates) {
    if (path && existsSync(path)) return path;
  }

  // Try `which`
  try {
    const out = execSync('which google-chrome google-chrome-stable chromium chromium-browser 2>/dev/null', {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    const first = out.trim().split('\n')[0];
    if (first) return first;
  } catch {}

  return null;
}

async function prerender() {
  if (!process.env.CI && !process.env.PRERENDER) {
    console.log('[prerender] Skipping — set CI=true or PRERENDER=true to enable');
    return;
  }

  const chromePath = await findChrome();
  if (!chromePath) {
    console.warn('[prerender] No Chrome/Chromium found. Skipping prerender.');
    return;
  }

  console.log(`[prerender] Using Chrome: ${chromePath}`);

  const { launch } = await import('puppeteer-core');
  const { createServer } = await import('vite');

  let server;
  let browser;

  try {
    // Start preview server on a random port
    server = await createServer({
      root,
      server: { port: 0, strictPort: false },
      preview: { port: 0, strictPort: false },
      configFile: resolve(root, 'vite.config.ts'),
    });
    await server.listen();

    const addr = server.httpServer.address();
    const port = typeof addr === 'object' ? addr.port : 4173;
    const url = `http://localhost:${port}/portfolio/`;

    console.log(`[prerender] Preview server at ${url}`);

    browser = await launch({
      executablePath: chromePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Give React a moment to render
    await page.evaluate(() => new Promise((r) => setTimeout(r, 1000)));

    const html = await page.content();

    // Inject prerendered content into the original index.html
    const original = readFileSync(indexHtml, 'utf-8');
    const originalRoot = '<div id="root"></div>';
    const renderedRoot = html.match(/<div id="root">[\s\S]*?<\/div>/)?.[0];

    if (renderedRoot) {
      const result = original.replace(originalRoot, renderedRoot);
      writeFileSync(indexHtml, result, 'utf-8');
      console.log('[prerender] ✅ Injected rendered content into index.html');
    } else {
      console.warn('[prerender] ⚠️ Could not find rendered #root content');
    }

    const size = Buffer.byteLength(readFileSync(indexHtml, 'utf-8'), 'utf-8');
    console.log(`[prerender] index.html size: ${(size / 1024).toFixed(1)} KB`);
  } catch (err) {
    console.error('[prerender] ❌ Failed:', err.message);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
    if (server) await server.close();
  }
}

await prerender();

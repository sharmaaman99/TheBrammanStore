const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('[POSTINSTALL] Running postinstall safeguard for Render / CI environment...');

// 1. Build Vite assets automatically if this is a frontend app (Admin or Website)
// This guarantees `dist/` exists even if the Render build command is only `npm install`
try {
  const cwd = process.cwd();
  const hasIndexHtml = fs.existsSync(path.join(cwd, 'index.html'));
  const viteBin = path.join(cwd, 'node_modules', '.bin', 'vite');
  const hasVite = fs.existsSync(viteBin);

  if (hasIndexHtml && hasVite) {
    console.log('[POSTINSTALL] Frontend detected. Auto-building production assets to "dist/"...');
    execSync(`"${viteBin}" build`, { stdio: 'inherit' });
    console.log('[POSTINSTALL] Production build completed! "dist/" directory is ready.');
  }
} catch (buildErr) {
  console.warn('[POSTINSTALL] Vite auto-build note:', buildErr.message);
}

// 2. Safeguard for `npm build` typo in node_modules/.bin
try {
  const binDir = path.join(process.cwd(), 'node_modules', '.bin');
  if (fs.existsSync(binDir)) {
    const localNpm = path.join(binDir, 'npm');
    const npmScript = `#!/usr/bin/env sh
if [ "$1" = "build" ]; then
  shift
  exec npx vite build "$@"
fi
exec npm "$@"
`;
    fs.writeFileSync(localNpm, npmScript, { mode: 0o755 });
  }
} catch (shimErr) {
  // Silent safeguard
}

console.log('[POSTINSTALL] Safeguard complete.');

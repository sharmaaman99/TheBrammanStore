const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('[POSTINSTALL] Running postinstall safeguard for Render / CI environment...');

const isRender = process.env.RENDER === 'true' || 
                 process.env.CI === 'true' || 
                 (process.cwd && process.cwd().includes('/render')) || 
                 (process.env.NODE_ENV === 'production' && process.platform !== 'darwin');

// 1. Shim npm on Render/Linux so that accidental `npm build` executes `npm run build`
if (isRender) {
  try {
    const npmPath = execSync('which npm', { encoding: 'utf8' }).trim();
    if (npmPath && fs.existsSync(npmPath)) {
      const realCliPath = fs.realpathSync(npmPath);
      const currentContent = fs.readFileSync(npmPath, 'utf8');
      if (!currentContent.includes('SHIM_NPM_BUILD_APPLIED')) {
        const shimScript = `#!/usr/bin/env sh
# SHIM_NPM_BUILD_APPLIED
if [ "$1" = "build" ]; then
  shift
  exec node "${realCliPath}" run build "$@"
fi
exec node "${realCliPath}" "$@"
`;
        fs.writeFileSync(npmPath, shimScript, { mode: 0o755 });
        console.log('[POSTINSTALL] Successfully shimmied npm: "npm build" aliases to "npm run build".');
      }
    }
  } catch (err) {
    console.warn('[POSTINSTALL] Notice: Could not shim npm binary (non-fatal):', err.message);
  }
}

// 2. Graceful completion
console.log('[POSTINSTALL] Safeguard complete.');

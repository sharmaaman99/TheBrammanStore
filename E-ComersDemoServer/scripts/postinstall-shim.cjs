const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('[POSTINSTALL] Running postinstall safeguard for Render / CI environment...');

// Server environment does not require static build
console.log('[POSTINSTALL] Server environment ready.');

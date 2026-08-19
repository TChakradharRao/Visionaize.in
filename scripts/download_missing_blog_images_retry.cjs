const fs = require('fs');
const path = require('path');
const https = require('https');

const outDir = path.join(__dirname, '..', 'public', 'blog-images');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const items = [
  {
    url: 'https://visionaize.com/wp-content/uploads/2025/12/image-101-3.png',
    target: 'the-rise-of-autonomous-industrial-control-cover.png',
  },
  {
    url: 'https://visionaize.com/wp-content/uploads/2025/07/Blog-01.07.2025-Robots-and-Digital-Twins-1.png',
    target: 'robots-digital-twin-powering-nextgen-industrial-operations-cover.png',
  },
];
const agent = new https.Agent({ rejectUnauthorized: false });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { agent }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        req.destroy();
        return resolve(download(res.headers.location, dest));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', reject);
    });
    req.on('error', reject);
  });
}

(async () => {
  for (const item of items) {
    const dest = path.join(outDir, item.target);
    if (fs.existsSync(dest)) {
      console.log('Already exists:', item.target);
      continue;
    }
    process.stdout.write(`Downloading ${item.target} ... `);
    try {
      await download(item.url, dest);
      console.log('OK');
    } catch (err) {
      console.log('FAILED', err.message);
    }
  }
})();

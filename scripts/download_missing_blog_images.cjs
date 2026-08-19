const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const outDir = path.join(__dirname, '..', 'public', 'blog-images');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = [
  {
    url: 'https://visionaize.com/wp-content/uploads/2025/12/image-101-3.png',
    target: 'the-rise-of-autonomous-industrial-control-cover.png',
  },
  {
    url: 'https://visionaize.com/wp-content/uploads/2025/07/Blog-01.07.2025-Robots-and-Digital-Twins-1.png',
    target: 'robots-digital-twin-powering-nextgen-industrial-operations-cover.png',
  },
  {
    url: 'https://visionaize.in/wp-content/uploads/2025/02/52600491442.png',
    target: 'bridging-the-data-gap-how-ai-and-3d-digital-twins-unlock-real-time-emissions-monitoring-in-the-process-industry-cover.png',
  },
  {
    url: 'https://visionaize.in/wp-content/uploads/2024/10/58334483549.png',
    target: 'a-beginners-guide-to-anomaly-detection-in-machine-learning-for-heavy-industry-cover.png',
  },
  {
    url: 'https://visionaize.in/wp-content/uploads/2024/08/image-17.png',
    target: 'digital-twins-and-ai-a-perfect-match-for-predictive-maintenance-in-oil-and-gas-cover.png',
  },
];

function download(url, dest) {
  const urlObj = new URL(url);
  const client = urlObj.protocol === 'https:' ? https : http;
  return new Promise((resolve, reject) => {
    const req = client.get(urlObj, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log('redirect to', res.headers.location);
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
  for (const { url, target } of files) {
    const dest = path.join(outDir, target);
    if (fs.existsSync(dest)) {
      console.log('Already exists:', target);
      continue;
    }
    process.stdout.write(`Downloading ${target} ... `);
    try {
      await download(url, dest);
      console.log('OK');
    } catch (err) {
      console.log('FAILED', err.message);
    }
  }
})();

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const jsonPath = path.join(__dirname, '..', 'src', 'data', 'blogs.json');
const outDir = path.join(__dirname, '..', 'public', 'blog-images');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function download(url, dest) {
  const urlObj = new URL(url);
  const client = urlObj.protocol === 'https:' ? https : http;
  return new Promise((resolve, reject) => {
    const req = client.get(urlObj, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
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

function safeFileName(value) {
  return value
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-+|-+$)/g, '')
    .toLowerCase();
}

function getExtension(url) {
  try {
    const urlObj = new URL(url);
    const ext = path.extname(urlObj.pathname).toLowerCase();
    return ext || '.png';
  } catch {
    return '.png';
  }
}

function getBaseName(url) {
  try {
    const urlObj = new URL(url);
    return path.basename(urlObj.pathname, path.extname(urlObj.pathname));
  } catch {
    return 'image';
  }
}

const imageRegex = /https?:\/\/[^"]+\.(?:png|jpg|jpeg|gif|webp|svg)(?:\?[^\s"']*)?/gi;
const raw = fs.readFileSync(jsonPath, 'utf8');
const data = JSON.parse(raw);
const urlMeta = new Map();

function collectImageUrls(value, slug, pathKeys) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectImageUrls(item, slug, [...pathKeys, String(index)]));
    return;
  }
  if (value && typeof value === 'object') {
    const nextSlug = typeof value.slug === 'string' ? value.slug : slug;
    Object.entries(value).forEach(([key, item]) => collectImageUrls(item, nextSlug, [...pathKeys, key]));
    return;
  }
  if (typeof value === 'string') {
    const matches = value.match(imageRegex);
    if (!matches) return;
    for (const url of matches) {
      const meta = urlMeta.get(url) || {
        url,
        slugs: new Set(),
        keys: new Set(),
        count: 0,
      };
      if (slug) meta.slugs.add(slug);
      if (pathKeys.length > 0) meta.keys.add(pathKeys[pathKeys.length - 1]);
      meta.count += 1;
      urlMeta.set(url, meta);
    }
  }
}

if (!Array.isArray(data)) {
  throw new Error('Expected blogs.json to be an array of posts');
}

data.forEach((post) => {
  const slug = typeof post.slug === 'string' ? post.slug : 'post';
  collectImageUrls(post, slug, ['post', slug]);
});

const usedFileNames = new Set();

function buildFileName(meta) {
  const ext = getExtension(meta.url);
  const slug = meta.slugs.size === 1 ? [...meta.slugs][0] : 'shared';
  let name;
  if (meta.keys.has('cover_image')) {
    name = `${slug}-cover`;
  } else {
    const base = safeFileName(getBaseName(meta.url)) || 'image';
    name = `${slug}-${base}`;
  }
  name = safeFileName(name) || 'image';
  let candidate = `${name}${ext}`;
  let counter = 1;
  while (usedFileNames.has(candidate)) {
    candidate = `${name}-${counter}${ext}`;
    counter += 1;
  }
  usedFileNames.add(candidate);
  return candidate;
}

for (const meta of urlMeta.values()) {
  meta.fileName = buildFileName(meta);
}

function rewriteValue(value) {
  if (Array.isArray(value)) {
    return value.map(rewriteValue);
  }
  if (value && typeof value === 'object') {
    const newObj = {};
    for (const [key, item] of Object.entries(value)) {
      newObj[key] = rewriteValue(item);
    }
    return newObj;
  }
  if (typeof value === 'string') {
    let newValue = value;
    for (const [url, meta] of urlMeta.entries()) {
      if (newValue.includes(url)) {
        newValue = newValue.split(url).join(`/blog-images/${meta.fileName}`);
      }
    }
    return newValue;
  }
  return value;
}

const updatedData = rewriteValue(data);
ensureDir(outDir);

(async () => {
  console.log(`Found ${urlMeta.size} image URLs in blogs.json.`);
  for (const meta of urlMeta.values()) {
    const targetPath = path.join(outDir, meta.fileName);
    if (fs.existsSync(targetPath)) {
      console.log(`Skipping existing: ${meta.fileName}`);
      continue;
    }
    process.stdout.write(`Downloading ${meta.fileName} from ${meta.url} ... `);
    try {
      await download(meta.url, targetPath);
      console.log('OK');
    } catch (err) {
      console.log(`Failed (${err.message})`);
    }
  }

  fs.writeFileSync(jsonPath, JSON.stringify(updatedData, null, 2) + '\n', 'utf8');
  console.log('Updated src/data/blogs.json with local /blog-images references.');
})();

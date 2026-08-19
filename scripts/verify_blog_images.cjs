const fs = require('fs');
const path = require('path');
const blogPath = path.join('src', 'data', 'blogs.json');
const publicDir = path.join('public', 'blog-images');
const raw = fs.readFileSync(blogPath, 'utf8');
const data = JSON.parse(raw);
const imageRegex = /https?:\/\/[^")\]\s'\"]+\.(?:png|jpg|jpeg|gif|webp|svg)/gi;
const localRegex = /\/blog-images\/[A-Za-z0-9._%\-]+\.(?:png|jpg|jpeg|gif|webp|svg)/gi;
const localImages = new Set();
const remoteImages = new Set();
function walk(value){
  if (Array.isArray(value)) return value.forEach(walk);
  if (value && typeof value === 'object') return Object.values(value).forEach(walk);
  if (typeof value === 'string'){
    const locals = value.match(localRegex);
    if (locals) locals.forEach((v) => localImages.add(v));
    const remotes = value.match(imageRegex);
    if (remotes) remotes.forEach((v) => remoteImages.add(v));
  }
}
walk(data);
const missing = [];
const present = [];
for (const localPath of [...localImages].sort()){
  const filePath = path.join('public', localPath.replace(/^\//, ''));
  if (!fs.existsSync(filePath)) missing.push(localPath);
  else present.push(localPath);
}
console.log('localRefs', localImages.size, 'remoteRefs', remoteImages.size, 'missingLocalFiles', missing.length);
if (missing.length){
  console.log('--- MISSING LOCAL IMAGES ---');
  missing.forEach((p) => console.log(p));
}
if (remoteImages.size){
  console.log('--- REMOTE IMAGE URLS STILL IN JSON ---');
  for (const url of [...remoteImages].sort()) console.log(url);
}
const files = fs.existsSync(publicDir) ? fs.readdirSync(publicDir) : [];
const extra = files.filter((name)=>![...localImages].some((p)=>p.endsWith('/'+name)));
console.log('publicFiles', files.length, 'extraPublicFiles', extra.length);
if (extra.length){
  console.log('--- EXTRA PUBLIC BLOG IMAGE FILES (not referenced) ---');
  extra.sort().forEach((name)=>console.log(name));
}

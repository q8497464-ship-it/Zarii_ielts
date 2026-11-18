const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// 1. Read input logo
const srcPngPath = path.resolve(__dirname, '../public/brand/zarii-logo.png');
if (!fs.existsSync(srcPngPath)) {
  fs.copyFileSync(
    'C:/Users/SiliCon/.gemini/antigravity/brain/79fb39b2-92cf-45ab-89c1-682ca7a62ee0/.user_uploaded/media_1794897750972_36c15f12.png',
    srcPngPath
  );
}

const buf = fs.readFileSync(srcPngPath);
let pos = 8;
const chunks = [];
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IDAT') chunks.push(buf.subarray(pos + 8, pos + 8 + len));
  pos += 12 + len;
}
const raw = zlib.inflateSync(Buffer.concat(chunks));

const width = 1024, height = 1024;
const stride = 1 + width * 4;
const pixels = Buffer.alloc(width * height * 4);

for (let y = 0; y < height; y++) {
  const filter = raw[y * stride];
  const rowStart = y * stride + 1;
  const prevRowStart = (y - 1) * width * 4;
  const curRowStart = y * width * 4;

  for (let x = 0; x < width * 4; x++) {
    const val = raw[rowStart + x];
    const a = x >= 4 ? pixels[curRowStart + x - 4] : 0;
    const b = y > 0 ? pixels[prevRowStart + x] : 0;
    const c = (x >= 4 && y > 0) ? pixels[prevRowStart + x - 4] : 0;

    let res = 0;
    if (filter === 0) res = val;
    else if (filter === 1) res = (val + a) & 0xff;
    else if (filter === 2) res = (val + b) & 0xff;
    else if (filter === 3) res = (val + Math.floor((a + b) / 2)) & 0xff;
    else if (filter === 4) {
      const p = a + b - c;
      const pa = Math.abs(p - a);
      const pb = Math.abs(p - b);
      const pc = Math.abs(p - c);
      let pr = c;
      if (pa <= pb && pa <= pc) pr = a;
      else if (pb <= pc) pr = b;
      res = (val + pr) & 0xff;
    }
    pixels[curRowStart + x] = res;
  }
}

// Contour tracer with decimation
function traceMask(isPixelSet, epsilon = 1.0) {
  const edges = new Map();

  function addEdge(x1, y1, x2, y2) {
    const k = x1 + ',' + y1;
    if (!edges.has(k)) edges.set(k, []);
    edges.get(k).push([x2, y2]);
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (isPixelSet(x, y)) {
        if (y === 0 || !isPixelSet(x, y - 1)) addEdge(x, y, x + 1, y);
        if (x === width - 1 || !isPixelSet(x + 1, y)) addEdge(x + 1, y, x + 1, y + 1);
        if (y === height - 1 || !isPixelSet(x, y + 1)) addEdge(x + 1, y + 1, x, y + 1);
        if (x === 0 || !isPixelSet(x - 1, y)) addEdge(x, y + 1, x, y);
      }
    }
  }

  const loops = [];
  while (edges.size > 0) {
    const startKey = edges.keys().next().value;
    const startTargets = edges.get(startKey);
    const firstTarget = startTargets.pop();
    if (startTargets.length === 0) edges.delete(startKey);

    const [sx, sy] = startKey.split(',').map(Number);
    const loop = [[sx, sy]];
    let curr = firstTarget;

    while (curr) {
      loop.push(curr);
      if (curr[0] === sx && curr[1] === sy) break;
      const ck = curr[0] + ',' + curr[1];
      const nextTargets = edges.get(ck);
      if (!nextTargets || nextTargets.length === 0) {
        if (nextTargets) edges.delete(ck);
        break;
      }
      curr = nextTargets.pop();
      if (nextTargets.length === 0) edges.delete(ck);
    }

    if (loop.length > 3) loops.push(loop);
  }

  function dp(points, tol) {
    if (points.length <= 2) return points;
    let dmax = 0;
    let index = 0;
    const [x1, y1] = points[0];
    const [x2, y2] = points[points.length - 1];
    const dx = x2 - x1, dy = y2 - y1;
    const lenSq = dx * dx + dy * dy;

    for (let i = 1; i < points.length - 1; i++) {
      const [px, py] = points[i];
      let d = 0;
      if (lenSq === 0) {
        d = Math.hypot(px - x1, py - y1);
      } else {
        const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lenSq));
        const projX = x1 + t * dx;
        const projY = y1 + t * dy;
        d = Math.hypot(px - projX, py - projY);
      }
      if (d > dmax) {
        dmax = d;
        index = i;
      }
    }

    if (dmax > tol) {
      const rec1 = dp(points.slice(0, index + 1), tol);
      const rec2 = dp(points.slice(index), tol);
      return rec1.slice(0, rec1.length - 1).concat(rec2);
    } else {
      return [points[0], points[points.length - 1]];
    }
  }

  return loops.map(l => dp(l, epsilon));
}

function loopsToPathData(loops) {
  return loops.map(loop => {
    let d = `M ${loop[0][0]} ${loop[0][1]}`;
    for (let i = 1; i < loop.length; i++) {
      d += ` L ${loop[i][0]} ${loop[i][1]}`;
    }
    d += ' Z';
    return d;
  }).join(' ');
}

// 2. Classify regions
// Mint right wing of book: y from 520 to 631, x from 512 to 800
const mintLoops = traceMask((x, y) => {
  const idx = (y * width + x) * 4;
  if (pixels[idx+3] < 100) return false;
  const r = pixels[idx], g = pixels[idx+1], b = pixels[idx+2];
  return (g > 150 && r < 140);
}, 1.0);

// Mark deep green (Z + left book wing): y <= 631
const markDeepLoops = traceMask((x, y) => {
  if (y > 631) return false;
  const idx = (y * width + x) * 4;
  if (pixels[idx+3] < 100) return false;
  const r = pixels[idx], g = pixels[idx+1], b = pixels[idx+2];
  return (g < 130 && (g > 30 || r < 50));
}, 1.0);

// Wordmark "Zarii": y from 632 to 870
const wordmarkLoops = traceMask((x, y) => {
  if (y <= 631 || y > 870) return false;
  const idx = (y * width + x) * 4;
  if (pixels[idx+3] < 100) return false;
  const r = pixels[idx], g = pixels[idx+1], b = pixels[idx+2];
  return (g < 130 && (g > 30 || r < 50));
}, 1.0);

// Subtitle "IELTS PREPARATION": y > 870
const subtitleLoops = traceMask((x, y) => {
  if (y <= 870) return false;
  const idx = (y * width + x) * 4;
  if (pixels[idx+3] < 100) return false;
  const r = pixels[idx], g = pixels[idx+1], b = pixels[idx+2];
  return (g < 130 && (g > 30 || r < 50));
}, 0.8);

const pathMint = loopsToPathData(mintLoops);
const pathMarkDeep = loopsToPathData(markDeepLoops);
const pathWordmark = loopsToPathData(wordmarkLoops);
const pathSubtitle = loopsToPathData(subtitleLoops);

console.log('Path data extracted.');

// Helper to write SVG files
const publicBrand = path.resolve(__dirname, '../public/brand');
if (!fs.existsSync(publicBrand)) fs.mkdirSync(publicBrand, { recursive: true });

// A. Full Logo (1024x1024 canvas with exact proportions)
// Clear space around logo is naturally preserved within the 1024x1024 canvas (bounds are [97, 928] x [138, 941])
const fullLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="none">
  <!-- Zarii IELTS Preparation Full Logo -->
  <g id="zarii-mark">
    <!-- Deep Green Z and Left Page -->
    <path fill="#124F40" fill-rule="evenodd" d="${pathMarkDeep}" />
    <!-- Mint Green Right Page -->
    <path fill="#5BB78D" fill-rule="evenodd" d="${pathMint}" />
  </g>
  <!-- Zarii Wordmark -->
  <path id="zarii-wordmark" fill="#124F40" fill-rule="evenodd" d="${pathWordmark}" />
  <!-- IELTS PREPARATION Subtitle -->
  <path id="zarii-subtitle" fill="#124F40" fill-rule="evenodd" d="${pathSubtitle}" />
</svg>`;

const fullLogoWhiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="none">
  <!-- Zarii IELTS Preparation Full Logo (White for dark backgrounds) -->
  <g id="zarii-mark">
    <path fill="#FFFFFF" fill-rule="evenodd" d="${pathMarkDeep}" />
    <path fill="#5BB78D" fill-rule="evenodd" d="${pathMint}" />
  </g>
  <path id="zarii-wordmark" fill="#FFFFFF" fill-rule="evenodd" d="${pathWordmark}" />
  <path id="zarii-subtitle" fill="#E8F2EC" fill-rule="evenodd" d="${pathSubtitle}" />
</svg>`;

fs.writeFileSync(path.join(publicBrand, 'zarii-logo-full.svg'), fullLogoSvg);
fs.writeFileSync(path.join(publicBrand, 'zarii-logo-full-white.svg'), fullLogoWhiteSvg);

// B. Mark Only (Bounding box x: 240..804, y: 138..631 -> width ~564, height ~493)
// With clear space padding (~50px)
const markViewBox = "190 88 664 593";
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${markViewBox}" fill="none">
  <!-- Zarii Symbol Mark (Z + Book) -->
  <path fill="#124F40" fill-rule="evenodd" d="${pathMarkDeep}" />
  <path fill="#5BB78D" fill-rule="evenodd" d="${pathMint}" />
</svg>`;

const markWhiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${markViewBox}" fill="none">
  <!-- Zarii Symbol Mark (White for dark backgrounds) -->
  <path fill="#FFFFFF" fill-rule="evenodd" d="${pathMarkDeep}" />
  <path fill="#5BB78D" fill-rule="evenodd" d="${pathMint}" />
</svg>`;

fs.writeFileSync(path.join(publicBrand, 'zarii-mark.svg'), markSvg);
fs.writeFileSync(path.join(publicBrand, 'zarii-mark-white.svg'), markWhiteSvg);

// C. Wordmark Only ("Zarii", bounding box x: 175..832, y: 632..858 -> width ~657, height ~226)
// With clear space padding (~40px)
const wordmarkViewBox = "135 592 737 306";
const wordmarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${wordmarkViewBox}" fill="none">
  <!-- Zarii Wordmark -->
  <path fill="#124F40" fill-rule="evenodd" d="${pathWordmark}" />
</svg>`;

const wordmarkWhiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${wordmarkViewBox}" fill="none">
  <!-- Zarii Wordmark (White for dark backgrounds) -->
  <path fill="#FFFFFF" fill-rule="evenodd" d="${pathWordmark}" />
</svg>`;

fs.writeFileSync(path.join(publicBrand, 'zarii-wordmark.svg'), wordmarkSvg);
fs.writeFileSync(path.join(publicBrand, 'zarii-wordmark-white.svg'), wordmarkWhiteSvg);

console.log('SVG Brand assets written.');

// 3. Favicon SVG & Icon SVGs
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="190 88 664 593" fill="none">
  <path fill="#124F40" fill-rule="evenodd" d="${pathMarkDeep}" />
  <path fill="#5BB78D" fill-rule="evenodd" d="${pathMint}" />
</svg>`;

fs.writeFileSync(path.resolve(__dirname, '../public/favicon.svg'), faviconSvg);

const publicIcons = path.resolve(__dirname, '../public/icons');
if (!fs.existsSync(publicIcons)) fs.mkdirSync(publicIcons, { recursive: true });

fs.writeFileSync(path.join(publicIcons, 'icon.svg'), faviconSvg);
fs.writeFileSync(path.join(publicIcons, 'icon-192.svg'), faviconSvg);
fs.writeFileSync(path.join(publicIcons, 'icon-512.svg'), faviconSvg);

// 4. PNG Generation helper
function makeCrcTable() {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    table[n] = c;
  }
  return table;
}
const crcTable = makeCrcTable();
function crc32(b) {
  let c = 0xffffffff;
  for (let i = 0; i < b.length; i++) {
    c = crcTable[(c ^ b[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  typeBuf.copy(chunk, 4);
  data.copy(chunk, 8);
  const toCrc = Buffer.concat([typeBuf, data]);
  chunk.writeUInt32BE(crc32(toCrc), 8 + len);
  return chunk;
}

function encodePng(w, h, rgbaBuffer) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // 8-bit depth
  ihdr[9] = 6; // RGBA color
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // no interlace

  const stride = 1 + w * 4;
  const rawScanlines = Buffer.alloc(h * stride);
  for (let y = 0; y < h; y++) {
    rawScanlines[y * stride] = 0; // filter None
    rgbaBuffer.copy(rawScanlines, y * stride + 1, y * w * 4, (y + 1) * w * 4);
  }

  const idatData = zlib.deflateSync(rawScanlines, { level: 9 });
  return Buffer.concat([
    sig,
    createChunk('IHDR', ihdr),
    createChunk('IDAT', idatData),
    createChunk('IEND', Buffer.alloc(0))
  ]);
}

// Resampling helper from 1024x1024 pixels buffer
function resample(targetW, targetH, bgR = 0, bgG = 0, bgB = 0, bgA = 0, padRatio = 0) {
  const out = Buffer.alloc(targetW * targetH * 4);
  // Fill background
  for (let i = 0; i < targetW * targetH; i++) {
    out[i * 4] = bgR;
    out[i * 4 + 1] = bgG;
    out[i * 4 + 2] = bgB;
    out[i * 4 + 3] = bgA;
  }

  const innerW = targetW * (1 - 2 * padRatio);
  const innerH = targetH * (1 - 2 * padRatio);
  const offsetX = targetW * padRatio;
  const offsetY = targetH * padRatio;

  // Source bounding box: Mark Z + book y from 120 to 650, x from 220 to 820
  const srcMinX = 220, srcMaxX = 820;
  const srcMinY = 120, srcMaxY = 650;
  const srcW = srcMaxX - srcMinX;
  const srcH = srcMaxY - srcMinY;

  for (let ty = 0; ty < innerH; ty++) {
    const sy = srcMinY + (ty / innerH) * srcH;
    const sy0 = Math.floor(sy);
    const sy1 = Math.min(1023, sy0 + 1);
    const wy = sy - sy0;

    for (let tx = 0; tx < innerW; tx++) {
      const sx = srcMinX + (tx / innerW) * srcW;
      const sx0 = Math.floor(sx);
      const sx1 = Math.min(1023, sx0 + 1);
      const wx = sx - sx0;

      const destX = Math.round(offsetX + tx);
      const destY = Math.round(offsetY + ty);
      if (destX < 0 || destX >= targetW || destY < 0 || destY >= targetH) continue;

      const idx00 = (sy0 * 1024 + sx0) * 4;
      const idx01 = (sy0 * 1024 + sx1) * 4;
      const idx10 = (sy1 * 1024 + sx0) * 4;
      const idx11 = (sy1 * 1024 + sx1) * 4;

      const outIdx = (destY * targetW + destX) * 4;

      for (let c = 0; c < 4; c++) {
        const top = pixels[idx00 + c] * (1 - wx) + pixels[idx01 + c] * wx;
        const bot = pixels[idx10 + c] * (1 - wx) + pixels[idx11 + c] * wx;
        const v = Math.round(top * (1 - wy) + bot * wy);

        if (c === 3) {
          // Alpha blending over existing background
          const srcAlpha = v / 255;
          const dstAlpha = out[outIdx + 3] / 255;
          const outAlpha = srcAlpha + dstAlpha * (1 - srcAlpha);
          out[outIdx + 3] = Math.round(outAlpha * 255);
        } else {
          // If blending on opaque background
          const srcAlpha = (pixels[idx00 + 3] * (1 - wx) + pixels[idx01 + 3] * wx) * (1 - wy) / 255;
          out[outIdx + c] = Math.round(v * srcAlpha + out[outIdx + c] * (1 - srcAlpha));
        }
      }
    }
  }
  return out;
}

// Generate apple-touch-icon.png (180x180, crisp mark with 10% padding on white background)
const appleIconRgba = resample(180, 180, 247, 250, 248, 255, 0.1);
fs.writeFileSync(path.resolve(__dirname, '../public/apple-touch-icon.png'), encodePng(180, 180, appleIconRgba));

// Generate icon-192.png (192x192, crisp mark on transparent)
const icon192Rgba = resample(192, 192, 0, 0, 0, 0, 0.05);
fs.writeFileSync(path.join(publicIcons, 'icon-192.png'), encodePng(192, 192, icon192Rgba));

// Generate icon-512.png (512x512, crisp mark on transparent)
const icon512Rgba = resample(512, 512, 0, 0, 0, 0, 0.05);
fs.writeFileSync(path.join(publicIcons, 'icon-512.png'), encodePng(512, 512, icon512Rgba));

// Generate icon-maskable-512.png (512x512 with safe padding on deep green background #124F40)
// Deep green: r:18 (0x12), g:79 (0x4F), b:64 (0x40)
// In maskable icon on deep green background, the Z should be white and the right wing mint!
function resampleMaskable(targetW, targetH) {
  const out = Buffer.alloc(targetW * targetH * 4);
  for (let i = 0; i < targetW * targetH; i++) {
    out[i * 4] = 0x12;
    out[i * 4 + 1] = 0x4F;
    out[i * 4 + 2] = 0x40;
    out[i * 4 + 3] = 255;
  }

  const padRatio = 0.22; // Safe padding for PWA maskable icon
  const innerW = targetW * (1 - 2 * padRatio);
  const innerH = targetH * (1 - 2 * padRatio);
  const offsetX = targetW * padRatio;
  const offsetY = targetH * padRatio;

  const srcMinX = 220, srcMaxX = 820;
  const srcMinY = 120, srcMaxY = 650;
  const srcW = srcMaxX - srcMinX;
  const srcH = srcMaxY - srcMinY;

  for (let ty = 0; ty < innerH; ty++) {
    const sy = srcMinY + (ty / innerH) * srcH;
    const sy0 = Math.floor(sy);
    for (let tx = 0; tx < innerW; tx++) {
      const sx = srcMinX + (tx / innerW) * srcW;
      const sx0 = Math.floor(sx);

      const destX = Math.round(offsetX + tx);
      const destY = Math.round(offsetY + ty);
      if (destX < 0 || destX >= targetW || destY < 0 || destY >= targetH) continue;

      const idx = (sy0 * 1024 + sx0) * 4;
      const a = pixels[idx + 3];
      if (a > 100) {
        const r = pixels[idx], g = pixels[idx + 1], b = pixels[idx + 2];
        const outIdx = (destY * targetW + destX) * 4;
        if (g > 150 && r < 140) {
          // Mint wing
          out[outIdx] = 0x5B;
          out[outIdx + 1] = 0xB7;
          out[outIdx + 2] = 0x8D;
        } else {
          // White Z
          out[outIdx] = 255;
          out[outIdx + 1] = 255;
          out[outIdx + 2] = 255;
        }
      }
    }
  }
  return out;
}

const maskableRgba = resampleMaskable(512, 512);
fs.writeFileSync(path.join(publicIcons, 'icon-maskable-512.png'), encodePng(512, 512, maskableRgba));

// 5. Generate favicon.ico (32x32 embedding PNG)
const ico32Rgba = resample(32, 32, 0, 0, 0, 0, 0.05);
const ico32Png = encodePng(32, 32, ico32Rgba);

const icoHeader = Buffer.alloc(22);
icoHeader.writeUInt16LE(0, 0); // Reserved
icoHeader.writeUInt16LE(1, 2); // Type 1 = ICO
icoHeader.writeUInt16LE(1, 4); // 1 image
icoHeader[6] = 32; // Width
icoHeader[7] = 32; // Height
icoHeader[8] = 0;  // Color count
icoHeader[9] = 0;  // Reserved
icoHeader.writeUInt16LE(1, 10); // Color planes
icoHeader.writeUInt16LE(32, 12); // Bits per pixel
icoHeader.writeUInt32LE(ico32Png.length, 14); // Image byte size
icoHeader.writeUInt32LE(22, 18); // Offset of image data

fs.writeFileSync(path.resolve(__dirname, '../public/favicon.ico'), Buffer.concat([icoHeader, ico32Png]));

// 6. Generate Open Graph image (1200x630, deep green background #124F40, white logo, tagline)
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <radialGradient id="grad" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#17634F"/>
      <stop offset="100%" stop-color="#124F40"/>
    </radialGradient>
  </defs>
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#grad)" />
  
  <!-- Subtle Mint Border Accent -->
  <rect x="24" y="24" width="1152" height="582" rx="20" fill="none" stroke="#5BB78D" stroke-width="2" stroke-opacity="0.25" />
  
  <!-- Centered White Logo (Mark + Wordmark) -->
  <g transform="translate(420, 70) scale(0.36)">
    <path fill="#FFFFFF" fill-rule="evenodd" d="${pathMarkDeep}" />
    <path fill="#5BB78D" fill-rule="evenodd" d="${pathMint}" />
    <path fill="#FFFFFF" fill-rule="evenodd" d="${pathWordmark}" />
  </g>
  
  <!-- IELTS PREPARATION Subtitle & Tagline -->
  <text x="600" y="440" font-family="Inter, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#8ACFAE" text-anchor="middle" letter-spacing="6">
    IELTS PREPARATION
  </text>
  
  <text x="600" y="495" font-family="Inter, -apple-system, sans-serif" font-size="22" font-weight="500" fill="#E8F2EC" text-anchor="middle" opacity="0.95">
    Authentic Mock Exams • AI Examiner Feedback • 100% Free &amp; Offline
  </text>
  
  <g transform="translate(475, 535)">
    <rect width="250" height="42" rx="21" fill="#5BB78D" fill-opacity="0.15" stroke="#5BB78D" stroke-width="1.5" />
    <text x="125" y="27" font-family="Inter, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#5BB78D" text-anchor="middle" letter-spacing="1">
      TARGET BAND 8.0+
    </text>
  </g>
</svg>`;

fs.writeFileSync(path.resolve(__dirname, '../public/og-image.svg'), ogSvg);

console.log('All brand assets, favicons, PWA icons, and OG image successfully generated!');

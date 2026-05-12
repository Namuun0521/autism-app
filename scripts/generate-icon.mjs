// Generates a branded LittleLearner app icon (1024x1024)
import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";

const SIZE = 1024;
const RADIUS = 220;

// Purple gradient background + star + "LL" letters as SVG
const svg = `
<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#7C5CFC;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#A78BFA;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FDA085;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${SIZE}" height="${SIZE}" rx="${RADIUS}" fill="url(#bg)" />

  <!-- White soft circle behind star -->
  <circle cx="512" cy="440" r="240" fill="rgba(255,255,255,0.15)" />

  <!-- Star shape -->
  <g transform="translate(512, 420)">
    <polygon
      points="0,-180 42,-60 170,-55 72,22 105,150 0,80 -105,150 -72,22 -170,-55 -42,-60"
      fill="url(#starGrad)"
      stroke="rgba(255,255,255,0.4)"
      stroke-width="6"
    />
  </g>

  <!-- App name -->
  <text
    x="512"
    y="730"
    font-family="Arial Rounded MT Bold, Arial, sans-serif"
    font-size="88"
    font-weight="900"
    fill="white"
    text-anchor="middle"
    letter-spacing="-2"
  >Little</text>
  <text
    x="512"
    y="830"
    font-family="Arial Rounded MT Bold, Arial, sans-serif"
    font-size="88"
    font-weight="900"
    fill="rgba(255,255,255,0.85)"
    text-anchor="middle"
    letter-spacing="-2"
  >Learner</text>
</svg>
`;

await sharp(Buffer.from(svg))
  .resize(1024, 1024)
  .png()
  .toFile("assets/images/icon.png");

console.log("✅ icon.png generated (1024x1024)");

// Splash icon — simpler, just the star
const splashSvg = `
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FFD700" />
      <stop offset="100%" style="stop-color:#FDA085" />
    </linearGradient>
  </defs>
  <g transform="translate(256, 256)">
    <polygon
      points="0,-200 47,-67 190,-62 80,25 117,167 0,90 -117,167 -80,25 -190,-62 -47,-67"
      fill="url(#starGrad)"
    />
  </g>
</svg>
`;

await sharp(Buffer.from(splashSvg))
  .resize(512, 512)
  .png()
  .toFile("assets/images/splash-icon.png");

console.log("✅ splash-icon.png generated (512x512)");

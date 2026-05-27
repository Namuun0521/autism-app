const sharp = require("sharp");
const path = require("path");

const size = 1024;

const svg = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#7C5CFC"/>
      <stop offset="100%" style="stop-color:#A78BFA"/>
    </linearGradient>
    <linearGradient id="star" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#FFD700"/>
      <stop offset="100%" style="stop-color:#FFA500"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${size}" height="${size}" fill="url(#bg)" rx="220"/>

  <!-- Circle behind star -->
  <circle cx="512" cy="390" r="240" fill="rgba(255,255,255,0.18)"/>

  <!-- Star -->
  <polygon
    points="512,180 570,360 760,360 610,465 665,650 512,545 359,650 414,465 264,360 454,360"
    fill="url(#star)"
    stroke="#FF8C00"
    stroke-width="6"
    stroke-linejoin="round"
  />

  <!-- App name -->
  <text
    x="512"
    y="730"
    font-family="Arial, Helvetica, sans-serif"
    font-size="110"
    font-weight="900"
    fill="white"
    text-anchor="middle"
    letter-spacing="4"
  >Autismo</text>
</svg>
`;

sharp(Buffer.from(svg))
  .resize(size, size)
  .png()
  .toFile(path.join(__dirname, "../assets/images/icon.png"))
  .then(() => console.log("Icon generated: assets/images/icon.png"))
  .catch((e) => console.error("Error:", e));

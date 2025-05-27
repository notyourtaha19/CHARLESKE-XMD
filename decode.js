const fs = require('fs');

const fileContent = fs.readFileSync('./Charles.js', 'utf8');

// Try to find the longest quoted string that looks like base64-ish
const matches = fileContent.match(/["']([A-Za-z0-9+/=]{50,})["']/g);

if (!matches || matches.length === 0) {
  console.error("No encoded data found!");
  process.exit(1);
}

// Pick the longest match assuming it is the encoded data
let longest = matches[0];
for (const m of matches) {
  if (m.length > longest.length) longest = m;
}

// Remove quotes
const base64Str = longest.slice(1, -1);

try {
  const decodedBuffer = Buffer.from(base64Str, 'base64');
  const decodedText = decodedBuffer.toString('utf8');
  console.log(decodedText);
  fs.writeFileSync('decodedOutput.txt', decodedText);
} catch (e) {
  console.error("Failed to decode base64:", e.message);
}

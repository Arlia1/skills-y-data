// Render a frame range [a,b) of a demo to mp4. Usage:
// LEMO_ANGLE=swiftshader node render_segment.mjs <dir> <a> <b> <fps> <out> [WxH]
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { openDemo } from '/home/y/lemo-opuscar/core/render/page.mjs';

const [dir, aS, bS, fpsS, out] = process.argv.slice(2);
const size = process.argv[7] || '1080x1920';
const a = Math.round(+aS), b = Math.round(+bS), fps = Math.round(+fpsS);
const [W, H] = size.split('x').map(Number);
if (!(b > a) || !(fps > 0)) { console.error('bad args'); process.exit(2); }
fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });

const { browser, page } = await openDemo(dir, { w: W, h: H });
const DUR = await page.evaluate(() => window.DUR);
if (!(DUR > 0)) { console.error('no DUR'); process.exit(2); }
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '14', '-pix_fmt', 'yuv420p', '-r', String(fps), out], { stdio: ['pipe', 'inherit', 'inherit'] });
let dead = null;
ff.on('error', e => { dead = e.message; });
ff.stdin.on('error', () => { dead ??= 'stdin closed'; });
for (let f = a; f < b; f++) {
  await page.evaluate(t => window.render(t), f / fps);
  const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
  ff.stdin.write(buf);
  if ((f - a) % 60 === 0) console.log(`${f - a}/${b - a} ${(f / fps).toFixed(2)}s`);
}
ff.stdin.end();
const code = await new Promise(r => ff.on('close', r));
try { await Promise.race([page.close().catch(()=>{}), new Promise(r => setTimeout(r, 1500))]); } catch {}
try { await Promise.race([browser.close(), new Promise(r => setTimeout(r, 3000))]); } catch {}
if (dead || code !== 0) { console.error(`segment failed: ${dead || code}`); process.exit(1); }
console.log(`OK ${out}`);
process.exit(0);

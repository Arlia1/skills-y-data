import { PAL, canvas, piece, fill, cut, cutLine, trace, fillPaper, Pl, P, curve, ellipsePoly, paperShadow, noShadow, finishPaper, transmitOf, paperGrain, paperTile, rnd } from './paper.js';
import { put, mul, T as Tm, S, R, ap } from './rig.js';
import { sawRow, sawEdge, crescent, rosette, plum, dots, taper, swirl } from './motifs.js';
import { textPiece } from './hud.js';

export { canvas, piece, fill, cut, cutLine, trace, fillPaper, Pl, P, curve, ellipsePoly, paperShadow, noShadow, finishPaper, transmitOf, paperGrain, paperTile, rnd, put, mul, Tm, S, R, ap, sawRow, sawEdge, crescent, rosette, plum, dots, taper, swirl, textPiece };

export const W = 1080, H = 1920, DUR = 30, TAU = Math.PI * 2;
export const C = {
  ink: '#1b2a41', ink2: '#0f1726', ink3: '#2a3550',
  cream: '#f2e8d5', white: '#faf6ec', paper: '#fff8e8',
  red: '#d2201f', red2: '#a8111f', red3: '#7e1424',
  gold: '#c9a227', gold2: '#e6bf5f', gold3: '#f3d98a',
  jade: '#2f6f6b', jade2: '#1f4d4a', jade3: '#438c85',
  skin: '#efd3ae', skin2: '#dfb88e', skin3: '#c89a72',
  plum: '#3a2238', night: '#141b30', gray: '#8e8a85'
};
PAL.shadow = 'rgba(9,5,16,.34)';

export const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const seg = (t, a, b) => clamp((t - a) / (b - a));
export const ss = t => { t = clamp(t); return t * t * (3 - 2 * t); };
export const eio = t => { t = clamp(t); return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
export const eo = t => 1 - Math.pow(1 - clamp(t), 3);
export const ei = t => Math.pow(clamp(t), 3);
export const back = (t, s = 1.8) => { t = clamp(t) - 1; return 1 + t * t * ((s + 1) * t + s); };
export const hash = n => { n = Math.sin(n * 127.1 + 311.7) * 43758.5453; return n - Math.floor(n); };
export const vnoise = x => { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return lerp(hash(i), hash(i + 1), u); };
export const st = t => Math.floor(t * 12) / 12;
export const cam = (x, y, z) => [z, 0, 0, z, W / 2 - x * z, H / 2 - y * z];

const FONTS = [
  '400 80px "Archivo Black"', '600 80px "Fraunces"', '700 80px "Fraunces"', '900 80px "Fraunces"',
  '400 40px "Plus Jakarta Sans"', '600 40px "Plus Jakarta Sans"', '800 40px "Plus Jakarta Sans"'
];
for (const f of FONTS) await document.fonts.load(f);
await document.fonts.ready;

async function loadImg(src) {
  const im = new Image(); im.src = src; await im.decode();
  return { c: im, x0: 0, y0: 0, w: im.width, h: im.height };
}
export const LOGO = {
  red: await loadImg('assets/logo_red.png'),
  cream: await loadImg('assets/logo_cream.png'),
  gold: await loadImg('assets/logo_gold.png'),
  ink: await loadImg('assets/logo_ink.png'),
  jade: await loadImg('assets/logo_jade.png')
};

export function roundRectPath(g, x, y, w, h, r) {
  r = Math.max(0, Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2));
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}
export function fillRound(g, x, y, w, h, r, col, shadow = 0) {
  g.save(); g.beginPath(); roundRectPath(g, x, y, w, h, r); g.fillStyle = col;
  if (shadow) { g.shadowColor = 'rgba(9,5,16,.30)'; g.shadowBlur = 16 * shadow; g.shadowOffsetX = 7 * shadow; g.shadowOffsetY = 10 * shadow; }
  g.fill(); g.restore();
}
export function strokeRound(g, x, y, w, h, r, col, lw = 2) {
  g.save(); g.beginPath(); roundRectPath(g, x, y, w, h, r); g.strokeStyle = col; g.lineWidth = lw; g.stroke(); g.restore();
}
export function drawImagePiece(g, p, cx, cy, w, opt = {}) {
  const s = w / p.w; put(g, p, [s, 0, 0, s, cx - p.w * s / 2, cy - p.h * s / 2], opt);
}
export function drawPaperText(g, text, size, col, font, cx, y, opt = {}) {
  const weight = opt.weight ?? (font === 'Archivo Black' ? 400 : 700);
  const p = textPiece(text, size, weight, col, font, opt.seed ?? 3, opt.ls ?? 0);
  const s = Math.min(opt.maxW ? opt.maxW / p.w : 1, 1) * (opt.scale ?? 1);
  const a = opt.alpha ?? 1; if (a <= 0) return;
  g.save(); g.globalAlpha = a;
  if (opt.rot) {
    g.translate(cx, y + p.h * s / 2); g.rotate(opt.rot);
    put(g, p, [s, 0, 0, s, -p.w * s / 2, -p.h * s / 2], { shadow: opt.shadow ?? 1 });
  } else {
    put(g, p, [s, 0, 0, s, cx - p.w * s / 2, y], { shadow: opt.shadow ?? 1 });
  }
  g.restore();
}

const MC = canvas(10, 10)[1];
export function measure(text, font) { MC.font = font; return MC.measureText(text).width; }
export function wrapText(text, font, maxW) {
  const words = text.split(/\s+/), out = []; let cur = '';
  for (const w of words) {
    const test = cur ? cur + ' ' + w : w;
    if (measure(test, font) <= maxW || !cur) cur = test;
    else { out.push(cur); cur = w; }
  }
  if (cur) out.push(cur);
  return out;
}

const SUB_CACHE = {};
function subStrip(text) {
  if (SUB_CACHE[text]) return SUB_CACHE[text];
  let size = 42, font = `600 ${size}px "Fraunces"`, lines = wrapText(text, font, 760);
  for (const s of [42, 38, 34, 30]) {
    size = s; font = `600 ${s}px "Fraunces"`; lines = wrapText(text, font, 760);
    if (lines.length <= 2 && lines.every(l => measure(l, font) <= 760)) break;
  }
  const lineH = Math.round(size * 1.24), tw = Math.max(...lines.map(l => measure(l, font)));
  const w = Math.min(900, Math.ceil(tw + 120)), h = lines.length * lineH + 34, K = 1.5;
  const [c, g] = canvas(w * K, h * K); g.scale(K, K);
  const poly = [];
  for (let x = 0; x <= w; x += 12) poly.push([x, 4 + (Math.floor(x / 12) % 2) * 3]);
  poly.push([w - 20, h / 2]);
  for (let x = w; x >= 0; x -= 12) poly.push([x, h - 4 - (Math.floor(x / 12) % 2) * 3]);
  poly.push([20, h / 2]);
  g.beginPath(); trace(g, Pl(poly, true, .3, 5)); g.fillStyle = C.red2; g.fill();
  for (let k = 0; k < 38; k++) { g.fillStyle = `rgba(230,191,95,${.18 + hash(k) * .3})`; g.beginPath(); g.arc(30 + hash(k * 1.3) * (w - 60), 10 + hash(k * 2.1) * (h - 20), .8 + hash(k * 3.7) * 1.4, 0, TAU); g.fill(); }
  rosette(g, 48, h / 2, 11, 6, 0, .24);
  finishPaper(c, g, { seed: 9, edge: 1 });
  g.setTransform(K, 0, 0, K, 0, 0); g.font = font; g.fillStyle = '#fff1d6'; g.textBaseline = 'middle'; g.textAlign = 'center';
  lines.forEach((line, i) => g.fillText(line, w / 2, 17 + lineH * (i + .5)));
  return SUB_CACHE[text] = { c, w, h };
}

export const SUBS = [
  { t0: .35, t1: 2.15, text: 'Tu negocio no tiene web.' },
  { t0: 2.20, t1: 4.95, text: 'Para Google, sos una hoja en blanco.' },
  { t0: 5.00, t1: 6.55, text: 'Tu cliente ya está buscando.' },
  { t0: 6.60, t1: 7.65, text: 'Si no te encuentra,' },
  { t0: 7.65, t1: 9.55, text: 'le compra a otro.' },
  { t0: 9.80, t1: 12.35, text: 'Tu competencia no es mejor... está más visible.' },
  { t0: 12.60, t1: 15.95, text: 'Una web no es un gasto... es tu vidriera 24/7.' },
  { t0: 16.20, t1: 18.25, text: 'Diseño premium, lista en días,' },
  { t0: 18.25, t1: 19.15, text: 'SEO y soporte.' },
  { t0: 19.40, t1: 21.30, text: 'En Arlia la hacemos por vos.' },
  { t0: 21.40, t1: 24.10, text: 'Escribinos PRESUPUESTO por DM.' },
  { t0: 24.10, t1: 26.35, text: 'Los primeros diez tienen 10%.' },
  { t0: 27.50, t1: 29.55, text: 'Arlia. Tu negocio, visible.' }
];

export function drawSubs(g, t, cues = SUBS) {
  for (const q of cues) {
    if (t < q.t0 || t > q.t1) continue;
    const s = subStrip(q.text), u = st(t - q.t0), drop = u < .08 ? -14 : u < .16 ? -5 : 0;
    const a = Math.min(1, (q.t1 - t) / .2), x = (W - s.w) / 2, y = 1592 - s.h + drop;
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = Math.max(0, a);
    g.shadowColor = 'rgba(20,4,8,.5)'; g.shadowBlur = 10; g.shadowOffsetX = 4; g.shadowOffsetY = 6;
    g.drawImage(s.c, x, y, s.w, s.h); g.restore();
  }
}

const RIB_CACHE = {};
function ribbonStrip(text, size = 44) {
  const key = text + '|' + size;
  if (RIB_CACHE[key]) return RIB_CACHE[key];
  const tw = measure(text, `400 ${size}px "Archivo Black"`), w = Math.ceil(tw + 110), h = Math.round(size * 1.9), K = 1.5;
  const [c, g] = canvas(w * K, h * K); g.scale(K, K);
  const poly = [[0, 4], [w, 4], [w - 26, h / 2], [w, h - 4], [0, h - 4], [26, h / 2]];
  g.beginPath(); trace(g, Pl(poly, true, .35, 8)); g.fillStyle = C.red; g.fill();
  g.strokeStyle = C.gold; g.lineWidth = 3; g.stroke();
  for (let k = 0; k < 26; k++) { g.fillStyle = `rgba(230,191,95,${.25 + hash(k + size) * .35})`; g.beginPath(); g.arc(24 + hash(k * 1.7) * (w - 48), 8 + hash(k * 2.3) * (h - 16), 1 + hash(k * 3.1) * 1.4, 0, TAU); g.fill(); }
  rosette(g, w - 55, h / 2, 10, 6, 0, .24);
  finishPaper(c, g, { seed: 13, edge: 1 });
  return RIB_CACHE[key] = { c, w, h };
}
export function drawRibbon(g, text, cx, y, alpha = 1, scale = 1, rot = 0, size = 44) {
  if (alpha <= 0) return;
  const r = ribbonStrip(text, size), w = r.w * scale, h = r.h * scale;
  g.save(); g.globalAlpha = alpha; g.translate(cx, y + h / 2); g.rotate(rot);
  g.shadowColor = 'rgba(20,4,8,.42)'; g.shadowBlur = 12; g.shadowOffsetX = 5; g.shadowOffsetY = 7;
  g.drawImage(r.c, -w / 2, -h / 2, w, h); g.shadowColor = 'transparent';
  g.restore();
  drawPaperText(g, text, size, '#fff1d6', 'Archivo Black', cx, y + (h - size * 1.3 * scale) / 2, { maxW: w - 80, scale, alpha, shadow: .6 });
}

export function drawSparkle(g, x, y, r, col = C.gold2, alpha = 1, rot = 0) {
  if (alpha <= 0) return;
  g.save(); g.translate(x, y); g.rotate(rot); g.globalAlpha = alpha; g.fillStyle = col;
  g.beginPath(); g.moveTo(0, -r);
  g.quadraticCurveTo(r * .16, -r * .16, r, 0);
  g.quadraticCurveTo(r * .16, r * .16, 0, r);
  g.quadraticCurveTo(-r * .16, r * .16, -r, 0);
  g.quadraticCurveTo(-r * .16, -r * .16, 0, -r);
  g.fill(); g.restore();
}

export function vignette(g, col = 'rgba(5,4,12,.55)', inner = .18) {
  const gr = g.createRadialGradient(W / 2, H / 2, H * inner, W / 2, H / 2, H * .78);
  gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(.7, col); gr.addColorStop(1, 'rgba(2,2,8,.80)');
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
}
export function grain(g, alpha = .16) {
  const pat = g.createPattern(paperGrain(), 'repeat');
  g.save(); g.globalCompositeOperation = 'soft-light'; g.globalAlpha = alpha; g.fillStyle = pat; g.fillRect(0, 0, W, H); g.restore();
}
export function paperFlash(g, a) {
  if (a <= 0) return;
  g.save(); g.globalAlpha = a; g.fillStyle = C.cream; g.fillRect(0, 0, W, H); g.restore();
}

export function drawScissors(g, x, y, s, angle = 0, open = .5, shadow = 1) {
  g.save(); g.translate(x, y); g.rotate(angle); g.scale(s, s);
  if (shadow) { g.shadowColor = 'rgba(8,5,14,.38)'; g.shadowBlur = 16 * shadow; g.shadowOffsetX = 10 * shadow; g.shadowOffsetY = 14 * shadow; }
  for (const k of [-1, 1]) {
    g.save(); g.rotate(k * open * .5);
    const gr = g.createLinearGradient(0, -12, 0, 12);
    gr.addColorStop(0, '#fbf7ed'); gr.addColorStop(.42, '#c9c2b4'); gr.addColorStop(.72, '#8e8a82'); gr.addColorStop(1, '#4d4b52');
    g.fillStyle = gr; g.beginPath(); g.moveTo(0, -7); g.lineTo(205, -2); g.lineTo(218, 0); g.lineTo(0, 8); g.closePath(); g.fill();
    g.fillStyle = 'rgba(255,255,255,.5)'; g.beginPath(); g.moveTo(8, -5); g.lineTo(190, -1); g.lineTo(8, 1); g.closePath(); g.fill();
    g.fillStyle = C.red; g.beginPath(); g.ellipse(-88, 34 * k, 46, 27, .34 * k, 0, TAU); g.ellipse(-88, 34 * k, 26, 13, .34 * k, 0, TAU, true); g.fill('evenodd');
    g.fillStyle = C.gold; g.beginPath(); g.arc(0, 0, 8, 0, TAU); g.fill();
    g.fillStyle = 'rgba(27,42,65,.5)'; g.beginPath(); g.arc(0, 0, 3.5, 0, TAU); g.fill();
    g.restore();
  }
  g.restore();
}

export function drawPaperPlane(g, x, y, s = 1, rot = 0, col = C.cream, alpha = 1) {
  if (alpha <= 0) return;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); g.globalAlpha = alpha;
  g.shadowColor = 'rgba(8,5,14,.32)'; g.shadowBlur = 12; g.shadowOffsetX = 7; g.shadowOffsetY = 10;
  g.fillStyle = col; g.beginPath(); g.moveTo(0, 0); g.lineTo(86, -26); g.lineTo(42, 16); g.closePath(); g.fill();
  g.fillStyle = 'rgba(27,42,65,.18)'; g.beginPath(); g.moveTo(0, 0); g.lineTo(42, 16); g.lineTo(52, -8); g.closePath(); g.fill();
  g.strokeStyle = 'rgba(27,42,65,.28)'; g.lineWidth = 2; g.beginPath(); g.moveTo(0, 0); g.lineTo(86, -26); g.moveTo(42, 16); g.lineTo(52, -8); g.stroke();
  g.restore();
}

export function drawPin(g, x, y, s = 1, col = C.jade) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.shadowColor = 'rgba(8,5,14,.35)'; g.shadowBlur = 14; g.shadowOffsetX = 7; g.shadowOffsetY = 10;
  g.fillStyle = col; g.beginPath(); g.moveTo(0, 0); g.bezierCurveTo(-34, -48, -38, -78, 0, -78); g.bezierCurveTo(38, -78, 34, -48, 0, 0); g.fill();
  g.shadowColor = 'transparent'; g.fillStyle = C.cream; g.beginPath(); g.arc(0, -48, 15, 0, TAU); g.fill();
  g.fillStyle = col; g.beginPath(); g.arc(0, -48, 7, 0, TAU); g.fill();
  g.restore();
}

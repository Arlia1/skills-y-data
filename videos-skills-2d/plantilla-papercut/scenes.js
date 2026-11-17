import {
  W, H, C, TAU, clamp, lerp, seg, ss, eio, eo, ei, back, hash,
  piece, fill, trace, fillPaper, Pl, put, mul, Tm, S, R,
  drawSubs, drawRibbon, drawSparkle, vignette, grain, paperFlash,
  drawScissors, drawPaperPlane, drawPin, fillRound, strokeRound, roundRectPath,
  LOGO, SUBS, rosette, textPiece
} from './core.js';
import { browser, siteMueble, siteGastro, siteClinica, flag, signBoard, phoneFrame, people } from './pieces.js';
import { drawStreet, drawPerson } from './people.js';

const T = { hook: 2.15, street: 5.0, map: 6.6, ignored: 9.6, cut: 12.4, reveal: 16.0, portfolio: 19.2, payoff: 21.4, offer: 25.4, dm: 27.5 };
const BOUNDS = [T.hook, T.street, T.map, T.ignored, T.cut, T.reveal, T.portfolio, T.payoff, T.offer, T.dm];
const CUES = SUBS.filter(q => q.t0 >= 2.0);

const TEXT_CACHE = new Map();
function paperText(g, text, size, col, font, cx, y, opt = {}) {
  const weight = opt.weight ?? (font === 'Archivo Black' ? 400 : 700);
  const key = `${text}|${size}|${col}|${font}|${weight}|${opt.ls ?? 0}|${opt.seed ?? 3}`;
  let p = TEXT_CACHE.get(key);
  if (!p) { p = textPiece(text, size, weight, col, font, opt.seed ?? 3, opt.ls ?? 0); TEXT_CACHE.set(key, p); }
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

// ===================== paper pieces =====================
const sheet = piece([-500, -780, 500, 780], q => {
  q.save(); q.beginPath();
  trace(q, Pl([[-490, -770], [490, -770], [490, 770], [-490, 770]], true, 1.5, 3));
  q.clip(); fillPaper(q, 'rice', -500, -780, 1000, 1560, [1, 0, 0, 1, 0, 0]);
  q.strokeStyle = 'rgba(120,96,62,.09)'; q.lineWidth = 2;
  q.beginPath(); q.moveTo(0, -770); q.lineTo(0, 770); q.stroke();
  q.beginPath(); q.moveTo(-490, -220); q.lineTo(490, -220); q.stroke();
  q.fillStyle = 'rgba(150,120,80,.10)'; q.beginPath();
  q.moveTo(400, 770); q.lineTo(490, 680); q.lineTo(490, 770); q.closePath(); q.fill();
  q.restore();
}, { ss: 1.25, seed: 5, edge: 1.6 });

const titlePanel = piece([-450, -160, 450, 160], q => {
  fill(q, qq => trace(qq, Pl([[-450, -160], [450, -160], [450, 160], [-450, 160]], true, .8, 4)), C.red2);
  q.strokeStyle = C.gold; q.lineWidth = 7; q.strokeRect(-434, -144, 868, 288);
  q.strokeStyle = 'rgba(243,217,138,.34)'; q.lineWidth = 2; q.strokeRect(-418, -128, 836, 256);
  for (let k = 0; k < 22; k++) {
    q.fillStyle = `rgba(230,191,95,${.16 + hash(k) * .34})`;
    q.beginPath(); q.arc(-410 + hash(k * 1.7) * 820, -142 + hash(k * 2.9) * 284, .8 + hash(k * 3.3) * 1.6, 0, TAU); q.fill();
  }
  rosette(q, -404, -114, 17, 6, 0, .24); rosette(q, 404, 114, 17, 6, 0, .24);
}, { ss: 1.5, seed: 17, edge: 1.2 });

const windowCut = piece([-310, -360, 310, 360], q => {
  q.save(); q.beginPath();
  trace(q, Pl([[-302, -352], [302, -352], [302, 352], [-302, 352]], true, 1.1, 3));
  q.clip(); fillPaper(q, 'rice', -310, -360, 620, 720, [1, 0, 0, 1, 0, 0]);
  fill(q, qq => roundRectPath(qq, -280, -330, 560, 50, 10), C.ink);
  q.fillStyle = C.gold; for (let i = 0; i < 3; i++) { q.beginPath(); q.arc(-254 + i * 20, -305, 5, 0, TAU); q.fill(); }
  fill(q, qq => roundRectPath(qq, -170, -320, 380, 28, 14), C.cream);
  q.font = '600 15px "Plus Jakarta Sans"'; q.fillStyle = C.ink; q.textAlign = 'center'; q.textBaseline = 'middle';
  q.fillText('tu-negocio.com', 20, -306);
  fill(q, qq => roundRectPath(qq, -280, -256, 560, 360, 14), C.red);
  q.strokeStyle = C.gold; q.lineWidth = 4; q.beginPath(); roundRectPath(q, -274, -250, 548, 348, 12); q.stroke();
  q.font = '400 59px "Archivo Black"'; q.fillStyle = C.cream; q.textAlign = 'left'; q.textBaseline = 'alphabetic';
  q.fillText('TU NEGOCIO', -242, -170);
  q.font = '400 37px "Archivo Black"'; q.fillStyle = C.gold2; q.fillText('EN PRIMERA LÍNEA', -242, -118);
  q.font = '600 17px "Plus Jakarta Sans"'; q.fillStyle = C.cream; q.fillText('Diseño premium. Listo en días.', -242, -78);
  fill(q, qq => roundRectPath(qq, -242, -52, 250, 48, 24), C.cream);
  q.font = '800 14px "Plus Jakarta Sans"'; q.fillStyle = C.red; q.textAlign = 'center'; q.textBaseline = 'middle';
  q.fillText('PEDIR PRESUPUESTO', -117, -28);
  fill(q, qq => roundRectPath(qq, 54, -212, 208, 176, 12), C.cream);
  fill(q, qq => roundRectPath(qq, 70, -196, 176, 26, 8), C.gold);
  q.fillStyle = 'rgba(27,42,65,.22)'; q.fillRect(70, -148, 176, 5); q.fillRect(70, -128, 138, 5); q.fillRect(70, -108, 160, 5);
  q.fillStyle = C.red; q.beginPath(); q.arc(160, -64, 18, 0, TAU); q.fill();
  q.fillStyle = C.cream; q.font = '400 22px "Archivo Black"'; q.textAlign = 'center'; q.textBaseline = 'middle'; q.fillText('›', 162, -63);
  fill(q, qq => roundRectPath(qq, -280, 142, 560, 54, 12), C.ink);
  q.font = '800 15px "Plus Jakarta Sans"'; q.fillStyle = C.gold2; q.textAlign = 'center'; q.fillText('ABIERTO 24/7  ·  SEO LOCAL  ·  SOPORTE REAL', 0, 169);
  q.fillStyle = 'rgba(27,42,65,.20)'; q.fillRect(-280, 226, 560, 5); q.fillRect(-280, 246, 470, 5); q.fillRect(-280, 266, 520, 5);
  q.restore();
}, { ss: 1.7, seed: 29, edge: 1.4 });

const cutCard = piece([-145, -175, 145, 175], q => {
  q.save(); q.beginPath();
  trace(q, Pl([[-141, -171], [141, -171], [141, 171], [-141, 171]], true, .8, 3));
  q.clip(); fillPaper(q, 'rice', -145, -175, 290, 350, [1, 0, 0, 1, 0, 0]);
  q.restore();
  q.strokeStyle = C.red; q.lineWidth = 3; q.setLineDash([7, 7]);
  q.beginPath(); roundRectPath(q, -132, -162, 264, 324, 12); q.stroke(); q.setLineDash([]);
  fill(q, qq => roundRectPath(qq, -118, -148, 236, 34, 6), C.ink);
  q.fillStyle = C.gold; for (let i = 0; i < 3; i++) { q.beginPath(); q.arc(-104 + i * 13, -131, 3.5, 0, TAU); q.fill(); }
  fill(q, qq => roundRectPath(qq, -74, -142, 156, 22, 11), C.cream);
  q.font = '600 8px "Plus Jakarta Sans"'; q.fillStyle = C.ink; q.textAlign = 'center'; q.textBaseline = 'middle'; q.fillText('tu-negocio.com', 4, -131);
  fill(q, qq => roundRectPath(qq, -118, -100, 236, 104, 8), C.red);
  q.font = '400 23px "Archivo Black"'; q.fillStyle = C.cream; q.textAlign = 'left'; q.textBaseline = 'alphabetic'; q.fillText('TU NEGOCIO', -102, -58);
  q.font = '400 15px "Archivo Black"'; q.fillStyle = C.gold2; q.fillText('EN PRIMERA LÍNEA', -102, -34);
  fill(q, qq => roundRectPath(qq, -118, 22, 236, 62, 8), 'rgba(27,42,65,.12)');
  q.fillStyle = C.ink; q.beginPath(); q.arc(-98, 54, 8, 0, TAU); q.fill();
  q.font = '400 12px "Archivo Black"'; q.fillStyle = C.ink; q.textAlign = 'left'; q.fillText('ESTAMOS', -82, 58);
  q.fillStyle = 'rgba(27,42,65,.30)'; q.fillRect(-118, 102, 236, 4); q.fillRect(-118, 116, 180, 4);
  q.strokeStyle = 'rgba(201,162,39,.6)'; q.lineWidth = 2; q.beginPath(); roundRectPath(q, -136, -166, 272, 332, 14); q.stroke();
}, { ss: 2.6, seed: 37, edge: 1.2 });

const plaque = piece([-220, -240, 220, 240], q => {
  q.save(); q.beginPath();
  trace(q, Pl([[-214, -234], [214, -234], [214, 234], [-214, 234]], true, 1.1, 3));
  q.clip(); fillPaper(q, 'rice', -220, -240, 440, 480, [1, 0, 0, 1, 0, 0]);
  q.restore();
  q.strokeStyle = C.gold; q.lineWidth = 6; q.strokeRect(-204, -224, 408, 448);
  q.strokeStyle = 'rgba(210,32,31,.25)'; q.lineWidth = 2; q.strokeRect(-194, -214, 388, 428);
  q.drawImage(LOGO.red.c, -188, -204, 376, 406);
  rosette(q, -198, -212, 15, 6, 0, .24); rosette(q, 198, 212, 15, 6, 0, .24);
}, { ss: 1.8, seed: 43, edge: 1.4 });

// ===================== geometry helpers =====================
function rrPoly(cx, cy, w, h, r, step = 10) {
  const x0 = cx - w / 2, y0 = cy - h / 2, x1 = cx + w / 2, y1 = cy + h / 2, out = [];
  const corner = (ccx, ccy, a0, a1) => {
    const n = Math.max(2, Math.ceil((Math.abs(a1 - a0) * r) / step));
    for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; out.push([ccx + Math.cos(a) * r, ccy + Math.sin(a) * r]); }
  };
  out.push([x1, y0 + r]); out.push([x1, y1 - r]);
  corner(x1 - r, y1 - r, 0, Math.PI / 2);
  out.push([x0 + r, y1]);
  corner(x0 + r, y1 - r, Math.PI / 2, Math.PI);
  out.push([x0, y0 + r]);
  corner(x0 + r, y0 + r, Math.PI, Math.PI * 1.5);
  out.push([x1 - r, y0]);
  corner(x1 - r, y0 + r, Math.PI * 1.5, Math.PI * 2);
  return out;
}
function pathData(poly) {
  if (poly._pd) return poly._pd;
  const L = [0]; for (let i = 1; i < poly.length; i++) L.push(L[i - 1] + Math.hypot(poly[i][0] - poly[i - 1][0], poly[i][1] - poly[i - 1][1]));
  return poly._pd = { L, tot: L[L.length - 1] };
}
function pathAt(poly, u) {
  const d = pathData(poly), s = clamp(u) * d.tot; let i = 0;
  while (i < d.L.length - 2 && d.L[i + 1] < s) i++;
  const f = (s - d.L[i]) / ((d.L[i + 1] - d.L[i]) || 1), a = poly[i], b = poly[i + 1];
  const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1;
  return { x: lerp(a[0], b[0], f), y: lerp(a[1], b[1], f), tx: dx / l, ty: dy / l };
}
function partialPts(poly, u) {
  const d = pathData(poly), s = clamp(u) * d.tot, out = [poly[0]];
  for (let i = 0; i < poly.length - 1; i++) {
    if (d.L[i + 1] <= s) out.push(poly[i + 1]);
    else { const f = (s - d.L[i]) / ((d.L[i + 1] - d.L[i]) || 1); out.push([lerp(poly[i][0], poly[i + 1][0], f), lerp(poly[i][1], poly[i + 1][1], f)]); break; }
  }
  return out;
}
function strokeCut(g, poly, u, alpha = 1) {
  const pts = partialPts(poly, u); if (pts.length < 2 || alpha <= 0) return;
  const p = new Path2D(); p.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) p.lineTo(pts[i][0], pts[i][1]);
  g.save(); g.lineJoin = 'round'; g.lineCap = 'round';
  g.strokeStyle = `rgba(15,9,20,${.62 * alpha})`; g.lineWidth = 9; g.stroke(p);
  g.strokeStyle = `rgba(255,228,185,${.34 * alpha})`; g.lineWidth = 2.4; g.stroke(p);
  g.restore();
}
function drawGuide(g, poly, alpha) {
  if (alpha <= 0) return;
  g.save(); g.strokeStyle = `rgba(210,32,31,${.5 * alpha})`; g.lineWidth = 3;
  g.setLineDash([10, 12]); g.shadowColor = 'rgba(210,32,31,.35)'; g.shadowBlur = 9;
  g.beginPath(); trace(g, poly); g.stroke(); g.restore();
}
function drawShaving(g, x, y, rot, alpha) {
  if (alpha <= 0) return;
  g.save(); g.translate(x, y); g.rotate(rot); g.globalAlpha = alpha;
  g.fillStyle = C.cream; g.beginPath();
  g.moveTo(-7, -2); g.quadraticCurveTo(0, -7, 8, 0); g.quadraticCurveTo(0, 3, -7, 2); g.closePath(); g.fill();
  g.strokeStyle = 'rgba(201,162,39,.55)'; g.lineWidth = 1; g.stroke(); g.restore();
}
function shavings(g, t, poly, t0, t1, n = 22, seed = 1) {
  for (let k = 0; k < n; k++) {
    const tk = t0 + (k + 1) / (n + 1) * (t1 - t0); if (t < tk) continue;
    const age = t - tk; if (age > 1.15) continue;
    const p = pathAt(poly, (k + 1) / (n + 1));
    const x = p.x + Math.sin(age * 5 + k) * 24 + (hash(k + seed) - .5) * 20;
    const y = p.y + 55 * age + 380 * age * age;
    drawShaving(g, x, y, hash(k * 3 + seed) * 6 + age * 4, 1 - age / 1.15);
  }
}
function personAt(g, p, x, feet, s, pose = {}, opt = {}) {
  drawPerson(g, mul(Tm(x, feet - 12 * s), S(s)), p, pose, opt);
}
function drawHole(g, x, y, w, h, r) {
  g.save(); g.beginPath(); roundRectPath(g, x, y, w, h, r); g.clip();
  g.fillStyle = '#0b0914'; g.fillRect(x, y, w, h);
  const gr = g.createLinearGradient(0, y, 0, y + h);
  gr.addColorStop(0, 'rgba(0,0,0,.62)'); gr.addColorStop(.22, 'rgba(0,0,0,0)'); gr.addColorStop(.82, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,.42)');
  g.fillStyle = gr; g.fillRect(x, y, w, h);
  g.strokeStyle = 'rgba(0,0,0,.55)'; g.lineWidth = 18; g.beginPath(); roundRectPath(g, x + 9, y + 9, w - 18, h - 18, r); g.stroke();
  g.restore();
  strokeRound(g, x, y, w, h, r, 'rgba(242,232,213,.28)', 3);
  strokeRound(g, x + 5, y + 5, w - 10, h - 10, r, 'rgba(201,162,39,.35)', 1.5);
}
function darkStage(g, t, warm = 1) {
  fillPaper(g, 'ink', 0, 0, W, H, [1, 0, 0, 1, 0, 0]);
  const v = g.createLinearGradient(0, 0, 0, H);
  v.addColorStop(0, 'rgba(8,10,24,.62)'); v.addColorStop(.42, 'rgba(18,16,38,.10)'); v.addColorStop(1, 'rgba(5,4,12,.55)');
  g.fillStyle = v; g.fillRect(0, 0, W, H);
  g.save(); g.globalCompositeOperation = 'lighter';
  const r = g.createRadialGradient(540, 1010, 0, 540, 1010, 720);
  r.addColorStop(0, `rgba(255,190,105,${.24 * warm})`); r.addColorStop(.45, `rgba(210,60,45,${.10 * warm})`); r.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = r; g.fillRect(0, 240, W, 1480); g.restore();
  for (let k = 0; k < 46; k++) {
    const x = hash(k * 1.37) * W, y = 180 + hash(k * 2.91) * 1500, tw = .45 + .55 * Math.sin(t * 1.7 + k);
    g.fillStyle = `rgba(243,217,138,${.05 + .12 * tw})`;
    g.beginPath(); g.arc(x, y, .8 + hash(k * 3.77) * 1.7, 0, TAU); g.fill();
  }
}
function rays(g, t, cx, cy, n, alpha) {
  g.save(); g.translate(cx, cy); g.rotate(t * .045); g.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) {
    const a = i / n * TAU, w = TAU / n * .30;
    g.fillStyle = `rgba(243,217,138,${alpha * (.55 + .45 * Math.sin(i * 2.7))})`;
    g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, 900, a - w, a + w); g.closePath(); g.fill();
  }
  g.restore();
}
function flashAt(t) {
  let f = 0;
  for (const b of BOUNDS) { const d = Math.abs(t - b); if (d < .14) f = Math.max(f, (1 - d / .14) * .33); }
  return f;
}

// ===================== 1. hook =====================
function drawDesk(g, t) {
  fillPaper(g, 'ink', 0, 0, W, H, [1, 0, 0, 1, 0, 0]);
  const gr = g.createRadialGradient(540, 900, 0, 540, 900, 980);
  gr.addColorStop(0, 'rgba(89,52,58,.30)'); gr.addColorStop(.45, 'rgba(38,28,48,.12)'); gr.addColorStop(1, 'rgba(4,4,10,.58)');
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  for (let k = 0; k < 26; k++) {
    g.fillStyle = `rgba(201,162,39,${.05 + hash(k * 4.1) * .10})`;
    g.beginPath(); g.arc(hash(k * 1.7) * W, hash(k * 2.3) * H, .7 + hash(k * 3.1) * 1.8, 0, TAU); g.fill();
  }
}
const HOOK_PATH = rrPoly(540, 1080, 620, 720, 26, 9);
function hook(g, t) {
  drawDesk(g, t);
  put(g, sheet, [.99, 0, 0, .99, 540, 960], { shadow: 1.5 });

  const pa = seg(t, .14, .40), pdrop = back(seg(t, .24, .58), 1.35), py = lerp(-230, 352, pdrop);
  const titleA = pa * (1 - seg(t, 1.90, 2.12));
  put(g, titlePanel, [.98, 0, 0, .98, 540, py], { shadow: 1.4, alpha: titleA });
  paperText(g, 'PARA GOOGLE, SOS', 70, C.cream, 'Archivo Black', 540, py - 122, { maxW: 780, alpha: titleA, shadow: 1.1 });
  paperText(g, 'UNA HOJA EN BLANCO.', 58, C.gold3, 'Archivo Black', 540, py - 22, { maxW: 780, alpha: titleA, shadow: 1.0 });

  const guideA = seg(t, .12, .44) * (1 - seg(t, 1.58, 1.74));
  drawGuide(g, HOOK_PATH, guideA);

  const p = eo(seg(t, .55, 1.58));
  strokeCut(g, HOOK_PATH, p, 1);
  shavings(g, t, HOOK_PATH, .55, 1.58, 24, 3);

  let sx, sy, sa, so;
  if (t < .55) {
    const u = eio(seg(t, .26, .55)), q = pathAt(HOOK_PATH, 0);
    sx = lerp(1270, q.x - q.tx * 195, u); sy = lerp(310, q.y - q.ty * 195, u);
    sa = Math.PI / 2; so = .18;
  } else if (t < 1.58) {
    const q = pathAt(HOOK_PATH, p);
    sx = q.x - q.tx * 195; sy = q.y - q.ty * 195; sa = Math.atan2(q.ty, q.tx);
    so = .16 + .38 * (.5 + .5 * Math.sin(t * 26));
  } else {
    const u = eio(seg(t, 1.58, 2.05)), q = pathAt(HOOK_PATH, 1);
    sx = lerp(q.x - q.tx * 195, 1260, u); sy = lerp(q.y - q.ty * 195, 260, u);
    sa = lerp(Math.atan2(q.ty, q.tx), -.55, u); so = .20;
  }
  drawScissors(g, sx, sy, 1.06, sa, so, 1.2);

  if (t > 1.58) {
    drawHole(g, 230, 720, 620, 720, 26);
    const u = seg(t, 1.58, 2.06), a = 1 - seg(t, 1.94, 2.12);
    const x = 540 + 38 * Math.sin(u * Math.PI), y = 1080 + 980 * ei(u), rot = .10 * Math.sin(u * Math.PI * .5);
    put(g, windowCut, mul(Tm(x, y), mul(R(rot), S(1.0))), { shadow: 1.5, alpha: Math.max(0, a) });
  }
  if (p > .985) drawSparkle(g, 850, 746, 26, C.gold2, seg(t, 1.55, 1.7) * (1 - seg(t, 1.75, 1.95)), t * .5);
}

// ===================== 2. street =====================
function street(g, t) {
  const u = eio(seg(t, T.hook, T.street));
  const walk = eio(seg(t, 2.34, 4.98));
  const step = t * 7.4;
  drawStreet(g, t, {
    mode: 'wide', camX: lerp(-34, 52, u), zoom: lerp(.95, 1.02, u), cy: lerp(1018, 1028, u),
    customer: {
      x: lerp(150, 555, walk), y: 1460, s: .94,
      pose: { bob: Math.abs(Math.sin(step)) * 3, legF: Math.sin(step) * .15, legB: -Math.sin(step) * .15, armF: -.62, headY: 3, headRot: .05, expr: 'neutral' }
    }
  });
  g.save(); g.globalCompositeOperation = 'lighter';
  const a = .08 + .05 * Math.sin(t * 2.2);
  const gr = g.createRadialGradient(930, 1120, 0, 930, 1120, 260);
  gr.addColorStop(0, `rgba(90,210,190,${a})`); gr.addColorStop(1, 'rgba(90,210,190,0)');
  g.fillStyle = gr; g.fillRect(650, 840, 560, 560); g.restore();
  if (walk > .82) drawSparkle(g, 790, 1240, 12, C.gold2, seg(t, 4.55, 4.75) * (1 - seg(t, 4.8, 4.98)), t * .4);
}

// ===================== 3. map =====================
function mapCard(g, t) {
  const x = 310, y = 560, w = 460, h = 840;
  g.save(); g.shadowColor = 'rgba(6,4,12,.55)'; g.shadowBlur = 34; g.shadowOffsetX = 10; g.shadowOffsetY = 16;
  g.beginPath(); roundRectPath(g, x, y, w, h, 24); g.fillStyle = C.cream; g.fill(); g.restore();
  g.save(); g.beginPath(); roundRectPath(g, x, y, w, h, 24); g.clip();
  fillPaper(g, 'rice', x, y, w, h, [1, 0, 0, 1, 0, 0]);
  g.fillStyle = 'rgba(216,201,174,.62)';
  for (const rx of [390, 540, 690]) g.fillRect(rx - 18, y, 36, h);
  for (const ry of [700, 880, 1060, 1240]) g.fillRect(x, ry - 18, w, 36);
  g.strokeStyle = 'rgba(201,162,39,.55)'; g.lineWidth = 2; g.setLineDash([7, 9]);
  for (const rx of [390, 540, 690]) { g.beginPath(); g.moveTo(rx, y); g.lineTo(rx, y + h); g.stroke(); }
  for (const ry of [700, 880, 1060, 1240]) { g.beginPath(); g.moveTo(x, ry); g.lineTo(x + w, ry); g.stroke(); }
  g.setLineDash([]);
  const blocks = [[420, 640, 70, 44, 'rgba(27,42,65,.14)'], [600, 640, 120, 44, 'rgba(210,32,31,.18)'], [440, 748, 100, 96, 'rgba(27,42,65,.13)'], [590, 748, 100, 96, 'rgba(47,111,107,.16)'], [350, 930, 130, 100, 'rgba(27,42,65,.12)'], [590, 930, 70, 100, 'rgba(201,162,39,.18)'], [610, 1100, 90, 110, 'rgba(27,42,65,.13)'], [340, 1100, 80, 110, 'rgba(47,111,107,.13)']];
  for (const [bx, by, bw, bh, col] of blocks) { g.fillStyle = col; roundRectPath(g, bx, by, bw, bh, 7); g.fill(); }
  g.fillStyle = 'rgba(27,42,65,.34)'; g.font = '600 11px "Plus Jakarta Sans"'; g.textAlign = 'left'; g.textBaseline = 'middle';
  g.fillText('AV. PAPEL', 320, 676); g.fillText('CALLE 3', 448, 862); g.fillText('PASAJE SUR', 620, 1042);
  g.strokeStyle = 'rgba(47,111,107,.62)'; g.lineWidth = 3; g.setLineDash([6, 9]);
  g.beginPath(); g.moveTo(420, 1200); g.quadraticCurveTo(520, 1120, 616, 968); g.stroke(); g.setLineDash([]);
  const pulse = .55 + .45 * Math.sin(t * 5.2);
  g.save(); g.lineWidth = 4; g.setLineDash([8, 7]); g.strokeStyle = `rgba(210,32,31,${.55 + .35 * pulse})`;
  g.shadowColor = 'rgba(210,32,31,.45)'; g.shadowBlur = 12; roundRectPath(g, 348, 1012, 148, 122, 9); g.stroke(); g.restore();
  g.fillStyle = 'rgba(250,246,236,.92)'; roundRectPath(g, 348, 1012, 148, 122, 9); g.fill();
  g.fillStyle = C.red; g.font = '400 22px "Archivo Black"'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText('TU LOCAL', 422, 1048);
  g.font = '600 15px "Plus Jakarta Sans"'; g.fillStyle = C.ink3; g.fillText('sin web', 422, 1080);
  g.fillStyle = C.red; g.font = '400 22px "Archivo Black"'; g.fillText('?', 422, 1112);
  const drop = back(seg(t, 5.48, 5.82), 1.5), pinY = 900 - 80 * (1 - drop);
  drawPin(g, 660, pinY, 1.08, C.jade);
  g.save(); g.shadowColor = 'rgba(8,5,14,.4)'; g.shadowBlur = 8; g.shadowOffsetX = 3; g.shadowOffsetY = 4;
  g.fillStyle = C.jade2; roundRectPath(g, 604, 922, 132, 34, 8); g.fill(); g.restore();
  g.fillStyle = C.cream; g.font = '800 13px "Plus Jakarta Sans"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('CAFÉ JADE', 670, 940);
  const up = .6 + .4 * Math.sin(t * 4.4);
  g.save(); g.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 2; i++) { g.strokeStyle = `rgba(80,160,235,${.40 * up * (1 - i * .4)})`; g.lineWidth = 3; g.beginPath(); g.arc(420, 1200, 18 + i * 14 + (t * 22 % 20), 0, TAU); g.stroke(); }
  g.restore();
  g.fillStyle = '#3a86c8'; g.beginPath(); g.arc(420, 1200, 11, 0, TAU); g.fill();
  g.fillStyle = C.white; g.beginPath(); g.arc(420, 1200, 4.5, 0, TAU); g.fill();
  g.save(); g.shadowColor = 'rgba(8,5,14,.25)'; g.shadowBlur = 10; g.shadowOffsetY = 4;
  fillRound(g, 342, 598, 396, 56, 28, C.white, 0); g.restore();
  strokeRound(g, 342, 598, 396, 56, 28, 'rgba(201,162,39,.62)', 2);
  g.strokeStyle = C.ink3; g.lineWidth = 2.6; g.beginPath(); g.arc(372, 624, 8, 0, TAU); g.stroke();
  g.beginPath(); g.moveTo(378, 630); g.lineTo(385, 637); g.stroke();
  g.fillStyle = C.ink; g.font = '600 19px "Plus Jakarta Sans"'; g.textAlign = 'left'; g.textBaseline = 'middle';
  g.fillText('café cerca de mí', 400, 627);
  const ca = back(seg(t, 5.90, 6.22), 1.5);
  if (ca > 0) {
    g.save(); g.globalAlpha = Math.min(1, ca); g.translate(540, 1330); g.scale(ca, ca);
    g.shadowColor = 'rgba(8,5,14,.45)'; g.shadowBlur = 12; g.shadowOffsetY = 5;
    g.fillStyle = C.red2; roundRectPath(g, -196, -27, 392, 54, 9); g.fill(); g.restore();
    g.save(); g.globalAlpha = Math.min(1, ca); g.fillStyle = C.cream; g.font = '400 19px "Archivo Black"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('0 RESULTADOS PARA TU LOCAL', 540, 1330); g.restore();
  }
  g.strokeStyle = 'rgba(120,96,62,.12)'; g.lineWidth = 2;
  g.beginPath(); g.moveTo(540, y); g.lineTo(540, y + h); g.moveTo(x, 980); g.lineTo(x + w, 980); g.stroke();
  g.restore();
  strokeRound(g, x, y, w, h, 24, 'rgba(201,162,39,.44)', 2.5);
}
function phoneMap(g, t) {
  darkStage(g, t, .75);
  const u = eio(seg(t, 5.0, 5.34));
  const py = lerp(1180, 980, u), s = .8;
  mapCard(g, t);
  put(g, phoneFrame, [s, 0, 0, s, 540, py], { shadow: 1.6 });
  g.save(); g.globalCompositeOperation = 'lighter';
  const gl = g.createRadialGradient(540, py, 0, 540, py, 470);
  gl.addColorStop(0, 'rgba(255,200,120,.12)'); gl.addColorStop(1, 'rgba(255,180,90,0)');
  g.fillStyle = gl; g.fillRect(70, py - 470, 940, 940); g.restore();
  if (t > 5.92) drawSparkle(g, 715, 905, 10, C.gold2, (1 - seg(t, 6.1, 6.35)) * .65, t * .3);
}

// ===================== 4. ignored =====================
function ignored(g, t) {
  const u = eio(seg(t, 6.7, 9.25));
  const camX = lerp(-18, 268, u), z = lerp(1.05, 1.27, u), cy = lerp(1035, 1145, u);
  const pass = eio(seg(t, 6.6, 7.95)), enter = eio(seg(t, 7.95, 9.18));
  const cx = lerp(245, 735, pass) + lerp(0, 190, enter);
  const ownerBob = Math.abs(Math.sin((t - 6.6) * 6.8)) * 10;
  const ownerArm = -2.25 + Math.sin(t * 12.5) * .32;
  drawStreet(g, t, {
    mode: 'medium', camX, zoom: z, cy,
    owner: { x: 540, y: 1470, s: .94, sign: true, pose: { bob: ownerBob, armF: ownerArm, armB: .10 + Math.sin(t * 5) * .06, headRot: Math.sin(t * 6) * .05, expr: 'happy' } },
    customer: { x: cx, y: 1460, s: .94, alpha: 1 - seg(t, 8.72, 9.22), pose: { bob: Math.abs(Math.sin(t * 7.4)) * 3, legF: Math.sin(t * 7.4) * .15, legB: -Math.sin(t * 7.4) * .15, armF: -.62, headY: 3, headRot: .05, expr: 'closed' } },
    jade: { x: 930, y: 1470, s: .94, alpha: seg(t, 7.52, 7.85), pose: { bob: Math.sin(t * 2.2) * 2, armF: t > 8.55 ? -1.6 + Math.sin(t * 9) * .3 : -.12, headRot: t > 8.55 ? .04 : -.04, expr: t > 8.55 ? 'happy' : 'smug' } }
  });
  if (t > 8.9) {
    const g2 = .5 + .5 * Math.sin(t * 7);
    drawSparkle(g, 806, 1260, 15 + 3 * g2, C.gold2, seg(t, 8.9, 9.1), t * .5);
    drawSparkle(g, 856, 1215, 8, C.gold3, seg(t, 9.0, 9.15) * .8, -t * .4);
  }
  const glow = seg(t, 9.2, 9.6) * (.5 + .5 * Math.sin(t * 9));
  if (glow > 0) {
    g.save(); g.globalCompositeOperation = 'lighter';
    const gr = g.createRadialGradient(300, 1110, 0, 300, 1110, 260);
    gr.addColorStop(0, `rgba(210,32,31,${.10 * glow})`); gr.addColorStop(1, 'rgba(210,32,31,0)');
    g.fillStyle = gr; g.fillRect(0, 800, 600, 700); g.restore();
  }
}

// ===================== 5. cut + fold =====================
const CUT_PATH = rrPoly(540, 1037, 391, 472, 21, 7);
function cutFold(g, t) {
  drawStreet(g, t, { mode: 'close', camX: 0, zoom: 1.35, cy: 1120 });
  drawGuide(g, CUT_PATH, seg(t, 9.72, 9.92) * (1 - seg(t, 10.68, 10.86)));
  strokeCut(g, CUT_PATH, eo(seg(t, 9.95, 10.68)), 1);
  shavings(g, t, CUT_PATH, 9.95, 10.68, 20, 7);
  let sa = 0, sx = 0, sy = 0, so = 0;
  if (t > 9.5 && t < 10.72) {
    if (t < 9.95) {
      const q = pathAt(CUT_PATH, 0), uu = seg(t, 9.52, 9.95);
      sx = lerp(q.x - q.tx * 170, q.x - q.tx * 156, uu); sy = lerp(q.y - q.ty * 170, q.y - q.ty * 156, uu);
      sa = Math.atan2(q.ty, q.tx);
    } else {
      const q = pathAt(CUT_PATH, eo(seg(t, 9.95, 10.68)));
      sx = q.x - q.tx * 156; sy = q.y - q.ty * 156; sa = Math.atan2(q.ty, q.tx); so = .16 + .35 * (.5 + .5 * Math.sin(t * 28));
    }
    drawScissors(g, sx, sy, .95, sa, so, 1.2);
  }
  if (t > 10.68) {
    const pop = back(seg(t, 10.68, 11.02), 1.6), a = 1 - seg(t, 11.0, 11.16);
    put(g, cutCard, mul(Tm(lerp(540, 560, pop), lerp(1085, 1030, pop)), S(lerp(.9, 2.55, pop))), { shadow: 1.6, alpha: Math.max(0, a) });
    drawSparkle(g, 820, 760, 32, C.gold2, seg(t, 10.9, 11.05), t * .4);
  }
  if (t > 11.02) {
    const open = back(seg(t, 11.06, 11.70), 1.4), cl = .46 + .54 * open;
    put(g, browser, [cl, 0, 0, .96, 540, 980], { shadow: 1.7 });
    const fa = seg(t, 11.30, 11.56);
    g.save(); g.globalAlpha = fa;
    drawSparkle(g, 318, 900, 18, C.gold2, fa, t * .5);
    drawSparkle(g, 775, 1030, 24, C.gold3, fa * .9, -t * .4);
    drawSparkle(g, 700, 700, 12, C.cream, fa * .7, t * .3); g.restore();
  }
}

// ===================== 6. reveal =====================
function reveal(g, t) {
  darkStage(g, t, .8);
  const push = eio(seg(t, 12.4, 14.15)), lift = eio(seg(t, 14.15, 15.0));
  const s = lerp(1.0, 1.06, push) * lerp(1, .80, lift);
  const cy = lerp(980, 875, lift);
  const alpha = 1 - seg(t, 15.55, 16.0);
  put(g, browser, [s, 0, 0, s, 540, cy], { shadow: 1.7, alpha });
  const gl = .55 + .45 * Math.sin(t * 3.1);
  g.save(); g.globalCompositeOperation = 'lighter';
  const gr = g.createRadialGradient(540, cy, 0, 540, cy, 620 * s);
  gr.addColorStop(0, `rgba(255,200,125,${.10 * gl * alpha})`); gr.addColorStop(1, 'rgba(255,180,90,0)');
  g.fillStyle = gr; g.fillRect(0, cy - 700, W, 1400); g.restore();

  const aIn = seg(t, 14.78, 15.12), turn = seg(t, 15.04, 15.34);
  if (aIn > 0) {
    const bob = Math.abs(Math.sin(t * 6.2)) * 3;
    personAt(g, people.owner, 95, 1400, .52, { back: turn < .5, bob, headRot: Math.sin(t * 4) * .04, legF: .02, legB: -.02, armF: -.08, armB: .05, expr: 'happy' }, { alpha: aIn });
    personAt(g, people.customer, 985, 1400, .52, { back: turn < .5, bob: bob * 1.2, headRot: Math.sin(t * 4.4) * .05, legF: .03, legB: -.03, armF: -.12, armB: .05, expr: 'happy' }, { alpha: aIn });
    drawSparkle(g, 160, 1318, 16, C.gold2, aIn * .7, t * .5);
    drawSparkle(g, 920, 1318, 12, C.gold3, aIn * .55, -t * .4);
  }
  if (lift > .3) {
    const la = seg(t, 14.7, 15.1);
    drawSparkle(g, 540, 1420, 20, C.gold2, la * .7, t * .4);
  }
}

// ===================== 7. portfolio =====================
function cardAt(g, p, x, y, s, rot, enter, label, labelY, labelSize = 26, labelX = x) {
  if (enter <= 0) return;
  const e = back(enter, 1.5), yy = lerp(2200, y, e), rr = lerp(rot * 2.4, rot, e), ss2 = lerp(.3, s, e);
  put(g, p, mul(Tm(x, yy), mul(R(rr), S(ss2))), { shadow: 1.5, alpha: Math.min(1, enter * 2) });
  const la = seg(enter, .55, .95);
  if (la > 0) paperText(g, label, labelSize, C.gold3, 'Archivo Black', labelX, labelY, { maxW: 330, alpha: la, shadow: .8 });
}
function portfolio(g, t) {
  darkStage(g, t, .85);
  rays(g, t, 540, 900, 16, .035);
  paperText(g, 'TRABAJOS REALES', 30, C.cream, 'Plus Jakarta Sans', 540, 468, { maxW: 840, weight: 800, alpha: seg(t, 16.0, 16.25), shadow: .8 });
  const e1 = seg(t, 16.05, 16.75), e2 = seg(t, 16.90, 17.55), e3 = seg(t, 17.65, 18.30);
  cardAt(g, siteGastro, 135, 920, .40, -.05, e2, 'LISTA EN DÍAS', 1160, 21, 155);
  cardAt(g, siteClinica, 945, 920, .40, .05, e3, 'SEO + SOPORTE', 1160, 21, 925);
  cardAt(g, siteMueble, 540, 906, .72, -.02, e1, 'DISEÑO PREMIUM', 1292);
  const sa = seg(t, 18.10, 18.45);
  if (sa > 0) {
    drawSparkle(g, 540, 760, 26, C.gold2, sa * .8, t * .4);
    drawSparkle(g, 906, 1010, 16, C.gold3, sa * .6, -t * .35);
  }
}

// ===================== 8. payoff =====================
function payoff(g, t) {
  const u = eio(seg(t, 19.2, 20.6));
  drawStreet(g, t, {
    mode: 'wide', camX: lerp(-20, 10, u), zoom: lerp(1.0, 1.06, u), cy: lerp(1040, 1010, u), warm: 1, red: true, jadeDark: true,
    queue: [
      { x: 402, y: 1524, s: .86, person: people.q2, phase: 0 },
      { x: 506, y: 1540, s: .88, person: people.q1, phase: 1.7 },
      { x: 610, y: 1524, s: .86, person: people.q3, phase: 3.1 }
    ]
  });
  g.save(); g.globalCompositeOperation = 'lighter';
  const gl = .55 + .45 * Math.sin(t * 2.6);
  const gr = g.createRadialGradient(540, 1240, 0, 540, 1240, 420);
  gr.addColorStop(0, `rgba(255,205,130,${.16 * gl})`); gr.addColorStop(1, 'rgba(255,180,90,0)');
  g.fillStyle = gr; g.fillRect(60, 800, 960, 900); g.restore();
  const ta = seg(t, 19.55, 19.95) * (1 - seg(t, 21.18, 21.4));
  paperText(g, 'TU NEGOCIO,', 74, C.cream, 'Archivo Black', 540, 566, { maxW: 920, alpha: ta, shadow: 1.3 });
  paperText(g, 'VISIBLE.', 100, C.gold2, 'Archivo Black', 540, 652, { maxW: 920, alpha: ta, shadow: 1.4 });
  if (ta > 0) {
    drawSparkle(g, 878, 704, 24, C.gold3, ta * .9, t * .5);
    drawSparkle(g, 188, 620, 15, C.gold2, ta * .7, -t * .4);
  }
}

// ===================== 9. offer =====================
function offer(g, t) {
  darkStage(g, t, 1);
  rays(g, t, 540, 1060, 18, .045);
  const sb = back(seg(t, 21.4, 21.82), 1.35);
  if (sb > 0) put(g, signBoard, mul(Tm(540, 1120 + (1 - sb) * 180), S(.9 * sb)), { shadow: 1.7, alpha: Math.min(1, sb * 1.4) });
  let lx = 540, ly = 300, ls = .12, lr = -.5, la = 0;
  if (t > 21.55) {
    const land = seg(t, 21.55, 22.34);
    if (land < 1) {
      const u = eio(land);
      lx = lerp(940, 540, u); ly = lerp(250, 1058, u); ls = lerp(.10, .29, u); lr = lerp(-.6, 0, u); la = 1;
    } else {
      const b = seg(t, 22.34, 22.7), dip = 1 - .05 * Math.sin(b * Math.PI);
      lx = 540; ly = 1058; ls = .29 * dip; lr = 0; la = 1;
    }
    if (t > 25.05) la *= 1 - seg(t, 25.05, 25.35);
    if (la > 0) drawLogo(g, lx, ly, ls, lr, la);
  }
  const fu = seg(t, 22.80, 23.42);
  if (fu > 0) {
    const scale = .76 * eo(fu), sc = Math.max(.02, scale);
    if (fu < 1) {
      g.save(); g.globalAlpha = Math.min(1, fu * 1.6);
      put(g, flag, [sc, 0, 0, .76 * Math.min(1, fu * 1.3), 540, 1384], { shadow: 1.4 });
      g.restore();
    } else {
      put(g, flag, [.76, 0, 0, .76, 540, 1384], { shadow: 1.4, alpha: 1 - seg(t, 25.05, 25.35) });
    }
    const fa = seg(t, 23.1, 23.5);
    if (fa > 0) {
      drawSparkle(g, 905, 1290, 18, C.gold2, fa * .8, t * .5);
      drawSparkle(g, 170, 1470, 12, C.gold3, fa * .6, -t * .4);
    }
  }
  if (t > 23.3) {
    const pulse = .5 + .5 * Math.sin(t * 5.4);
    g.save(); g.globalCompositeOperation = 'lighter';
    const gr = g.createRadialGradient(540, 1384, 0, 540, 1384, 380);
    gr.addColorStop(0, `rgba(255,205,120,${.10 + .05 * pulse})`); gr.addColorStop(1, 'rgba(255,170,80,0)');
    g.fillStyle = gr; g.fillRect(120, 1080, 840, 620); g.restore();
  }
}
function drawLogo(g, x, y, s, rot, alpha) {
  const w = 648 * s, h = 700 * s;
  g.save(); g.globalAlpha = alpha; g.translate(x, y); g.rotate(rot);
  g.shadowColor = 'rgba(6,3,10,.5)'; g.shadowBlur = 24; g.shadowOffsetX = 8; g.shadowOffsetY = 12;
  g.drawImage(LOGO.cream.c, -w / 2, -h / 2, w, h); g.restore();
}

// ===================== 10. DM =====================
function dmBubble(g, x, y, w, h, col, text, tcol, alpha, align = 'left') {
  if (alpha <= 0) return;
  g.save(); g.globalAlpha = alpha;
  g.shadowColor = 'rgba(0,0,0,.35)'; g.shadowBlur = 10; g.shadowOffsetY = 3;
  fillRound(g, x, y, w, h, 18, col, 0); g.restore();
  g.save(); g.globalAlpha = alpha; g.fillStyle = tcol; g.font = '600 16px "Plus Jakarta Sans"'; g.textAlign = align; g.textBaseline = 'middle';
  const lines = text.split('\n');
  lines.forEach((l, i) => g.fillText(l, align === 'left' ? x + 18 : x + w - 18, y + h / 2 + (i - (lines.length - 1) / 2) * 22));
  g.restore();
}
function dm(g, t) {
  darkStage(g, t, .9);
  const u = back(seg(t, 25.4, 25.82), 1.3);
  const py = lerp(1260, 880, u), s = .78;
  const y0 = py - 390, y1 = py + 390;
  const scrA = seg(t, 25.45, 25.65);
  const gl = .55 + .45 * Math.sin(t * 3.4);
  g.save(); g.globalCompositeOperation = 'lighter';
  const gr = g.createRadialGradient(540, py, 0, 540, py, 520);
  gr.addColorStop(0, `rgba(255,190,110,${.15 * gl * scrA})`); gr.addColorStop(1, 'rgba(255,160,80,0)');
  g.fillStyle = gr; g.fillRect(40, py - 560, 1000, 1120); g.restore();

  g.save(); g.globalAlpha = scrA;
  fillRound(g, 330, y0, 420, 780, 30, '#0d1424', 0);
  g.save(); g.beginPath(); roundRectPath(g, 330, y0, 420, 780, 30); g.clip();
  g.fillStyle = 'rgba(30,44,72,.86)'; g.fillRect(330, y0, 420, 104);
  g.fillStyle = C.gold; g.beginPath(); g.arc(382, y0 + 52, 25, 0, TAU); g.fill();
  g.fillStyle = C.ink2; g.font = '400 22px "Archivo Black"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('A', 382, y0 + 53);
  g.textAlign = 'left'; g.fillStyle = C.cream; g.font = '800 17px "Plus Jakarta Sans"'; g.fillText('arlia.studio', 418, y0 + 44);
  g.fillStyle = C.jade3; g.font = '600 12px "Plus Jakarta Sans"'; g.fillText('en línea', 418, y0 + 67);
  g.fillStyle = 'rgba(210,32,31,.92)'; roundRectPath(g, 686, y0 + 38, 46, 28, 8); g.fill();
  g.fillStyle = C.cream; g.font = '800 11px "Plus Jakarta Sans"'; g.textAlign = 'center'; g.fillText('DM', 709, y0 + 53);
  g.fillStyle = 'rgba(242,232,213,.06)';
  for (let i = 0; i < 4; i++) g.fillRect(330, y0 + 150 + i * 120, 420, 1);
  g.restore();

  const b1 = back(seg(t, 25.62, 25.9), 1.4);
  if (b1 > 0) { g.save(); g.translate(0, (1 - b1) * -18); dmBubble(g, 350, y0 + 122, 306, 74, '#e8dcc4', 'Contanos qué negocio\ntenés y te paso precio.', C.ink2, Math.min(1, b1 * 1.6)); g.restore(); }
  const b2 = back(seg(t, 26.02, 26.3), 1.4);
  if (b2 > 0) { g.save(); g.translate(0, (1 - b2) * -16); dmBubble(g, 456, y0 + 214, 244, 54, C.red2, 'Quiero mi web.', C.cream, Math.min(1, b2 * 1.6), 'right'); g.restore(); }
  const b3 = back(seg(t, 26.45, 26.75), 1.4);
  if (b3 > 0) { g.save(); g.translate(0, (1 - b3) * -14); dmBubble(g, 350, y0 + 292, 290, 56, '#e8dcc4', '¡Listo! Te mando el\na presupuesto.', C.ink2, Math.min(1, b3 * 1.6)); g.restore(); }
  const ty = y1 - 148;
  g.fillStyle = 'rgba(242,232,213,.10)'; roundRectPath(g, 344, ty, 300, 58, 16); g.fill();
  g.strokeStyle = 'rgba(242,232,213,.22)'; g.lineWidth = 1.5; g.beginPath(); roundRectPath(g, 344, ty, 300, 58, 16); g.stroke();
  const typed = 'PRESUPUESTO'.slice(0, Math.floor(seg(t, 25.95, 26.9) * 11));
  if (typed) { g.save(); g.beginPath(); roundRectPath(g, 352, ty + 6, 284, 46, 12); g.clip(); g.fillStyle = C.cream; g.font = '600 17px "Plus Jakarta Sans"'; g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillText(typed, 362, ty + 30); g.restore(); }
  if (t < 26.05) {
    const bl = .35 + .65 * (.5 + .5 * Math.sin(t * 10));
    g.fillStyle = `rgba(242,232,213,${bl})`; g.font = '600 15px "Plus Jakarta Sans"'; g.textAlign = 'left'; g.fillText('escribiendo...', 362, ty + 30);
  }
  const sent = seg(t, 27.02, 27.12);
  g.save(); g.fillStyle = sent > 0 ? C.gold2 : C.red; g.shadowColor = 'rgba(210,32,31,.5)'; g.shadowBlur = 14;
  g.beginPath(); g.arc(692, ty + 30, 27 - 3 * sent, 0, TAU); g.fill(); g.restore();
  g.strokeStyle = C.cream; g.lineWidth = 3; g.lineCap = 'round';
  g.beginPath(); g.moveTo(682, ty + 38); g.lineTo(702, ty + 30); g.lineTo(682, ty + 22); g.stroke();
  g.beginPath(); g.moveTo(682, ty + 30); g.lineTo(694, ty + 30); g.stroke();
  g.restore();

  put(g, phoneFrame, [s, 0, 0, s, 540, py], { shadow: 1.7, alpha: scrA });
  if (t > 27.02) {
    const f = seg(t, 27.02, 27.46), fu = eio(f);
    const px = lerp(704, 1020, fu), pyy = lerp(ty + 20, 400, fu), rot = lerp(-.2, -.9, fu);
    drawPaperPlane(g, px, pyy, lerp(.5, .85, fu), rot, C.gold2, 1);
    g.save(); g.globalCompositeOperation = 'lighter'; g.strokeStyle = `rgba(243,217,138,${.4 * (1 - f)})`; g.lineWidth = 3;
    g.beginPath(); g.moveTo(704, ty + 20); g.quadraticCurveTo(820, ty - 200, px, pyy); g.stroke(); g.restore();
  }
  const sa = seg(t, 26.15, 26.55);
  if (sa > 0 && t < 27.0) drawSparkle(g, 674, y0 + 352, 12, C.gold2, sa * .7, t * .5);
}

// ===================== 11. loop =====================
const LOOP_PATH = rrPoly(540, 1000, 480, 520, 24, 8);
function loop(g, t) {
  drawDesk(g, t);
  put(g, sheet, [0.99, 0, 0, 0.99, 540, 960], { shadow: 1.5 });
  const enter = back(seg(t, 27.56, 27.92), 1.5);
  if (enter > 0) {
    const fall = ei(seg(t, 28.92, 29.4)), a = 1 - seg(t, 29.26, 29.4);
    const y = 1000 - fall * 760, rot = fall * 1.5, x = 540 - fall * 130;
    if (a > 0) put(g, plaque, mul(Tm(x, y), mul(R(rot), S(.92 * Math.min(1, enter) * (1 + .02 * Math.sin(t * 6))))), { shadow: 1.6, alpha: a });
  }
  drawGuide(g, LOOP_PATH, seg(t, 27.64, 27.84) * (1 - seg(t, 28.92, 29.06)));
  const p = eo(seg(t, 27.86, 28.92));
  strokeCut(g, LOOP_PATH, p, 1 - seg(t, 29.28, 29.5));
  shavings(g, t, LOOP_PATH, 27.86, 28.92, 22, 13);
  if (t > 27.7 && t < 28.98) {
    let sx, sy, sa, so = 0;
    if (t < 27.86) {
      const q = pathAt(LOOP_PATH, 0), uu = seg(t, 27.66, 27.86);
      sx = lerp(q.x - q.tx * 195, q.x - q.tx * 170, uu); sy = lerp(q.y - q.ty * 195, q.y - q.ty * 170, uu); sa = Math.atan2(q.ty, q.tx);
    } else {
      const q = pathAt(LOOP_PATH, p); sx = q.x - q.tx * 170; sy = q.y - q.ty * 170; sa = Math.atan2(q.ty, q.tx);
      so = .16 + .38 * (.5 + .5 * Math.sin(t * 28));
    }
    drawScissors(g, sx, sy, .96, sa, so, 1.2);
  }
  if (t > 28.9) {
    const ta = seg(t, 28.98, 29.22) * (1 - seg(t, 29.38, 29.56));
    paperText(g, 'TU NEGOCIO, VISIBLE.', 46, C.gold2, 'Archivo Black', 540, 952, { maxW: 780, alpha: ta, shadow: 1 });
    drawSparkle(g, 850, 960, 18, C.gold3, ta * .8, t * .4);
    drawSparkle(g, 230, 1000, 12, C.gold2, ta * .6, -t * .3);
  }
}

// ===================== dispatcher =====================
const SCENES = [hook, street, phoneMap, ignored, cutFold, reveal, portfolio, payoff, offer, dm, loop];
export function drawScene(g, t) {
  g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, W, H);
  let i = 0; while (i < BOUNDS.length && t >= BOUNDS[i]) i++;
  SCENES[i](g, t);
  vignette(g);
  grain(g, .10);
  paperFlash(g, flashAt(t));
  drawSubs(g, t, CUES);
}

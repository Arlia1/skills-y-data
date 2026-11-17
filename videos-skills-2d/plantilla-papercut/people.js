import { C, TAU, W, H, clamp, lerp, seg, ss, eio, eo, ei, back, hash, cam, fillPaper, put, mul, Tm, S, R, ap, paperShadow, noShadow, drawSparkle, drawPaperText, vignette, grain } from './core.js';
import { blankShop, shopRed, shopJade, shopLeft, streetBG, streetMid, ground, moon, phoneSmall, signSmall, people } from './pieces.js';

export function drawPerson(g, root, p, pose = {}, opt = {}) {
  const M = mul(root, Tm(0, pose.bob || 0));
  const hip = mul(M, Tm(0, -120));
  const head = mul(M, Tm(pose.headX || 0, -260 + (pose.headY || 0)));
  const armB = mul(M, Tm(-46, -238));
  const armF = mul(M, Tm(46, -238));
  const legB = mul(M, Tm(-22, -120));
  const legF = mul(M, Tm(22, -120));
  const expr = pose.expr || 'neutral';
  put(g, p.leg, mul(legB, R(pose.legB || 0)), { shadow: .45 });
  put(g, p.arm, mul(armB, R(pose.armB || 0)), { shadow: .45 });
  put(g, p.torso, mul(hip, R(pose.lean || 0)), { shadow: .65 });
  put(g, p.leg, mul(legF, R(pose.legF || 0)), { shadow: .55 });
  if (pose.back) put(g, p.backHead, mul(head, R(pose.headRot || 0)), { shadow: .6 });
  else {
    put(g, p.headBack, mul(head, R(pose.headRot || 0)), { shadow: 0 });
    put(g, p.heads[expr] || p.heads.neutral, mul(head, R(pose.headRot || 0)), { shadow: .6 });
  }
  put(g, p.arm, mul(armF, R(pose.armF || 0)), { shadow: .55 });
  if (opt.phone) {
    const hm = mul(armF, R(pose.armF || 0));
    put(g, phoneSmall, mul(hm, Tm(0, 110)), { shadow: .5, alpha: opt.phoneAlpha ?? 1 });
  }
  if (opt.sign) {
    const hm = mul(armF, R(pose.armF || 0));
    put(g, signSmall, mul(hm, mul(Tm(0, 108), R(-(pose.armF || 0) * .92))), { shadow: .75, alpha: opt.signAlpha ?? 1 });
  }
}

function sky(g, t, warm) {
  fillPaper(g, 'indigo', 0, 0, W, H, [1, 0, 0, 1, 0, 0]);
  const gr = g.createLinearGradient(0, 0, 0, H);
  if (warm) {
    gr.addColorStop(0, 'rgba(12,18,38,.88)'); gr.addColorStop(.38, 'rgba(54,32,52,.58)'); gr.addColorStop(.66, 'rgba(150,72,50,.34)'); gr.addColorStop(1, 'rgba(201,162,39,.16)');
  } else {
    gr.addColorStop(0, 'rgba(8,12,28,.78)'); gr.addColorStop(.55, 'rgba(25,34,66,.28)'); gr.addColorStop(1, 'rgba(60,34,56,.32)');
  }
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 52; i++) {
    const x = hash(i * 1.37) * W, y = 60 + hash(i * 2.91) * 820, r = .7 + hash(i * 3.77) * 1.8;
    const tw = .45 + .55 * Math.sin(t * 1.8 + i);
    g.fillStyle = `rgba(242,232,213,${.16 + .22 * tw})`;
    g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill();
  }
  const mx = 875, my = 270;
  if (warm) {
    const gl = g.createRadialGradient(mx, my, 0, mx, my, 300);
    gl.addColorStop(0, 'rgba(255,220,130,.55)'); gl.addColorStop(.4, 'rgba(255,180,80,.18)'); gl.addColorStop(1, 'rgba(255,160,60,0)');
    g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = gl; g.fillRect(mx - 300, my - 300, 600, 600); g.restore();
  }
  put(g, moon, [.82, 0, 0, .82, mx, my], { shadow: .6 });
  if (warm) { g.save(); g.globalCompositeOperation = 'lighter'; g.globalAlpha = .18; g.fillStyle = C.gold2; g.beginPath(); g.arc(mx, my, 100, 0, TAU); g.fill(); g.restore(); }
}

function shopGlow(g, C, x, y, r, col, a = 1) {
  g.save(); g.setTransform(...C); g.globalCompositeOperation = 'lighter'; g.globalAlpha = a;
  const gr = g.createRadialGradient(x, y, 0, x, y, r);
  gr.addColorStop(0, col); gr.addColorStop(.5, col.replace(/[\d.]+\)$/, '.18)')); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2); g.restore();
}

function dottedFacade(g, C) {
  const M = mul(C, Tm(540, 1190));
  g.save(); g.setTransform(...M);
  g.strokeStyle = 'rgba(210,32,31,.8)'; g.lineWidth = 4; g.setLineDash([9, 10]);
  g.beginPath(); g.roundRect(-145, -188, 290, 350, 16); g.stroke();
  g.setLineDash([]);
  g.strokeStyle = 'rgba(27,42,65,.55)'; g.lineWidth = 3;
  g.beginPath(); g.moveTo(-145, -136); g.lineTo(145, -136); g.stroke();
  for (let i = 0; i < 3; i++) { g.fillStyle = 'rgba(210,32,31,.78)'; g.beginPath(); g.arc(-122 + i * 20, -162, 4.5, 0, TAU); g.fill(); }
  g.fillStyle = 'rgba(27,42,65,.82)'; g.beginPath(); g.roundRect(-30, -176, 170, 24, 12); g.fill();
  g.fillStyle = C.cream; g.font = '600 12px "Plus Jakarta Sans"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('tu-negocio.com', 55, -164);
  g.fillStyle = 'rgba(242,232,213,.95)'; g.strokeStyle = C.gold; g.lineWidth = 3;
  g.beginPath(); g.roundRect(-106, -234, 212, 40, 6); g.fill(); g.stroke();
  g.fillStyle = C.red; g.font = '400 17px "Archivo Black"'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText('TU NEGOCIO', 0, -214);
  g.save(); g.globalAlpha = .11; g.fillStyle = C.red; g.font = '400 170px "Archivo Black"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('?', 0, -20); g.restore();
  g.restore();
}

function darkJade(g, C) {
  const M = mul(C, Tm(930, 1170));
  const pts = [ap(M, [-190, -285]), ap(M, [190, -285]), ap(M, [190, 285]), ap(M, [-190, 285])];
  g.save(); g.beginPath(); g.moveTo(...pts[0]); for (let i = 1; i < 4; i++) g.lineTo(...pts[i]); g.closePath(); g.clip();
  g.fillStyle = 'rgba(8,6,18,.58)'; g.fillRect(0, 0, W, H); g.restore();
}

function wires(g, C, t) {
  g.save(); g.setTransform(...C);
  g.strokeStyle = 'rgba(9,7,16,.72)'; g.lineWidth = 3;
  g.beginPath(); g.moveTo(-160, 760); g.quadraticCurveTo(540, 870, 1240, 750); g.stroke();
  for (let i = 0; i < 8; i++) {
    const u = .08 + i * .12, x = lerp(-160, 1240, u), y = (1 - u) * (1 - u) * 760 + 2 * u * (1 - u) * 870 + u * u * 750;
    g.fillStyle = C.gold; g.beginPath(); g.arc(x, y + 10, 5, 0, TAU); g.fill();
    g.save(); g.globalCompositeOperation = 'lighter'; g.globalAlpha = .28 + .08 * Math.sin(t * 2 + i);
    const gr = g.createRadialGradient(x, y + 10, 0, x, y + 10, 35); gr.addColorStop(0, 'rgba(255,210,120,.8)'); gr.addColorStop(1, 'rgba(255,180,80,0)');
    g.fillStyle = gr; g.fillRect(x - 35, y - 25, 70, 70); g.restore();
  }
  g.restore();
}

export function drawStreet(g, t, o = {}) {
  const mode = o.mode || 'wide';
  const z = o.zoom ?? (mode === 'medium' ? 1.27 : .94);
  const cy = o.cy ?? (mode === 'medium' ? 1170 : 1015);
  const cx = 540 + (o.camX || 0);
  const C = cam(cx, cy, z);
  const Cbg = cam(cx * .97 + 16, cy + 40, z * .9);
  const Cmg = cam(cx * .99 + 8, cy + 20, z * .95);
  sky(g, t, o.warm || 0);
  g.save(); g.globalCompositeOperation = 'lighter';
  const hg = g.createRadialGradient(540, 1240, 0, 540, 1240, 670);
  hg.addColorStop(0, o.jadeDark ? 'rgba(40,110,105,.10)' : 'rgba(255,170,90,.16)'); hg.addColorStop(1, 'rgba(255,150,70,0)');
  g.fillStyle = hg; g.fillRect(0, 500, W, 1000); g.restore();
  put(g, streetBG, mul(Cbg, Tm(0, 900)), { shadow: .35 });
  put(g, streetMid, mul(Cmg, Tm(0, 1050)), { shadow: .45 });
  put(g, ground, mul(C, Tm(0, 1600)), { shadow: 0 });
  shopGlow(g, C, 170, 1240, 240, 'rgba(255,188,105,1)', .7);
  if (!o.jadeDark) shopGlow(g, C, 930, 1240, 250, 'rgba(150,230,200,1)', .55);
  if (o.red) shopGlow(g, C, 540, 1240, 330, 'rgba(255,196,120,1)', .95);
  g.save(); g.setTransform(...C); g.globalCompositeOperation = 'lighter';
  const fp = g.createRadialGradient(540, 1450, 0, 540, 1450, 330);
  fp.addColorStop(0, o.red ? 'rgba(255,205,130,.42)' : 'rgba(255,180,100,.10)'); fp.addColorStop(1, 'rgba(255,160,70,0)');
  g.fillStyle = fp; g.beginPath(); g.ellipse(540, 1460, 340, 90, 0, 0, TAU); g.fill(); g.restore();
  put(g, shopLeft, mul(C, Tm(170, 1170)), { shadow: .8 });
  put(g, shopJade, mul(C, Tm(930, 1170)), { shadow: .9 });
  if (o.jadeDark) darkJade(g, C);
  if (o.red) put(g, shopRed, mul(C, Tm(540, 1150)), { shadow: 1.1 });
  else { put(g, blankShop, mul(C, Tm(540, 1190)), { shadow: 0 }); dottedFacade(g, C); }
  wires(g, C, t);
  if (o.jade) {
    g.save(); drawPerson(g, mul(C, mul(Tm(o.jade.x ?? 930, o.jade.y ?? 1470), S(o.jade.s ?? 1))), people.jade, o.jade.pose || {}, { alpha: o.jade.alpha ?? 1 }); g.restore();
  }
  if (o.owner) {
    g.save(); drawPerson(g, mul(C, mul(Tm(o.owner.x ?? 540, o.owner.y ?? 1470), S(o.owner.s ?? 1))), people.owner, o.owner.pose || {}, { sign: o.owner.sign !== false, signAlpha: o.owner.signAlpha ?? 1, alpha: o.owner.alpha ?? 1 }); g.restore();
  }
  if (o.queue) {
    for (const q of o.queue) {
      const bob = Math.sin(t * 2.1 + q.phase) * 2;
      g.save(); drawPerson(g, mul(C, mul(Tm(q.x, q.y ?? 1490), S(q.s ?? .88))), q.person || people.q1, { back: true, bob, headRot: Math.sin(t * 1.7 + q.phase) * .04, legF: .02, legB: -.02 }, { alpha: q.alpha ?? 1 }); g.restore();
    }
  }
  if (o.customer) {
    const c = o.customer;
    g.save(); g.globalAlpha = c.alpha ?? 1;
    drawPerson(g, mul(C, mul(Tm(c.x, c.y ?? 1460), S(c.s ?? .94))), people.customer, c.pose || {}, { phone: c.phone !== false, phoneAlpha: c.phoneAlpha ?? 1 });
    g.restore();
  }
  if (o.foreground !== false) {
    const fg = g.createLinearGradient(0, H - 380, 0, H);
    fg.addColorStop(0, 'rgba(8,6,18,0)'); fg.addColorStop(1, 'rgba(8,6,18,.72)');
    g.fillStyle = fg; g.fillRect(0, H - 380, W, 380);
  }
}

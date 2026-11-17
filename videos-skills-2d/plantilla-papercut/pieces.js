import { C, TAU, hash, canvas, piece, fill, cut, cutLine, trace, fillPaper, Pl, P, curve, ellipsePoly, paperShadow, noShadow, finishPaper, transmitOf, paperGrain, paperTile, rnd, put, mul, Tm, S, R, ap, sawRow, sawEdge, crescent, rosette, plum, dots, taper, swirl, textPiece, roundRectPath } from './core.js';

function starPath(q, cx, cy, r) {
  q.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .42 : r;
    const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
    i ? q.lineTo(x, y) : q.moveTo(x, y);
  }
  q.closePath();
}
function phoneGlyph(q, x, y, s, col) {
  q.save(); q.translate(x, y); q.scale(s, s); q.fillStyle = col;
  q.beginPath(); q.moveTo(-11, -16); q.quadraticCurveTo(-15, -16, -15, -10); q.quadraticCurveTo(-15, 12, 8, 14); q.quadraticCurveTo(14, 14, 14, 9); q.lineTo(12, 3); q.quadraticCurveTo(11, 0, 7, 1); q.lineTo(1, 3); q.quadraticCurveTo(-4, 0, -7, -5); q.lineTo(-5, -11); q.quadraticCurveTo(-4, -15, -8, -16); q.closePath(); q.fill();
  q.restore();
}

export const blankShop = piece([-180, -260, 180, 260], q => {
  fill(q, qq => trace(qq, Pl([[-180, -260], [180, -260], [180, 260], [-180, 260]], true, .7, 2)), C.cream);
  q.strokeStyle = 'rgba(27,42,65,.07)'; q.lineWidth = 2;
  q.beginPath(); q.moveTo(-180, -110); q.lineTo(180, -110); q.stroke();
  q.fillStyle = 'rgba(201,162,39,.18)'; q.fillRect(-180, 254, 360, 6);
}, { ss: 2, seed: 11, edge: 1.4 });

export const shopRed = piece([-200, -310, 200, 310], q => {
  fill(q, qq => trace(qq, Pl([[-200, -310], [200, -310], [200, 310], [-200, 310]], true, .7, 3)), C.red);
  q.strokeStyle = C.gold; q.lineWidth = 9; q.strokeRect(-188, -298, 376, 596);
  fill(q, qq => trace(qq, Pl([[-206, -306], [206, -306], [206, -268], [-206, -268]], true, .5, 4)), C.ink);
  fill(q, qq => trace(qq, Pl([[-206, -270], [206, -270], [206, -244], [-206, -244]], true, .5, 5)), C.gold);
  cut(q, qq => { qq.arc(-282, -222, 16, 0, TAU); qq.arc(282, -222, 16, 0, TAU); });
  cut(q, qq => { roundRectPath(qq, -154, -150, 116, 138, 12); roundRectPath(qq, 38, -150, 116, 138, 12); });
  cut(q, qq => { roundRectPath(qq, -58, 70, 116, 224, 10); });
  q.fillStyle = C.gold; q.fillRect(-96, -150, 8, 138); q.fillRect(-154, -92, 116, 8); q.fillRect(96, -150, 8, 138); q.fillRect(38, -92, 116, 8);
  q.fillStyle = C.cream; q.fillRect(-64, 70, 8, 224); q.fillRect(56, 70, 8, 224); q.fillRect(-58, 148, 116, 8);
  fill(q, qq => roundRectPath(qq, -164, -294, 328, 58, 8), C.ink);
  q.font = '400 32px "Archivo Black"'; q.fillStyle = C.gold2; q.textAlign = 'center'; q.textBaseline = 'middle'; q.fillText('ABIERTO', 0, -264);
  rosette(q, -154, 218, 28, 6, 0, .22); rosette(q, 154, 218, 28, 6, 0, .22);
  for (let i = 0; i < 9; i++) { q.fillStyle = C.gold; q.beginPath(); q.arc(-176 + i * 44, 292, 3 + (i % 2), 0, TAU); q.fill(); }
}, { ss: 2, seed: 21 });

export const shopJade = piece([-190, -285, 190, 285], q => {
  fill(q, qq => trace(qq, Pl([[-190, -285], [190, -285], [190, 285], [-190, 285]], true, .7, 7)), C.jade);
  q.strokeStyle = C.gold; q.lineWidth = 8; q.strokeRect(-178, -273, 356, 546);
  fill(q, qq => trace(qq, Pl([[-196, -281], [196, -281], [196, -246], [-196, -246]], true, .5, 8)), C.ink);
  fill(q, qq => trace(qq, Pl([[-196, -248], [196, -248], [196, -224], [-196, -224]], true, .5, 9)), C.gold);
  cut(q, qq => { roundRectPath(qq, -142, -158, 108, 126, 10); roundRectPath(qq, 34, -158, 108, 126, 10); });
  cut(q, qq => { roundRectPath(qq, -52, 76, 104, 204, 9); });
  q.fillStyle = C.gold; q.fillRect(-88, -158, 7, 126); q.fillRect(-142, -100, 108, 7); q.fillRect(88, -158, 7, 126); q.fillRect(34, -100, 108, 7);
  q.fillStyle = C.cream; q.fillRect(-58, 76, 7, 204); q.fillRect(51, 76, 7, 204); q.fillRect(-52, 152, 104, 7);
  fill(q, qq => roundRectPath(qq, -152, -270, 304, 52, 7), C.ink);
  q.font = '400 30px "Archivo Black"'; q.fillStyle = C.gold2; q.textAlign = 'center'; q.textBaseline = 'middle'; q.fillText('ABIERTO', 0, -243);
  q.strokeStyle = C.gold3; q.lineWidth = 4; q.beginPath(); q.arc(140, -196, 15, 0, TAU); q.stroke();
  q.beginPath(); q.moveTo(133, -196); q.lineTo(139, -190); q.lineTo(148, -202); q.stroke();
  rosette(q, -148, 202, 24, 6, 0, .22); rosette(q, 148, 202, 24, 6, 0, .22);
}, { ss: 2, seed: 27 });

export const shopLeft = piece([-185, -280, 185, 280], q => {
  fill(q, qq => trace(qq, Pl([[-185, -280], [185, -280], [185, 280], [-185, 280]], true, .7, 12)), '#6e2230');
  q.strokeStyle = C.gold; q.lineWidth = 7; q.strokeRect(-174, -269, 348, 538);
  fill(q, qq => trace(qq, Pl([[-191, -276], [191, -276], [191, -244], [-191, -244]], true, .5, 13)), C.plum);
  fill(q, qq => trace(qq, Pl([[-191, -246], [191, -246], [191, -222], [-191, -222]], true, .5, 14)), C.cream);
  cut(q, qq => { roundRectPath(qq, -132, -160, 100, 120, 9); roundRectPath(qq, 32, -160, 100, 120, 9); });
  cut(q, qq => { roundRectPath(qq, -48, 62, 96, 218, 9); });
  q.fillStyle = C.gold; q.fillRect(-82, -160, 7, 120); q.fillRect(-132, -104, 100, 7); q.fillRect(82, -160, 7, 120); q.fillRect(32, -104, 100, 7);
  q.fillStyle = C.cream; q.fillRect(-54, 62, 7, 218); q.fillRect(47, 62, 7, 218); q.fillRect(-48, 142, 96, 7);
  fill(q, qq => roundRectPath(qq, -144, -264, 288, 44, 6), C.ink);
  q.font = '400 26px "Archivo Black"'; q.fillStyle = C.cream; q.textAlign = 'center'; q.textBaseline = 'middle'; q.fillText('CAFÉ', 0, -241);
  rosette(q, -140, 198, 22, 6, 0, .22); rosette(q, 140, 198, 22, 6, 0, .22);
}, { ss: 2, seed: 31 });

export const streetBG = piece([-900, -560, 900, 560], q => {
  const cols = ['#2a1c34', '#241a30', '#33203b', '#2d1d31', '#21182c'];
  for (let i = 0; i < 9; i++) {
    const x = -900 + i * 210, w = 170 + (i % 3) * 22, h = 240 + Math.floor(hash(i * 3.7) * 250), top = 560 - h;
    fill(q, qq => qq.rect(x, top, w, h), cols[i % cols.length]);
    if (i % 2 === 0) fill(q, qq => { qq.moveTo(x, top); qq.lineTo(x + w / 2, top - 44); qq.lineTo(x + w, top); qq.closePath(); }, cols[(i + 2) % cols.length]);
    for (let k = 0; k < 5; k++) {
      const wx = x + 22 + (k % 3) * 48, wy = top + 46 + Math.floor(k / 3) * 74;
      if (wy + 40 < 548) {
        if ((k + i) % 4 === 0) { q.fillStyle = C.gold; q.globalAlpha = .65; q.fillRect(wx, wy, 22, 30); q.globalAlpha = 1; }
        else cut(q, qq => qq.rect(wx, wy, 22, 30));
      }
    }
    q.strokeStyle = 'rgba(201,162,39,.25)'; q.lineWidth = 2;
    q.beginPath(); q.moveTo(x + 20, top + 18); q.lineTo(x + w - 20, top + 18); q.stroke();
  }
  q.strokeStyle = 'rgba(242,232,213,.18)'; q.lineWidth = 1.5;
  for (let i = 0; i < 5; i++) { q.beginPath(); q.moveTo(-900, 120 + i * 55); q.quadraticCurveTo(0, 200 + i * 50, 900, 90 + i * 60); q.stroke(); }
}, { ss: 1.4, seed: 41, edge: .8 });

export const streetMid = piece([-900, -420, 900, 420], q => {
  const cols = ['#5b1d2b', '#481a2b', '#6a222c', '#3e1a28', '#74252e'];
  for (let i = 0; i < 7; i++) {
    const x = -900 + i * 272, w = 240, h = 290 + Math.floor(hash(i * 5.1) * 100), top = 420 - h;
    fill(q, qq => qq.rect(x, top, w, h), cols[i % cols.length]);
    fill(q, qq => trace(qq, Pl([[x - 8, top + 26], [x + w + 8, top + 26], [x + w + 8, top + 62], [x - 8, top + 62]], true, .5, i + 4)), i % 2 ? C.cream : C.gold);
    cut(q, qq => { roundRectPath(qq, x + 34, top + 92, 70, 92, 7); roundRectPath(qq, x + 136, top + 92, 70, 92, 7); });
    q.fillStyle = C.gold; q.fillRect(x + 68, top + 92, 5, 92); q.fillRect(x + 34, top + 136, 70, 5); q.fillRect(x + 170, top + 92, 5, 92); q.fillRect(x + 136, top + 136, 70, 5);
    cut(q, qq => { roundRectPath(qq, x + 90, top + 242, 60, 140, 6); });
    q.fillStyle = 'rgba(201,162,39,.65)'; q.beginPath(); q.arc(x + 120, top + 22, 5, 0, TAU); q.fill();
    rosette(q, x + 22, top + 58, 18, 6, 0, .22);
  }
}, { ss: 1.2, seed: 47, edge: .8 });

export const ground = piece([-900, -200, 900, 200], q => {
  fill(q, qq => trace(qq, Pl([[-900, -200], [900, -200], [900, 200], [-900, 200]], true, .8, 6)), '#241a2c');
  q.fillStyle = C.gold; q.globalAlpha = .7; q.fillRect(-900, -200, 1800, 5); q.globalAlpha = 1;
  cutLine(q, 2.2, qq => { for (let y = -140; y < 190; y += 44) { qq.moveTo(-900, y); qq.lineTo(900, y + (y % 88 ? 4 : -4)); } });
  cutLine(q, 1.8, qq => { for (let x = -880; x < 900; x += 90) { const o = (Math.floor(x / 90) % 2) * 22; qq.moveTo(x, -140 + o); qq.lineTo(x - 24, -40 + o); qq.lineTo(x, 60 + o); qq.lineTo(x - 24, 160 + o); } });
  for (let k = 0; k < 32; k++) { q.fillStyle = k % 3 ? 'rgba(242,232,213,.10)' : 'rgba(201,162,39,.25)'; q.beginPath(); q.arc(-880 + hash(k * 1.7) * 1760, -180 + hash(k * 2.9) * 370, 1 + hash(k * 4.1) * 3, 0, TAU); q.fill(); }
}, { ss: 1.5, seed: 51, edge: .9 });

export const moon = piece([-110, -110, 110, 110], q => {
  fill(q, qq => qq.arc(0, 0, 92, 0, TAU), C.gold3);
  cut(q, qq => { qq.arc(-24, -18, 18, 0, TAU); qq.arc(28, 24, 12, 0, TAU); qq.arc(34, -34, 8, 0, TAU); });
  q.strokeStyle = 'rgba(255,255,255,.55)'; q.lineWidth = 3; q.beginPath(); q.arc(0, 0, 82, .2, 1.2); q.stroke();
}, { ss: 2, seed: 57, edge: 1 });

export const browser = piece([-420, -480, 420, 480], q => {
  fill(q, qq => roundRectPath(qq, -420, -480, 840, 960, 22), C.cream);
  fill(q, qq => { qq.moveTo(-420, -458); qq.arcTo(-420, -480, -398, -480, 22); qq.lineTo(398, -480); qq.arcTo(420, -480, 420, -458, 22); qq.lineTo(420, -420); qq.lineTo(-420, -420); qq.closePath(); }, C.red);
  cut(q, qq => { qq.moveTo(-386 + 6, -450); qq.arc(-386, -450, 6, 0, TAU); qq.moveTo(-362 + 6, -450); qq.arc(-362, -450, 6, 0, TAU); qq.moveTo(-338 + 6, -450); qq.arc(-338, -450, 6, 0, TAU); });
  fill(q, qq => roundRectPath(qq, -270, -466, 540, 34, 17), C.cream);
  q.font = '600 18px "Plus Jakarta Sans"'; q.fillStyle = C.ink; q.textAlign = 'center'; q.textBaseline = 'middle'; q.fillText('tu-negocio.com', 0, -449);
  q.font = '400 24px "Archivo Black"'; q.fillStyle = C.red; q.textAlign = 'left'; q.fillText('ARLIA', -382, -391);
  q.font = '600 14px "Plus Jakarta Sans"'; q.fillStyle = C.ink; q.fillText('INICIO', 74, -391); q.fillText('SERVICIOS', 160, -391); q.fillText('CONTACTO', 274, -391);
  q.fillStyle = C.gold; q.beginPath(); q.arc(58, -395, 3, 0, TAU); q.fill(); q.beginPath(); q.arc(146, -395, 3, 0, TAU); q.fill(); q.beginPath(); q.arc(258, -395, 3, 0, TAU); q.fill();
  fill(q, qq => roundRectPath(qq, -380, -356, 760, 318, 18), C.red);
  q.strokeStyle = C.gold; q.lineWidth = 4; q.beginPath(); roundRectPath(q, -374, -350, 748, 306, 15); q.stroke();
  q.font = '400 56px "Archivo Black"'; q.fillStyle = C.cream; q.textAlign = 'left'; q.textBaseline = 'alphabetic'; q.fillText('TU NEGOCIO', -344, -286);
  q.font = '400 35px "Archivo Black"'; q.fillStyle = C.gold2; q.fillText('EN PRIMERA LÍNEA', -344, -238);
  q.font = '600 18px "Plus Jakarta Sans"'; q.fillStyle = C.cream; q.fillText('Diseño premium. Listo en días.', -344, -196);
  fill(q, qq => roundRectPath(qq, -344, -164, 268, 54, 27), C.cream);
  q.font = '800 16px "Plus Jakarta Sans"'; q.fillStyle = C.red; q.textAlign = 'center'; q.textBaseline = 'middle'; q.fillText('PEDIR PRESUPUESTO', -210, -137);
  fill(q, qq => trace(qq, Pl([[104, -168], [306, -168], [306, -86], [104, -86]], true, .5, 3)), C.cream);
  fill(q, qq => trace(qq, Pl([[104, -168], [306, -168], [306, -142], [104, -142]], true, .5, 4)), C.gold);
  cut(q, qq => { roundRectPath(qq, 126, -118, 70, 46, 5); roundRectPath(qq, 212, -118, 70, 46, 5); });
  fill(q, qq => roundRectPath(qq, 252, -190, 26, 24, 4), C.gold); q.fillStyle = C.ink; q.fillRect(258, -184, 14, 12);
  q.strokeStyle = C.gold; q.lineWidth = 4; q.beginPath(); q.moveTo(150, -168); q.lineTo(150, -142); q.stroke();
  q.fillStyle = C.gold; q.beginPath(); q.arc(160, -190, 7, 0, TAU); q.fill();
  for (let i = 0; i < 3; i++) {
    const x = -380 + i * 254;
    fill(q, qq => roundRectPath(qq, x, -12, 236, 50, 12), i === 1 ? C.gold : C.ink);
    q.font = '800 15px "Plus Jakarta Sans"'; q.fillStyle = i === 1 ? C.ink : C.cream; q.textAlign = 'center'; q.textBaseline = 'middle'; q.fillText(['ABIERTO 24/7', 'SEO LOCAL', 'SOPORTE REAL'][i], x + 118, 13);
  }
  fill(q, qq => roundRectPath(qq, -380, 58, 760, 158, 16), '#e8dcc4');
  for (let i = 0; i < 5; i++) { q.fillStyle = C.gold; starPath(q, -330 + i * 30, 94, 11); q.fill(); }
  q.font = '400 30px "Archivo Black"'; q.fillStyle = C.ink; q.textAlign = 'left'; q.fillText('4.9', -168, 105);
  q.font = '600 14px "Plus Jakarta Sans"'; q.fillStyle = C.ink3; q.fillText('Clientes que vuelven', -108, 101);
  q.fillStyle = 'rgba(27,42,65,.25)'; q.fillRect(-330, 126, 620, 5); q.fillRect(-330, 148, 540, 5); q.fillRect(-330, 170, 460, 5);
  q.fillStyle = C.jade; q.beginPath(); q.arc(-330, 190, 12, 0, TAU); q.fill(); q.fillStyle = C.cream; q.beginPath(); q.arc(-330, 190, 5, 0, TAU); q.fill();
  fill(q, qq => roundRectPath(qq, -380, 244, 760, 150, 16), C.ink);
  q.font = '400 30px "Archivo Black"'; q.fillStyle = C.gold2; q.textAlign = 'left'; q.fillText('PEDÍ TU WEB HOY', -344, 288);
  q.font = '600 16px "Plus Jakarta Sans"'; q.fillStyle = C.cream; q.fillText('Respondemos en el día. 10% OFF primeros 10.', -344, 320);
  q.font = '600 15px "Plus Jakarta Sans"'; q.fillStyle = C.cream; q.fillText('Diseño · SEO · Soporte', -344, 352);
  fill(q, qq => qq.arc(330, 404, 54, 0, TAU), C.jade3);
  q.strokeStyle = C.gold; q.lineWidth = 5; q.beginPath(); q.arc(330, 404, 54, 0, TAU); q.stroke();
  phoneGlyph(q, 330, 404, 1.35, C.cream);
  fill(q, qq => roundRectPath(qq, -420, 432, 840, 48, 0), C.red);
  q.font = '400 22px "Archivo Black"'; q.fillStyle = C.cream; q.textAlign = 'center'; q.textBaseline = 'middle'; q.fillText('ABIERTO 24/7  ·  TU NEGOCIO, VISIBLE', 0, 456);
  rosette(q, -394, -330, 24, 6, 0, .22); rosette(q, 394, 432, 24, 6, 0, .22);
}, { ss: 2, seed: 63 });

function buildSite(kind) {
  const def = {
    mueble: { bar: C.red, hero: C.cream, title: 'MUEBLES', accent: C.red, sub: 'A MEDIDA', line: 'Diseño que se siente.', cta: 'VER CATÁLOGO', url: 'muebles.com', foot: 'MADERA · DISEÑO · CONFIANZA' },
    gastro: { bar: C.red2, hero: C.red, title: 'PEDÍ', accent: C.gold2, sub: 'ONLINE', line: 'Directo a tu WhatsApp.', cta: 'VER MENÚ', url: 'resto.com', foot: 'PEDIDOS · DELIVERY · RESERVAS' },
    clinica: { bar: C.jade, hero: C.jade, title: 'TURNOS', accent: C.gold2, sub: 'ONLINE', line: 'Sin esperas. Sin llamados.', cta: 'RESERVAR', url: 'clinica.com', foot: 'TURNOS · HISTORIAS · CONFIANZA' }
  }[kind];
  return piece([-360, -450, 360, 450], q => {
    fill(q, qq => roundRectPath(qq, -360, -450, 720, 900, 18), C.cream);
    fill(q, qq => { qq.moveTo(-360, -430); qq.arcTo(-360, -450, -340, -450, 18); qq.lineTo(340, -450); qq.arcTo(360, -450, 360, -430, 18); qq.lineTo(360, -398); qq.lineTo(-360, -398); qq.closePath(); }, def.bar);
    cut(q, qq => { qq.moveTo(-328 + 5, -424); qq.arc(-328, -424, 5, 0, TAU); qq.moveTo(-308 + 5, -424); qq.arc(-308, -424, 5, 0, TAU); qq.moveTo(-288 + 5, -424); qq.arc(-288, -424, 5, 0, TAU); });
    fill(q, qq => roundRectPath(qq, -230, -438, 460, 28, 14), C.cream);
    q.font = '600 14px "Plus Jakarta Sans"'; q.fillStyle = C.ink; q.textAlign = 'center'; q.textBaseline = 'middle'; q.fillText(def.url, 0, -424);
    fill(q, qq => roundRectPath(qq, -330, -380, 660, 350, 16), def.hero);
    q.font = '400 54px "Archivo Black"'; q.fillStyle = kind === 'mueble' ? C.ink : C.cream; q.textAlign = 'left'; q.textBaseline = 'alphabetic'; q.fillText(def.title, -294, -296);
    q.font = '400 42px "Archivo Black"'; q.fillStyle = def.accent; q.fillText(def.sub, -294, -246);
    q.font = '600 17px "Plus Jakarta Sans"'; q.fillStyle = kind === 'mueble' ? C.ink3 : C.cream; q.fillText(def.line, -294, -206);
    fill(q, qq => roundRectPath(qq, -294, -178, 208, 46, 23), kind === 'mueble' ? C.red : C.cream);
    q.font = '800 14px "Plus Jakarta Sans"'; q.fillStyle = kind === 'mueble' ? C.cream : C.red; q.textAlign = 'center'; q.textBaseline = 'middle'; q.fillText(def.cta, -190, -155);
    if (kind === 'mueble') {
      fill(q, qq => roundRectPath(qq, 64, -320, 222, 90, 28), C.red);
      fill(q, qq => roundRectPath(qq, 82, -344, 70, 44, 14), C.gold);
      fill(q, qq => roundRectPath(qq, 172, -344, 70, 44, 14), C.gold);
      q.fillStyle = C.ink; q.fillRect(86, -228, 14, 24); q.fillRect(250, -228, 14, 24);
      q.strokeStyle = C.ink; q.lineWidth = 5; q.beginPath(); q.moveTo(76, -274); q.lineTo(274, -274); q.stroke();
      fill(q, qq => roundRectPath(qq, 268, -364, 44, 50, 6), C.gold); q.fillStyle = C.ink; q.fillRect(280, -356, 20, 28);
      fill(q, qq => qq.arc(310, -392, 12, 0, TAU), C.gold2);
      q.strokeStyle = C.ink; q.lineWidth = 3; q.beginPath(); q.moveTo(266, -330); q.lineTo(266, -300); q.stroke();
      starPath(q, 190, -372, 12); q.fillStyle = C.gold2; q.fill();
    } else if (kind === 'gastro') {
      fill(q, qq => qq.arc(178, -278, 82, 0, TAU), C.cream);
      q.strokeStyle = C.gold; q.lineWidth = 7; q.beginPath(); q.arc(178, -278, 82, 0, TAU); q.stroke();
      fill(q, qq => qq.arc(178, -278, 58, 0, TAU), C.gold3);
      fill(q, qq => { qq.moveTo(132, -300); qq.lineTo(224, -300); qq.lineTo(178, -198); qq.closePath(); }, C.red);
      q.fillStyle = C.gold2; q.beginPath(); q.arc(160, -278, 8, 0, TAU); q.fill(); q.beginPath(); q.arc(196, -266, 7, 0, TAU); q.fill(); q.beginPath(); q.arc(178, -240, 6, 0, TAU); q.fill();
      q.strokeStyle = C.cream; q.lineWidth = 4; q.beginPath(); q.moveTo(272, -340); q.quadraticCurveTo(292, -320, 272, -296); q.stroke();
      q.beginPath(); q.moveTo(300, -348); q.quadraticCurveTo(320, -328, 300, -304); q.stroke();
      starPath(q, 300, -220, 12); q.fillStyle = C.gold2; q.fill();
    } else {
      fill(q, qq => roundRectPath(qq, 100, -382, 170, 170, 22), C.cream);
      fill(q, qq => { qq.rect(166, -350, 38, 108); qq.rect(132, -316, 108, 38); }, C.jade);
      q.strokeStyle = C.gold; q.lineWidth = 5; q.beginPath(); q.arc(185, -298, 94, 0, TAU); q.stroke();
      fill(q, qq => roundRectPath(qq, 260, -240, 44, 70, 8), C.gold); q.fillStyle = C.ink; q.fillRect(272, -228, 20, 34);
      q.strokeStyle = C.cream; q.lineWidth = 4; q.beginPath(); q.moveTo(86, -350); q.lineTo(86, -290); q.stroke();
      starPath(q, 302, -362, 11); q.fillStyle = C.gold2; q.fill();
    }
    fill(q, qq => roundRectPath(qq, -330, -6, 660, 116, 14), '#e8dcc4');
    q.font = '800 19px "Plus Jakarta Sans"'; q.fillStyle = C.ink; q.textAlign = 'left'; q.textBaseline = 'alphabetic';
    q.fillText(kind === 'mueble' ? 'Diseño a medida' : kind === 'gastro' ? 'Pedidos sin comisión' : 'Turnos automáticos', -300, 32);
    q.font = '600 15px "Plus Jakarta Sans"'; q.fillStyle = C.ink3;
    q.fillText(kind === 'mueble' ? 'Medí, elegí y recibí.' : kind === 'gastro' ? 'Tu menú, tus reglas.' : 'Reservá en 30 segundos.', -300, 58);
    for (let i = 0; i < 5; i++) { q.fillStyle = C.gold; starPath(q, 188 + i * 28, 40, 9); q.fill(); }
    q.font = '800 13px "Plus Jakarta Sans"'; q.fillStyle = C.ink3; q.textAlign = 'left'; q.fillText('4.9', 188, 70);
    fill(q, qq => roundRectPath(qq, -330, 134, 660, 98, 14), C.ink);
    q.font = '400 25px "Archivo Black"'; q.fillStyle = C.cream; q.textAlign = 'left'; q.textBaseline = 'middle'; q.fillText(kind === 'mueble' ? 'TU CASA, TU ESTILO.' : kind === 'gastro' ? 'TU MESA, TU PEDIDO.' : 'TU SALUD, TU TIEMPO.', -300, 172);
    q.font = '600 14px "Plus Jakarta Sans"'; q.fillStyle = C.gold2; q.fillText(def.foot, -300, 204);
    fill(q, qq => roundRectPath(qq, -330, 258, 660, 96, 14), C.red);
    q.font = '400 30px "Archivo Black"'; q.fillStyle = C.cream; q.textAlign = 'center'; q.textBaseline = 'middle'; q.fillText(def.cta, 0, 292);
    q.font = '600 14px "Plus Jakarta Sans"'; q.fillStyle = C.cream; q.fillText('Respondemos hoy', 0, 324);
    fill(q, qq => roundRectPath(qq, -330, 382, 660, 42, 10), def.bar);
    q.font = '600 13px "Plus Jakarta Sans"'; q.fillStyle = C.cream; q.textAlign = 'center'; q.textBaseline = 'middle'; q.fillText('DISEÑO PREMIUM · SEO · SOPORTE', 0, 403);
    rosette(q, -338, -340, 18, 6, 0, .22); rosette(q, 338, 420, 18, 6, 0, .22);
    cut(q, qq => { for (let x = -330; x < 330; x += 22) { qq.moveTo(x, 440); qq.lineTo(x + 11, 428); qq.lineTo(x + 22, 440); } });
  }, { ss: 2, seed: kind === 'mueble' ? 71 : kind === 'gastro' ? 73 : 79 });
}
export const siteMueble = buildSite('mueble');
export const siteGastro = buildSite('gastro');
export const siteClinica = buildSite('clinica');

export const flag = piece([-410, -160, 410, 160], q => {
  const poly = [[-410, -126], [410, -126], [352, 0], [410, 126], [-410, 126], [-352, 0]];
  fill(q, qq => trace(qq, Pl(poly, true, .6, 5)), C.red);
  q.strokeStyle = C.gold; q.lineWidth = 5; q.beginPath(); trace(q, Pl(poly, true, .6, 5)); q.stroke();
  q.font = '400 78px "Archivo Black"'; q.fillStyle = C.gold2; q.textAlign = 'center'; q.textBaseline = 'middle'; q.fillText('10% OFF', 0, -30);
  q.font = '800 26px "Plus Jakarta Sans"'; q.fillStyle = C.cream; q.fillText('PRIMEROS 10 CUPOS', 0, 58);
  q.font = '600 16px "Plus Jakarta Sans"'; q.fillStyle = C.gold3; q.fillText('SOLO POR DM · PRESUPUESTO', 0, 94);
  for (const x of [-352, 352]) { q.fillStyle = C.gold; q.beginPath(); q.arc(x, 0, 10, 0, TAU); q.fill(); q.fillStyle = C.cream; q.beginPath(); q.arc(x, 0, 4, 0, TAU); q.fill(); }
  for (let k = 0; k < 16; k++) { q.fillStyle = `rgba(230,191,95,${.2 + hash(k) * .35})`; q.beginPath(); q.arc(-380 + hash(k * 1.3) * 760, -110 + hash(k * 2.7) * 220, 1 + hash(k * 3.1) * 2, 0, TAU); q.fill(); }
  rosette(q, -300, -100, 18, 6, 0, .22); rosette(q, 300, 100, 18, 6, 0, .22);
}, { ss: 2, seed: 83 });

export const signBoard = piece([-410, -210, 410, 210], q => {
  fill(q, qq => roundRectPath(qq, -410, -210, 820, 420, 18), C.red2);
  q.strokeStyle = C.gold; q.lineWidth = 10; q.beginPath(); roundRectPath(q, -396, -196, 792, 392, 14); q.stroke();
  q.strokeStyle = C.gold3; q.lineWidth = 3; q.beginPath(); roundRectPath(q, -378, -178, 756, 356, 12); q.stroke();
  cut(q, qq => { qq.moveTo(-394 + 14, -194); qq.arc(-394, -194, 14, 0, TAU); qq.moveTo(394 + 14, -194); qq.arc(394, -194, 14, 0, TAU); qq.moveTo(-394 + 14, 194); qq.arc(-394, 194, 14, 0, TAU); qq.moveTo(394 + 14, 194); qq.arc(394, 194, 14, 0, TAU); });
  rosette(q, -360, 0, 24, 6, 0, .22); rosette(q, 360, 0, 24, 6, 0, .22);
  for (let i = 0; i < 3; i++) { q.fillStyle = 'rgba(230,191,95,.35)'; q.fillRect(-240 + i * 240, 186, 120, 3); }
}, { ss: 2, seed: 89 });

export const phoneFrame = piece([-310, -580, 310, 580], q => {
  fill(q, qq => roundRectPath(qq, -310, -580, 620, 1160, 52), C.ink);
  cut(q, qq => roundRectPath(qq, -270, -500, 540, 1000, 30));
  cut(q, qq => roundRectPath(qq, -92, -552, 184, 20, 10));
  cut(q, qq => roundRectPath(qq, -38, -516, 76, 6, 3));
  cut(q, qq => { roundRectPath(qq, -302, -420, 10, 70, 5); roundRectPath(qq, 292, -300, 10, 120, 5); });
  q.strokeStyle = C.gold; q.lineWidth = 3; q.beginPath(); roundRectPath(q, -276, -506, 552, 1012, 33); q.stroke();
  q.fillStyle = C.gold; q.beginPath(); q.arc(0, 545, 22, 0, TAU); q.fill();
  q.fillStyle = C.ink2; q.beginPath(); q.arc(0, 545, 14, 0, TAU); q.fill();
}, { ss: 1.8, seed: 91, edge: 1.2 });

export const phoneSmall = piece([-22, -38, 22, 38], q => {
  fill(q, qq => roundRectPath(qq, -22, -38, 44, 76, 8), C.ink);
  fill(q, qq => roundRectPath(qq, -17, -32, 34, 58, 4), C.cream);
  q.fillStyle = C.red; q.fillRect(-12, -26, 24, 18);
  q.fillStyle = C.ink3; q.fillRect(-12, -2, 24, 3); q.fillRect(-12, 5, 18, 3);
  fill(q, qq => roundRectPath(qq, -12, 34, 24, 3, 1.5), C.gold);
}, { ss: 2, seed: 93 });

export const signSmall = piece([-84, -62, 84, 62], q => {
  fill(q, qq => roundRectPath(qq, -84, -62, 168, 112, 7), C.cream);
  q.strokeStyle = C.gold; q.lineWidth = 5; q.beginPath(); roundRectPath(q, -79, -57, 158, 102, 5); q.stroke();
  q.font = '400 25px "Archivo Black"'; q.fillStyle = C.red; q.textAlign = 'center'; q.textBaseline = 'middle';
  q.fillText('SIN WEB', 0, -10);
  q.font = '700 11px "Plus Jakarta Sans"'; q.fillStyle = C.ink3;
  q.fillText('TU NEGOCIO', 0, 18);
  q.fillStyle = C.gold; q.fillRect(-26, 34, 52, 3);
  fill(q, qq => qq.rect(-10, 50, 20, 12), C.ink);
}, { ss: 2, seed: 97 });

function headBackPiece(skin, hair) {
  return piece([-70, -120, 70, 0], q => {
    fill(q, qq => qq.arc(0, -58, 50, 0, TAU), hair);
    fill(q, qq => qq.rect(-13, -10, 26, 18), skin);
    q.fillStyle = 'rgba(255,255,255,.12)'; q.beginPath(); q.arc(-14, -78, 18, 0, TAU); q.fill();
  }, { ss: 2, seed: 101 });
}

function headPiece(skin, hair, expr, opt = {}) {
  return piece([-80, -132, 80, 18], q => {
    fill(q, qq => qq.rect(-14, -10, 28, 28), skin);
    fill(q, qq => qq.arc(0, -58, 46, 0, TAU), skin);
    fill(q, qq => qq.arc(-45, -58, 10, 0, TAU), skin);
    fill(q, qq => qq.arc(45, -58, 10, 0, TAU), skin);
    if (opt.cap) {
      fill(q, qq => trace(qq, P([[-50, -76], [-42, -114], [-4, -128], [38, -120], [52, -94], [52, -74], [26, -88], [-4, -96], [-32, -88]], true)), opt.cap);
      fill(q, qq => trace(qq, P([[-52, -78], [52, -78], [56, -68], [-56, -68]], true)), opt.cap);
      q.fillStyle = C.gold; q.fillRect(-22, -96, 44, 5);
    } else {
      fill(q, qq => trace(qq, P([[-48, -68], [-46, -104], [-18, -122], [18, -122], [42, -108], [50, -82], [49, -64], [30, -82], [0, -92], [-30, -82]], true)), hair);
      if (opt.bald) { q.fillStyle = skin; q.beginPath(); q.arc(8, -92, 30, 0, TAU); q.fill(); }
    }
    if (opt.chain) { q.strokeStyle = C.gold; q.lineWidth = 3; q.beginPath(); q.arc(0, -8, 18, .15, Math.PI - .15); q.stroke(); }
    q.fillStyle = hair; q.beginPath(); q.arc(-16, -64, 7, 0, TAU); q.arc(16, -64, 7, 0, TAU); q.fill();
    cut(q, qq => { qq.moveTo(-16 + 5, -60); qq.arc(-16, -60, 5, 0, TAU); qq.moveTo(16 + 5, -60); qq.arc(16, -60, 5, 0, TAU); });
    if (expr === 'happy') crescent(q, 0, -40, 15, .12 * Math.PI, .88 * Math.PI, 4);
    else if (expr === 'sad') crescent(q, 0, -30, 14, 1.12 * Math.PI, 1.88 * Math.PI, 4);
    else if (expr === 'smug') cutLine(q, 3, qq => { qq.moveTo(-12, -38); qq.quadraticCurveTo(0, -32, 14, -42); });
    else if (expr === 'closed') cutLine(q, 3, qq => { qq.moveTo(-21, -60); qq.lineTo(-11, -60); qq.moveTo(11, -60); qq.lineTo(21, -60); });
    else cutLine(q, 3, qq => { qq.moveTo(-10, -38); qq.lineTo(10, -38); });
    q.strokeStyle = hair; q.lineWidth = 3; q.lineCap = 'round';
    if (expr === 'sad') { q.beginPath(); q.moveTo(-25, -78); q.lineTo(-8, -72); q.moveTo(25, -78); q.lineTo(8, -72); q.stroke(); }
    else if (expr === 'smug') { q.beginPath(); q.moveTo(-26, -76); q.lineTo(-8, -80); q.moveTo(26, -80); q.lineTo(8, -78); q.stroke(); }
    else { q.beginPath(); q.moveTo(-25, -78); q.quadraticCurveTo(-16, -84, -7, -78); q.moveTo(7, -78); q.quadraticCurveTo(16, -84, 25, -78); q.stroke(); }
    if (opt.mustache) fill(q, qq => trace(qq, P([[-25, -44], [-9, -50], [0, -44], [9, -50], [25, -44], [12, -35], [0, -39], [-12, -35]], true)), hair);
    if (opt.glasses) { q.strokeStyle = C.ink; q.lineWidth = 3; q.beginPath(); q.arc(-16, -60, 13, 0, TAU); q.arc(16, -60, 13, 0, TAU); q.moveTo(-3, -60); q.lineTo(3, -60); q.stroke(); }
  }, { ss: 2, seed: 103 + (expr === 'happy' ? 1 : expr === 'sad' ? 2 : expr === 'smug' ? 3 : 0) });
}

function torsoPiece(col, opt = {}) {
  return piece([-84, -162, 84, 14], q => {
    fill(q, qq => trace(qq, P([[-44, -152], [44, -152], [58, -6], [42, 8], [-42, 8], [-58, -6]], true)), col);
    if (opt.scarf) {
      fill(q, qq => trace(qq, P([[-28, -148], [28, -148], [24, -132], [-24, -132]], true)), opt.scarf);
      fill(q, qq => trace(qq, P([[10, -140], [30, -126], [20, -34], [4, -38]], true)), opt.scarf);
    }
    if (opt.apron) {
      fill(q, qq => trace(qq, P([[-34, -108], [34, -108], [46, 4], [-46, 4]], true)), opt.apron);
      cutLine(q, 3, qq => { qq.moveTo(0, -108); qq.lineTo(0, 0); });
      fill(q, qq => roundRectPath(qq, -22, -58, 44, 26, 4), C.cream); q.fillStyle = C.ink; q.fillRect(-14, -50, 28, 3); q.fillRect(-14, -42, 18, 3);
    }
    if (opt.chain) { q.strokeStyle = C.gold; q.lineWidth = 3; q.beginPath(); q.arc(0, -128, 24, .15, Math.PI - .15); q.stroke(); q.fillStyle = C.gold; q.beginPath(); q.arc(0, -102, 5, 0, TAU); q.fill(); }
    cutLine(q, 3, qq => { qq.moveTo(-20, -146); qq.lineTo(0, -120); qq.lineTo(20, -146); });
    cut(q, qq => { qq.moveTo(0 + 4, -78); qq.arc(0, -78, 4, 0, TAU); qq.moveTo(0 + 4, -46); qq.arc(0, -46, 4, 0, TAU); qq.moveTo(0 + 4, -14); qq.arc(0, -14, 4, 0, TAU); });
    q.strokeStyle = 'rgba(27,42,65,.22)'; q.lineWidth = 2; q.beginPath(); q.moveTo(-48, -22); q.lineTo(-38, -22); q.moveTo(38, -22); q.lineTo(48, -22); q.stroke();
  }, { ss: 2, seed: 107 });
}

function armPiece(col, skin) {
  return piece([-25, -14, 25, 124], q => {
    fill(q, qq => roundRectPath(qq, -13, -8, 26, 116, 12), col);
    fill(q, qq => qq.arc(0, 110, 14, 0, TAU), skin);
    q.fillStyle = 'rgba(27,42,65,.18)'; q.fillRect(-13, 82, 26, 5);
    cutLine(q, 2, qq => { qq.moveTo(-6, 30); qq.quadraticCurveTo(0, 40, 6, 30); });
  }, { ss: 2, seed: 109 });
}

function legPiece(col, shoe) {
  return piece([-28, -10, 28, 132], q => {
    fill(q, qq => roundRectPath(qq, -15, -6, 30, 116, 12), col);
    fill(q, qq => roundRectPath(qq, -19, 106, 38, 20, 7), shoe);
    q.fillStyle = 'rgba(242,232,213,.35)'; q.fillRect(-15, 108, 30, 2);
    cutLine(q, 2, qq => { qq.moveTo(-7, 54); qq.quadraticCurveTo(0, 60, 7, 54); });
  }, { ss: 2, seed: 113 });
}

function makePerson(opt) {
  const heads = {};
  for (const e of ['neutral', 'happy', 'sad', 'smug', 'closed']) heads[e] = headPiece(opt.skin, opt.hair, e, opt);
  return {
    heads,
    headBack: headBackPiece(opt.skin, opt.hair),
    backHead: headBackPiece(opt.skin, opt.hair),
    torso: torsoPiece(opt.torso, opt),
    arm: armPiece(opt.arm || opt.torso, opt.skin),
    leg: legPiece(opt.pants, opt.shoes)
  };
}

export const people = {
  customer: makePerson({ skin: C.skin, hair: C.ink, torso: '#2c3a55', arm: '#2c3a55', pants: C.ink2, shoes: '#0a0f18', cap: C.ink, scarf: C.gold }),
  owner: makePerson({ skin: C.skin2, hair: '#3a2a1e', torso: C.cream, arm: C.cream, pants: C.ink, shoes: '#0a0f18', apron: C.red, mustache: true }),
  jade: makePerson({ skin: C.skin2, hair: C.ink, torso: C.jade, arm: C.jade, pants: C.jade2, shoes: '#0a0f18', chain: true, glasses: true }),
  q1: makePerson({ skin: C.skin, hair: '#2a1c14', torso: C.red2, arm: C.red2, pants: C.ink2, shoes: '#0a0f18', scarf: C.gold }),
  q2: makePerson({ skin: C.skin2, hair: C.ink, torso: C.gold, arm: C.gold, pants: C.plum, shoes: '#0a0f18', cap: C.ink2 }),
  q3: makePerson({ skin: C.skin, hair: '#4a2a1e', torso: C.jade, arm: C.jade, pants: C.ink, shoes: '#0a0f18', scarf: C.cream })
};

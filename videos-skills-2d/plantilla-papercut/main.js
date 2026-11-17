import { DUR } from './core.js';
import { drawScene } from './scenes.js';

const cv = document.getElementById('cv');
const g = cv.getContext('2d');

window.DUR = DUR;
window.render = t => { drawScene(g, t); };
window.render(0);
window.READY = true;

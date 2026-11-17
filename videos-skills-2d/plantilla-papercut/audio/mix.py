"""Master audio mix - Agencia Arlia "Hoja en blanco" (30 s).

Papercut score at 100 BPM + paper foley + Argentine VO + ducking + peak-safe bus.
Output: audio/mix.wav. Final loudness is handled by mux.sh (two-pass loudnorm).
"""
import os
import sys
import numpy as np
import soundfile as sf
from scipy.ndimage import uniform_filter1d

LIB = os.path.expanduser('~/lemo-opuscar')
sys.path.insert(0, LIB)

from core.audio.sfx import (
    SR, bp, lp, hp, noise, norm, t_, env_exp, whoosh, ding, pop, thump, click, add, limit
)

DUR = 30.0
N = int(DUR * SR)


def st():
    return np.zeros((N, 2), np.float32)


def pizz(f, d=.36):
    tt = t_(d)
    x = (np.sin(2 * np.pi * f * tt) + .38 * np.sin(4 * np.pi * f * tt)
         + .14 * np.sin(6 * np.pi * f * tt)) * env_exp(d, .075)
    x *= 1 + .08 * np.sin(2 * np.pi * 7 * tt)
    return lp(norm(x), 4200)


def pad(freqs, d):
    tt = t_(d)
    x = np.zeros_like(tt)
    for f in freqs:
        x += np.sin(2 * np.pi * f * tt) + .45 * np.sin(2 * np.pi * f * 1.003 * tt)
    a = np.clip(tt / .22, 0, 1) * np.clip((d - tt) / .45, 0, 1)
    return lp(x * a, 1800)


def gong(f=110, d=1.8):
    tt = t_(d)
    x = np.zeros_like(tt)
    for ratio, amp, tau in [(1, 1, .9), (2.02, .45, .55), (2.98, .28, .35), (4.1, .15, .22)]:
        x += amp * np.sin(2 * np.pi * f * ratio * tt) * env_exp(d, tau)
    return norm(x)


def snip(heavy=False):
    d = .24 if heavy else .18
    tt = t_(d)
    metal = np.zeros_like(tt)
    for f, a, tau in [(5200, 1, .035), (8100, .7, .025), (3400, .5, .05)]:
        metal += a * np.sin(2 * np.pi * f * tt + 1.7) * env_exp(d, tau)
    cut = hp(noise(d), 2800) * env_exp(d, .018)
    body = np.sin(2 * np.pi * (150 if heavy else 210) * tt) * env_exp(d, .04)
    x = metal * .55 + cut * .85 + body * .35
    return norm(x)


def tear(d=.6):
    tt = t_(d)
    n = noise(d)
    grain = .25 + .75 * np.abs(hp(noise(d), 30))
    x = bp(n, 900, 6500) * grain * np.sin(np.pi * tt / d) ** .7
    return norm(lp(x, 7500))


def fold_swish(d=.5):
    return norm(whoosh(d) * .7 + bp(noise(d), 700, 3800) * env_exp(d, .16) * .35)


def page(d=.45):
    tt = t_(d)
    return norm(whoosh(d) * .45 + bp(noise(d), 1200, 6000) * np.sin(np.pi * tt / d) ** 2 * .5)


def clap():
    d = .12
    return norm(bp(noise(d), 900, 5200) * env_exp(d, .025))


def tick():
    d = .035
    return norm(hp(noise(d), 4200) * env_exp(d, .004))


def harmony(t):
    if t < 2.0:
        return [110.0, 164.81, 220.0, 261.63]
    if t < 9.6:
        return [220.0, 261.63, 329.63, 392.0]        # Am
    if t < 12.4:
        return [293.66, 349.23, 440.0, 523.25]       # Dm
    if t < 16.0:
        return [261.63, 329.63, 392.0, 523.25]       # C
    if t < 19.2:
        return [196.0, 246.94, 293.66, 392.0]        # G
    if t < 21.6:
        return [174.61, 220.0, 261.63, 349.23]       # F
    if t < 23.4:
        return [261.63, 329.63, 392.0, 523.25]       # C
    if t < 25.4:
        return [196.0, 246.94, 293.66, 392.0]        # G
    if t < 27.5:
        return [220.0, 261.63, 329.63, 392.0]        # Am
    return [261.63, 329.63, 392.0, 523.25]           # C


def build_music():
    m = st()

    for at in np.arange(2.4, 29.0, 2.4):
        add(m, pad([f / 2 for f in harmony(at)], 2.6), at, gain=.10, pan=0)

    step = .30
    for i, at in enumerate(np.arange(2.0, 29.2, step)):
        notes = harmony(at)
        f = notes[i % len(notes)]
        if i % 8 in (3, 6):
            f *= 2
        inten = .55 if at < 9.6 else (.8 if at < 12.4 else 1.0)
        add(m, pizz(f), at, gain=.155 * inten, pan=np.sin(i * .9) * .35)

    for at in np.arange(12.4, 27.4, .6):
        root = harmony(at)[0] / 2
        d = .55
        tt = t_(d)
        bass = norm(np.sin(2 * np.pi * root * tt) * env_exp(d, .30))
        add(m, bass, at, gain=.17, pan=0)

    for at in np.arange(9.6, 29.0, 1.2):
        add(m, thump(.9, 58), at, gain=.26, pan=0)
        add(m, clap(), at + .6, gain=.12, pan=.12)

    for at in np.arange(12.4, 29.0, .3):
        add(m, tick(), at, gain=.035, pan=-.25)

    add(m, norm(whoosh(2.6) * np.linspace(.4, 1.0, len(whoosh(2.6)))), 9.65, gain=.35)
    add(m, gong(110, 2.0), 12.40, gain=.22)
    add(m, gong(87.31, 2.4), 19.20, gain=.22)
    add(m, gong(130.81, 2.2), 27.50, gain=.26)
    add(m, pad([130.81, 164.81, 196.0, 261.63], 2.5), 27.5, gain=.16)
    return m


def build_sfx():
    s = st()

    add(s, pad([55.0, 82.41], 2.0), 0.0, gain=.20)

    for at, heavy in [(.55, False), (.92, False), (1.28, False), (1.58, True), (9.60, True), (27.50, False)]:
        add(s, snip(heavy), at, gain=.48 if heavy else .36, pan=-.05)
    add(s, tear(.75), .58, gain=.30, pan=-.2)
    add(s, tear(.55), 1.55, gain=.24, pan=.0)

    amb_d = 8.0
    amb = bp(noise(amb_d), 220, 1400)
    tt = t_(amb_d)
    amb *= .45 + .25 * np.sin(2 * np.pi * .35 * tt)
    add(s, norm(amb) * np.sin(np.pi * tt / amb_d), 2.0, gain=.055, pan=-.25)

    for at, pan in [(2.40, -.4), (2.68, -.35), (2.96, -.3), (6.70, .35), (6.98, .4), (14.25, -.25), (14.52, .25)]:
        add(s, click(.9, .6), at, gain=.16, pan=pan)

    add(s, whoosh(.55), 3.95, gain=.24)
    for i in range(9):
        add(s, tick(), 4.05 + i * .26, gain=.10, pan=.15)
    add(s, pop(.7), 4.10, gain=.18, pan=-.15)

    add(s, ding(.55), 7.30, gain=.20, pan=.35)
    add(s, pizz(659.25), 7.55, gain=.12, pan=.35)

    add(s, whoosh(.7), 9.55, gain=.34)
    add(s, snip(True), 9.60, gain=.50)
    add(s, thump(1.0, 50), 9.62, gain=.34)

    add(s, fold_swish(.55), 11.16, gain=.34)
    add(s, click(1.4, .8), 11.55, gain=.26, pan=.0)

    add(s, ding(.85), 12.40, gain=.30, pan=0)
    add(s, norm(whoosh(1.4)), 12.42, gain=.18)

    for at in (16.05, 16.90, 17.65):
        add(s, page(.45), at, gain=.24, pan=-.1)
        add(s, click(1.1, .5), at + .18, gain=.14, pan=.2)

    add(s, whoosh(.8), 19.15, gain=.22)
    add(s, ding(.6), 19.25, gain=.20)

    add(s, whoosh(.85), 21.40, gain=.34)
    add(s, thump(1.0, 62), 22.30, gain=.36)
    add(s, fold_swish(.6), 22.75, gain=.24)
    add(s, ding(.55), 23.35, gain=.18, pan=.2)

    for at, pan in [(25.52, -.1), (25.72, .1), (25.92, -.05)]:
        add(s, click(1.2, .8), at, gain=.20, pan=pan)
    add(s, whoosh(.45), 27.02, gain=.26)
    add(s, pop(.6), 27.10, gain=.14)

    add(s, tear(.5), 28.85, gain=.18, pan=.15)
    add(s, ding(.45), 29.20, gain=.14, pan=0)
    return s


def main():
    here = os.path.dirname(os.path.abspath(__file__))
    vo_path = os.path.join(here, 'voiceover_timeline.wav')
    out_path = os.path.join(here, 'mix.wav')

    vo, vo_sr = sf.read(vo_path)
    if vo.ndim == 1:
        vo = np.stack([vo, vo], axis=-1)
    if vo_sr != SR:
        from scipy.signal import resample
        vo = resample(vo, int(len(vo) * SR / vo_sr))
    vo = vo.astype(np.float32)

    music = build_music()
    sfx = build_sfx()

    vo_full = np.zeros_like(music)
    vo_len = min(len(vo), len(music))
    vo_full[:vo_len] = vo[:vo_len]

    env = uniform_filter1d(np.abs(vo_full).mean(axis=-1), size=int(SR * .28))
    duck = np.clip(1.0 - env * 2.6, .22, 1.0)
    music *= duck[:, None]

    mix = music * .55 + sfx * .50 + vo_full * .95
    mix[:, 0] = limit(mix[:, 0], ceil=.92)
    mix[:, 1] = limit(mix[:, 1], ceil=.92)

    fade = int(.18 * SR)
    mix[-fade:] *= np.linspace(1, 0, fade)[:, None]
    mix[:int(.005 * SR)] *= np.linspace(0, 1, int(.005 * SR))[:, None]

    peak = float(np.max(np.abs(mix)))
    if peak > .92:
        mix *= .92 / peak

    sf.write(out_path, mix[:N], SR, subtype='PCM_16')
    print(f'OK {out_path}  peak={np.max(np.abs(mix)):.3f}  dur={N/SR:.2f}s')


if __name__ == '__main__':
    main()

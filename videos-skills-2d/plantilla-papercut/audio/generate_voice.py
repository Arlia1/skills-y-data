"""Voz argentina para Agencia Arlia - Hoja en blanco (30 s)."""
import asyncio, os, subprocess
import edge_tts
import numpy as np
import soundfile as sf

DIR = os.path.dirname(os.path.abspath(__file__))
SR = 48000
DUR = 30.0
VEN = "es-AR-TomasNeural"

LINES = [
    ("l01", 0.40, "Tu negocio no tiene web."),
    ("l02", 2.20, "Para Google, sos una hoja en blanco."),
    ("l03", 5.00, "Tu cliente ya está buscando."),
    ("l04", 6.60, "Si no te encuentra, le compra a otro."),
    ("l05", 9.80, "Tu competencia no es mejor... está más visible."),
    ("l06", 12.60, "Una web no es un gasto... es tu vidriera 24/7."),
    ("l07", 16.20, "Diseño premium, lista en días, SEO y soporte."),
    ("l08", 19.40, "En Arlia la hacemos por vos."),
    ("l09", 21.40, "Escribinos PRESUPUESTO por DM. Los primeros diez tienen 10% de descuento."),
    ("l10", 27.50, "Arlia. Tu negocio, visible."),
]

def ffmpeg_convert(src, dst):
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", src, "-ar", str(SR), "-ac", "2", dst], check=True)

async def synth(text, rate):
    mp3 = os.path.join(DIR, "line.mp3")
    wav = os.path.join(DIR, "line.wav")
    await edge_tts.Communicate(text, VEN, rate=f"+{rate}%", pitch="-1Hz").save(mp3)
    ffmpeg_convert(mp3, wav)
    data, _ = sf.read(wav)
    return data.astype(np.float32)

async def build_line(idx, text, start, max_len):
    rate = 8
    best = None
    while rate <= 38:
        data = await synth(text, rate)
        raw = len(data) / SR
        mono = np.abs(data).mean(axis=-1)
        thr = max(0.004, mono.max() * 0.010)
        nz = np.where(mono > thr)[0]
        if len(nz):
            a = max(0, nz[0] - int(0.015 * SR))
            b = min(len(data), nz[-1] + int(0.075 * SR))
            data, dur = data[a:b], (b - a) / SR
        else:
            dur = raw
        print(f"  {idx} rate +{rate}% -> raw {raw:.2f}s / trimmed {dur:.2f}s (slot {max_len:.2f}s)", flush=True)
        best = (data, dur, rate)
        if dur <= max_len:
            break
        rate += 3
    return best

async def main():
    timeline = np.zeros((int(DUR * SR), 2), dtype=np.float32)
    durations = {}
    for i, (idx, start, text) in enumerate(LINES):
        nxt = LINES[i + 1][1] if i + 1 < len(LINES) else DUR - 0.25
        max_len = max(0.9, nxt - start - 0.22)
        print(f"[{idx}] start {start:.2f}s slot {max_len:.2f}s: {text}", flush=True)
        data, dur, rate = await build_line(idx, text, start, max_len)
        # gentle peak normalize
        peak = float(np.max(np.abs(data)))
        if peak > 0:
            data = data * (0.72 / peak)
        # 12 ms fades
        n = int(0.012 * SR)
        if len(data) > 2 * n:
            data[:n] *= np.linspace(0, 1, n)[:, None]
            data[-n:] *= np.linspace(1, 0, n)[:, None]
        s = int(start * SR)
        e = min(len(timeline), s + len(data))
        timeline[s:e] += data[:e - s]
        durations[idx] = {"start": start, "dur": round((e - s) / SR, 3), "rate": rate}
        print(f"  -> placed {idx} {start:.2f}-{e/SR:.2f}s", flush=True)
    # normalize the whole timeline to a comfortable peak
    peak = float(np.max(np.abs(timeline)))
    if peak > 0:
        timeline *= 0.88 / peak
    out = os.path.join(DIR, "voiceover_timeline.wav")
    sf.write(out, timeline, SR, subtype="PCM_16")
    import json
    with open(os.path.join(DIR, "voice_durations.json"), "w") as f:
        json.dump(durations, f, ensure_ascii=False, indent=2)
    print("OK", out)

if __name__ == "__main__":
    asyncio.run(main())

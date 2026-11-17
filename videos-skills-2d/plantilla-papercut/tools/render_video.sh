#!/usr/bin/env bash
set -euo pipefail
exec 9>"/home/y/Escritorio/videos-ai (2)/agencia arlia/argono/reels/.generate.lock"
flock -w 1800 9 || { echo "busy-skip: otro render activo"; exit 0; }
cd "$(dirname "$0")/.."
FPS="${FPS:-30}"
DUR=30.0
SEG=180
N=$(( $(echo "$DUR $FPS" | awk '{print int($1*$2+0.999)}') ))
OUT=out/video_raw.mp4
rm -f "$OUT" out/segs.txt
i=0
while :; do
  a=$(( i * SEG )); b=$(( a + SEG )); [ "$b" -gt "$N" ] && b="$N"; [ "$a" -ge "$N" ] && break
  s=out/seg_$(printf '%02d' "$i").mp4
  for try in 1 2 3; do
    echo "== seg $i try $try (frames $a-$b)"
    if LEMO_ANGLE=swiftshader node tools/render_segment.mjs . "$a" "$b" "$FPS" "$s" 1080x1920; then break; fi
    [ "$try" = 3 ] && { echo "seg $i failed"; exit 1; }
  done
  echo "file '$PWD/$s'" >> out/segs.txt
  i=$(( i + 1 ))
done
ffmpeg -y -loglevel error -f concat -safe 0 -i out/segs.txt -c copy "$OUT"
ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT"

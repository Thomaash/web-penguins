#!/usr/bin/env sh

dir="$(dirname "$0")/assets/placeholders"
mkdir -p "$dir"
cd "$dir"

convert -size 32x32 xc:#FF0000 red.png
convert -size 32x32 xc:#FFFF00 yellow.png
convert -size 32x32 xc:#00FF00 green.png
convert -size 32x32 xc:#00FFFF cyan.png
convert -size 32x32 xc:#0000FF blue.png
convert -size 32x32 xc:#888888 gray.png


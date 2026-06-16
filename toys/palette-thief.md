---
title: Palette Thief
description: Drop in any image and extract a harmonious color palette from it.
date: 2026-06-08
tags:
  - toys
  - color
  - canvas
thumbnail: /img/toys/palette.svg
layout: toy.njk
---

Drag and drop a photo, and the tool samples the most dominant colors using a median-cut algorithm, then outputs them as HEX, RGB, and HSL.

## How it works

1. Draw the image onto an offscreen canvas
2. Read every pixel with `getImageData()`
3. Run median-cut to find representative color buckets
4. Sort by luminance for a pleasing swatch order

## Snippet

```js
function medianCut(pixels, depth = 4) {
  if (depth === 0 || pixels.length === 0) {
    return [average(pixels)];
  }
  const channel = widestChannel(pixels);
  pixels.sort((a, b) => a[channel] - b[channel]);
  const mid = Math.floor(pixels.length / 2);
  return [
    ...medianCut(pixels.slice(0, mid), depth - 1),
    ...medianCut(pixels.slice(mid), depth - 1),
  ];
}
```

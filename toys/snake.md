---
title: Snake
description: Classic snake game built with vanilla JS and an HTML canvas.
date: 2026-06-14
tags:
  - toys
  - game
  - javascript
thumbnail: /img/toys/snake.svg
layout: toy.njk
---

A from-scratch Snake clone with no libraries. Just a `<canvas>`, a game loop, and some key handlers.

## Controls

| Key | Action |
|-----|--------|
| Arrow keys / WASD | Move |
| Space | Pause / Resume |
| R | Restart |

## What I learned

- Keeping a game loop clean with `requestAnimationFrame`
- How quickly "just one more feature" balloons a tiny project
- CSS transforms make centering a canvas surprisingly annoying

## Source

```js
function gameLoop(timestamp) {
  if (timestamp - lastFrame >= TICK) {
    update();
    draw();
    lastFrame = timestamp;
  }
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
```

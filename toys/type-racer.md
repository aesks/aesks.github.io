---
title: Type Racer
description: A minimal typing speed test. 60 seconds, random quotes, live WPM counter.
date: 2026-05-29
tags:
  - toys
  - typing
  - javascript
thumbnail: /img/toys/typeracer.svg
layout: toy.njk
---

A bare-bones typing speed test with live WPM, accuracy tracking, and a result breakdown at the end. No signup, no ads, no nonsense.

## Features

- Random quotes pulled from a local JSON list
- Live WPM calculated as you type
- Character-level highlighting — green for correct, red for wrong
- Final score shows WPM, accuracy %, and error count

## The WPM formula

The standard "word" is 5 characters. WPM is calculated as:

```
wpm = (correctChars / 5) / (elapsedSeconds / 60)
```

## A tricky part

Handling backspace correctly — you need to allow fixing errors but not let the user back up past the current word boundary, otherwise the state machine for coloring gets messy fast.

```js
input.addEventListener('keydown', e => {
  if (e.key === 'Backspace' && cursor > wordStart) {
    cursor--;
    render();
  }
});
```

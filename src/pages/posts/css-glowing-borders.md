---
layout: ../../layouts/MarkdownPostLayout.astro
title: "CSS glowing borders on hover"
pubDate: 2024-02-23
description: "Buttons with a glowing border animation"
author: "Michael Watts"
image:
  url: "https://docs.astro.build/assets/full-logo-light.png"
  alt: "A link image"
tags: ["html", "css"]
wip: false
---

## Working example

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="result" data-slug-hash="qBvPKKm" data-user="altescape" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/altescape/pen/qBvPKKm">
  Glowing button on hover</a> by Michael Watts (<a href="https://codepen.io/altescape">@altescape</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## HTML

```html
<main>
  <button class="btn">Button</button>
  <button class="btn">Button</button>
  <button class="btn">Button</button>
</main>
```

## SCSS

```scss
@font-face {
  font-family: "Mona Sans";
  src: url("https://assets.codepen.io/64/Mona-Sans.woff2") format("woff2 supports variations"),
    url("https://assets.codepen.io/64/Mona-Sans.woff2") format("woff2-variations");
  font-weight: 100 1000;
}

html,
body {
  width: 100%;
  padding: 0;
  margin: 0;
}

@layer properties {
  @property --bg-x {
    syntax: "<number>";
    inherits: true;
    initial-value: 50;
  }
  @property --bg-y {
    syntax: "<number>";
    inherits: true;
    initial-value: -200;
  }
  @property --glow-size {
    syntax: "<number>";
    inherits: true;
    initial-value: 0;
  }
  @property --flash-color {
    syntax: "<color>";
    inherits: true;
    initial-value: hsl(calc(var(--accent-color-hue) * 1deg) 100% 58%);
  }
  @property --flash-size {
    syntax: "<number>";
    inherits: true;
    initial-value: 0;
  }
  @property --text-flash-size {
    syntax: "<number>";
    inherits: true;
    initial-value: 0;
  }
  @property --accent-color-hue {
    syntax: "<number>";
    inherits: true;
    initial-value: 0;
  }
  @property --accent-color-hue {
    syntax: "<number>";
    inherits: true;
    initial-value: 0;
  }
  @property --accent-color {
    syntax: "<color>";
    inherits: true;
    initial-value: hsl(calc(var(--accent-color-hue) * 1deg) 100% 58%);
  }
  @property --radial-bg-color {
    syntax: "<color>";
    inherits: true;
    initial-value: black;
  }
}

:root {
  --background-color: hsl(270deg 92% 5%);
  --dark-color: hsl(270deg 92% 2%);
  --dark-color-hover: hsl(270deg 92% 12%);
  --light-color: hsl(211deg 23% 51%);
  --accent-color-hue: 260;
  --accent-color: hsl(calc(var(--accent-color-hue) * 1deg) 92% 20%);
  --radial-bg-color: var(--dark-color);
  --bg-y: -50;
  --bg-x: 200;
  --glow-size: 2;
  --flash-color: var(--accent-color);
  --flash-size: 0;
  --text-flash-size: 0;
  --text-flash-color: hsl(calc(var(--accent-color-hue) * 1deg) 92% 80%);

  /* Misc */
  --outer-radius: 5px;
  --inner-padding: 16px;
  --outline-color: hsla(
    calc(var(--accent-color-hue) * 1deg) 100% 58% / calc(var(--a11y) * 100%)
  );
}

body {
  background: var(--background-color);
  font-family: "Mona sans", sans-serif;
}

main {
  max-width: 800px;
  margin: 6em auto 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  place-items: center;
  align-items: start;
}

.btn {
  font-family: "Mona sans", sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 1px;
  color: white;
  border: none;
  background: var(--dark-color) radial-gradient(
      ellipse 70% 70% at calc(var(--bg-x) * 1%) calc(var(--bg-y) * 1%),
      var(--radial-bg-color) 0%,
      var(--dark-color) 100%
    );
  padding: var(--inner-padding);
  border-radius: var(--outer-radius);
  position: relative;
  width: 200px;
  z-index: 1;
  box-shadow: 0 0 calc(var(--flash-size) * 1px) var(--flash-color);
  text-shadow: 0 0 calc(var(--text-flash-size) * 1px) var(--text-flash-color);

  &:before {
    --padding: calc(var(--glow-size) * 1px);
    content: "";
    display: block;
    position: absolute;
    width: calc(100% - var(--padding));
    height: calc(100% - var(--padding));
    top: calc(var(--padding) / 2);
    left: calc(var(--padding) / 2);
    background: var(--dark-color);
    border-radius: var(--outer-radius);
    transition: background-color 0.8s ease;
    z-index: -1;
  }

  &:hover {
    animation: glow 0.8s ease-in-out, flash 0.3s ease-out,
      text-flash 0.2 ease-out;
    cursor: pointer;

    &:before {
      background: var(--dark-color-hover);
    }
  }
}

@keyframes glow {
  from {
    --radial-bg-color: hsl(290deg 100% 100%);
    --bg-x: 100;
    --bg-y: 0;
  }
  50% {
    --radial-bg-color: var(--accent-color);
    --bg-x: 60;
    --bg-y: 120;
  }
  to {
    --radial-bg-color: var(--dark-color);
    --bg-x: 60;
    --bg-y: 120;
  }
}

@keyframes flash {
  from {
    --flash-color: var(--accent-color);
    --flash-size: 0;
    --text-flash-size: 0;
  }
  10% {
    --flash-color: var(--accent-color);
    --flash-size: 5;
    --text-flash-size: 2;
  }
  90% {
    --flash-color: var(--accent-color);
    --flash-size: 150;
    --text-flash-size: 150;
  }
  to {
    --flash-color: var(--accent-color);
    --flash-size: 0;
    --text-flash-size: 0;
  }
}
```

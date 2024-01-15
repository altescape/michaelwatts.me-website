---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Code input"
pubDate: 2024-01-15
description: "Building a simple code input like PayPal"
author: "Michael Watts"
image:
  url: "https://docs.astro.build/assets/full-logo-light.png"
  alt: "A link image"
tags: ["typescript", "html", "css"]
wip: false
---

## Example of a code input

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="result" data-slug-hash="JjzENWx" data-user="altescape" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/altescape/pen/JjzENWx">
  Code input method</a> by Michael Watts (<a href="https://codepen.io/altescape">@altescape</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## HTML

Note the use of `autocorrect` and `spellcheck` to avoid red warning lines on the input.

```html
<div class="container">
  <div class="box-code-container">
    <input
      id="code-input"
      type="text"
      name="box-code"
      class="box-code-input"
      maxlength="6"
      title="Input code"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      pattern="[a-z][A-Z][0-9]"
      autofocus
    />
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>
  <button
    id="submit-button"
    class="button"
    disabled
  >
    Submit
  </button>
</div>
```

## CSS

The CSS uses a monotype font with the use of `ch` as a character measurement.

```css
body {
  height: 90vh;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.box-code-container {
  display: grid;
  grid-template-columns: repeat(6, 2ch);
  grid-template-rows: 1fr;
  gap: 0px 1ch;
  position: relative;
  font-family: monospace;
  font-size: 2.5rem;
  height: 100px;
  align-items: center;
}

.box-code-input {
  position: absolute;
  top: 0;
  left: .5ch;
  right: -2ch;
  height: 100px;
  font-family: inherit;
  font-size: inherit;
  border: none;
  outline: none;
  padding: 0;
  letter-spacing: 2ch;
  color: grey;
  background: transparent;
  width: 18ch;
  user-select: none;
  opacity: .5;
  transition: opacity .2s ease-in-out;
}

.box-code-input:focus {
  opacity: 1;
  color: rebeccapurple;
}

.box-code-input::selection {
  background-color: transparent;
}

.cell {
  outline: 2px solid grey;
  width: 2ch;
  height: 3ch;
  z-index: -1;
  border-radius: 5px;
}

.button {
  background: rebeccapurple;
  color: white;
  font-size: 1.5rem;
  padding: .75rem 2rem;
  border-radius: 5px;
  transition: opacity .2s ease-in-out;
  border: none;
}

.button:active,
.button:focus,
.button:focus-visible {
  outline: 3px solid #66339982;
}

.button:disabled {
  opacity: .5;
}
```

## TypeScript

Blurring the input box when the 6th character has been entered avoids a weird overflow.

```ts
document.addEventListener("DOMContentLoaded", function () {
  var codeInput = document.querySelector("#code-input");
  var submitButton = document.querySelector("#submit-button");

  function handleInput() {
    if (codeInput.value.length >= 6) {
      codeInput.blur(); // Blur the input so cursor doesn't hang outside boxes
      submitButton.disabled = false;
      submitButton.focus();
    } else {
      submitButton.disabled = true;
    }
  }

  codeInput.addEventListener("input", handleInput);

  codeInput.addEventListener("paste", function (event) {
    setTimeout(handleInput, 0);
  });
});
```

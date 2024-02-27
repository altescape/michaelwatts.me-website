class CodeInput extends HTMLElement {
  #shadow: ShadowRoot | null = null;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  handleInput(event: InputEvent) {
    const codeInput = event.target as HTMLInputElement;
    if (codeInput.value.length >= 6) {
      codeInput.blur(); // Blur the input so cursor doesn't hang outside boxes
    }
  }

  connectedCallback() {
    if (this.#shadow === null) return;

    this.#shadow.innerHTML = `
      <style>
        .cells {
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
        .code-input {
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
          color: var(--mw-brand);
          background: transparent;
          width: 18ch;
          user-select: none;
          opacity: .5;
          transition: opacity .2s ease-in-out;
        }
        .code-input:focus {
          opacity: 1;
          color: var(--mw-brand-lighter);
        }
        .code-input::selection {
          background-color: transparent;
        }
        .cell {
          outline: 2px solid var(--mw-brand);
          width: 2ch;
          height: 3ch;
          z-index: -1;
          border-radius: 5px;
          background-color: rgba(0, 0, 0, 0.2);
        }
      </style>
      <div class="cells">
        <input
          id="code-input"
          type="text"
          name="code-input"
          class="code-input"
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
    `;

    const codeInput = this.#shadow.querySelector("#code-input");

    codeInput?.addEventListener("input", (event: Event) => {
      this.handleInput(event as InputEvent);
    });

    codeInput?.addEventListener("paste", () => {
      setTimeout(this.handleInput, 0);
    });
  }
}

customElements.define("code-input", CodeInput);

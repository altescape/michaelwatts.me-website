class ToggleTheme extends HTMLElement {
  #shadow: ShadowRoot | null = null;
  #mode: string = "#light-mode";
  #html: HTMLElement | null = null;
  #icon: HTMLElement | null | undefined = null;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  toggleMode() {
    if (this.#mode === "#dark-mode") {
      this.#mode = "#light-mode";
    } else {
      this.#mode = "#dark-mode";
    }
  }

  toggleLocalStorage() {
    if (this.#mode === "#dark-mode") {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.removeItem("theme");
    }
  }

  toggleHtmlClass() {
    if (this.#html === null) return;

    if (this.#mode === "#dark-mode") {
      this.#html.classList.add("dark");
    } else {
      this.#html.classList.remove("dark");
    }
  }

  toggleIcon() {
    const toggleThemeElement = document.querySelector("toggle-theme");
    if (toggleThemeElement === null) return;

    const iconContainer =
      toggleThemeElement.shadowRoot?.querySelector(".icon-container");
    this.#icon = toggleThemeElement.shadowRoot?.querySelector("#icon");

    if (this.#icon === null || this.#icon === undefined) return;

    iconContainer?.classList.add("animating");

    setTimeout(() => {
      if (this.#icon !== null && this.#icon !== undefined) {
        this.#icon.innerHTML = `<use href="${this.#mode}" />`;
      }
    }, 500);

    setTimeout(() => {
      iconContainer?.classList.remove("animating");
      iconContainer?.classList.add("done-animating");
    }, 1000);

    setTimeout(() => {
      iconContainer?.classList.remove("done-animating");
    }, 1500);
  }

  connectedCallback() {
    if (this.#shadow === null) return;

    this.#html = document.querySelector("html");

    if (localStorage.getItem("theme") === "dark") {
      this.#mode = "#dark-mode";
    } else {
      this.#mode = "#light-mode";
    }

    this.toggleHtmlClass();

    this.#shadow.innerHTML = `
      <style>
        #toggle-theme {
          --icon-color: #b98714;
          --icon-color-darker: #b97614;
        }
        #toggle-theme {
          transition: background-color 0.3s ease;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          width: 26px;
          height: 26px;
          padding: 0;
        }
        #toggle-theme:hover {
          cursor: pointer;
        }
        .icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          overflow: hidden;
        }
        .icon-container.animating {
          animation: move 1s;
        }
        .icon-container.done-animating {
          animation: none;
        }
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-90deg);
          }
        }
        @keyframes move {
          0% {
            transform: translateX(0) rotate(0deg);
          }
          50% {
            transform: translateX(100%) rotate(0deg);
          }
          50.001% {
            transform: translateX(-35%) rotate(0deg) scale(0.2);
          }
          100% {
            transform: translateX(0) rotate(360deg) scale(1);
          }
        }
        .icon {
          width: 18px;
          height: 18px;
          transition: fill 0.3s ease;
          fill: var(--icon-color);
        }
        #toggle-theme:hover .icon {
          fill: var(--icon-color-darker);
          animation: rotate 1s infinite linear;
          animation-direction: alternate;
        }
        .hidden {
          display: none;
        }
      </style>
      <button
        id="toggle-theme"
        aria-label="Toggle light/dark mode"
      >
        <div class="icon-container">
          <svg id="icon" class="icon">
            <use href="${this.#mode}" />
          </svg>
        </div>
      </button>
      <svg xmlns="http://www.w3.org/2000/svg" class="hidden">
        <symbol id="light-mode" viewBox="0 0 16 16">
          <path
            d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"
          />
        </symbol>
        <symbol id="dark-mode" viewBox="0 0 16 16">
          <path
            d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"
          />
        </symbol>
      </svg>
    `;

    this.#shadow.addEventListener("click", () => {
      this.toggleMode();
      this.toggleLocalStorage();
      this.toggleHtmlClass();
      this.toggleIcon();
    });
  }
}

customElements.define("toggle-theme", ToggleTheme);

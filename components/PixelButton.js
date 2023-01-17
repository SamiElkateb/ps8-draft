const css = `
  <style>
    .pixel-btn{
      cursor: pointer;
      font-family: 'VT323', monospace;

      text-transform: uppercase;
      position: relative;
      color: white;
      border-style: solid;
      background-color: transparent;
      border-width: 3px;
      border-color: white;
      border-image-slice: 4;
      border-image-width: 2;
      border-image-outset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .color-error {
      color: red;
      border-color: red;
      border-image-source: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'><path d='M2 2h2v2H2zM4 0h2v2H4zM10 4h2v2h-2zM0 4h2v2H0zM6 0h2v2H6zM8 2h2v2H8zM8 8h2v2H8zM6 10h2v2H6zM0 6h2v2H0zM10 6h2v2h-2zM4 10h2v2H4zM2 8h2v2H2z' fill='red' /></svg>");
    }

    .color-default {
      color: white;
      border-color: white;
      border-image-source: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'><path d='M2 2h2v2H2zM4 0h2v2H4zM10 4h2v2h-2zM0 4h2v2H0zM6 0h2v2H6zM8 2h2v2H8zM8 8h2v2H8zM6 10h2v2H6zM0 6h2v2H0zM10 6h2v2h-2zM4 10h2v2H4zM2 8h2v2H2z' fill='white' /></svg>");
    }

    .size-xs{
      margin:0.3rem;
    }

    .size-sm{

    }

    .size-md{
      border-radius: 1rem;
      margin: 1rem;
      font-size: 1.2rem;
      padding: 0.75rem 1rem;
      min-width: 8rem;
    }
    
    .size-xl{
      margin: 1rem;
      font-size: 2rem;
      padding: 0.75rem 1.5rem;
      min-width: 8rem;
    }

    .pixel-btn:hover{
      opacity: 0.8;
    }
    ::slotted(*) {
      width:25px;
    }
    .pixel-btn:disabled{
      cursor: default;
      opacity: 0.5;
      background-color: rgba(255, 255, 255, 0.5);
    }
  </style>
`;

class PixelButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    const color = this.getAttribute('color') || 'default';
    const size = this.getAttribute('size') || 'md';
    const disabled = this.getAttribute('disabled') === 'true' ? 'disabled="true"' : '';
    const classNames = `color-${color} size-${size}`;

    this.shadowRoot.innerHTML = `${css}
      <button class="pixel-btn ${classNames}" ${disabled}>
        <slot />
      </button>
    `;
  }
}

window.customElements.define('pixel-button', PixelButton);

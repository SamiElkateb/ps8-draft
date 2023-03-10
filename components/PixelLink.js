import styled from '../core/styled';

const css = styled`
    .pixel-link{
      box-sizing: border-box;
      text-decoration: none;
      text-align: center;
      cursor: pointer;
      font-family: 'VT323', monospace;
      display: block;
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
      border-radius: 1rem;
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

    .color-back {
      color: yellow;
      border-color: yellow;
      border-image-source: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'><path d='M2 2h2v2H2zM4 0h2v2H4zM10 4h2v2h-2zM0 4h2v2H0zM6 0h2v2H6zM8 2h2v2H8zM8 8h2v2H8zM6 10h2v2H6zM0 6h2v2H0zM10 6h2v2h-2zM4 10h2v2H4zM2 8h2v2H2z' fill='yellow' /></svg>");
    }

    .size-xs{
      margin:0.3rem;
      padding: 0.15rem 0.4rem;
    }

    .size-sm{

    }

    .size-md{
      margin: 1rem;
      font-size: 1.2rem;
      padding: 0.75rem 1rem;
      min-width: 8rem;
    }

    .pixel-link:hover{
      opacity: 0.8;
    }

    ::slotted(*) {
      width:25px;
    }
    .pixel-link[aria-disabled="true"]{
      cursor: default;
      opacity: 0.5;
      background-color: rgba(255, 255, 255, 0.5);
    }
`;

class PixelLink extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    const color = this.getAttribute('color') || 'default';
    const size = this.getAttribute('size') || 'md';
    const disabled = this.getAttribute('disabled') === 'true' ? 'aria-disabled="true"' : '';
    const classNames = `color-${color} size-${size}`;
    const href = disabled === '' ? this.getAttribute('href') : '';

    this.shadowRoot.innerHTML = `${css}
      <a class="pixel-link ${classNames}" href="${href}" ${disabled}>
        <slot />
      </a>
    `;
  }
}

window.customElements.define('pixel-link', PixelLink);

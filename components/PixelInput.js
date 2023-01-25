import styled from '../core/styled';

const css = styled`
    .pixel-input{
      cursor: pointer;
      font-family: 'VT323', monospace;
      display: flex;
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
      padding: 0px;
      margin: 1rem;
      border-image-source: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'><path d='M2 2h2v2H2zM4 0h2v2H4zM10 4h2v2h-2zM0 4h2v2H0zM6 0h2v2H6zM8 2h2v2H8zM8 8h2v2H8zM6 10h2v2H6zM0 6h2v2H0zM10 6h2v2h-2zM4 10h2v2H4zM2 8h2v2H2z' fill='white' /></svg>");
      border-radius: 1rem;
      
    }
    .pixel-input input{
      display: block;
      text-transform: uppercase;
      position: relative;
      color: white;
      background-color: transparent;
      flex:1;
      margin: 0px;
      padding: 1rem;
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
      margin: 1rem;
      font-size: 1.2rem;
      padding: 0.75rem 1rem;
      min-width: 8rem;
    }
    ::slotted(*) {
 
    }
    input::placeholder{
        font-family: 'VT323', monospace;
    }
    .input-msg{
        font-family: 'VT323', monospace;
    }
    input:disabled{
      cursor: default;
    }
    .pixel-input.disabled {
      cursor: default;
      opacity: 0.5;
      background-color: rgba(255, 255, 255, 0.5);
    }
    .pixel-input.disabled input::placeholder{
      color:white;
    }
`;

class PixelInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    const color = this.getAttribute('color') || 'default';
    const size = this.getAttribute('size') || 'md';
    const placeholder = this.getAttribute('placeholder') || '';
    const isDisabled = this.getAttribute('disabled') === 'true';
    const classNames = `color-${color} size-${size}`;
    const pixelInputClassNames = isDisabled ? 'disabled' : '';
    const disabled = isDisabled ? 'disabled="true"' : '';

    this.shadowRoot.innerHTML = `
      ${css}
        <label class="pixel-input ${pixelInputClassNames}">
          <input type="text" placeholder="${placeholder}" class="input-msg ${classNames}" ${disabled}>
          <slot />
        </label>
    `;
  }
}

window.customElements.define('pixel-input', PixelInput);

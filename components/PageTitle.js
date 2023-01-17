const css = `
  <style>
    h1 {
      text-transform: uppercase;
      color: white;
      font-size: 3rem;
      font-family: 'VT323', monospace;
      margin: 0px;
      font-weight: normal;
    }

    h2{
      margin: 0px;
    }

    .page-title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 1.5rem;
      margin-bottom: 3rem;
    }

    img {
      width: 180px;
    }

  </style>
`;

class PageTitle extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    const title = this.getAttribute('title') || 'Connect 4';
    const subtitle = this.getAttribute('subtitle') || '';
    const logo = this.getAttribute('logo') !== 'none' ? '<img src="../icons/logo.svg" class="logo" />' : '';
    this.shadowRoot.innerHTML = `${css}
      <div class="page-title">
        <h1>${title}</h1>
        <h2>${subtitle}</h2>
        ${logo}
      </div>
    `;
  }
}

window.customElements.define('page-title', PageTitle);

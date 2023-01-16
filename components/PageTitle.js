const template = document.createElement('template');
template.innerHTML = `
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
  <div class="page-title">
    <h1></h1>
    <h2></h2>
    <img src="../icons/logo.svg" class="logo" />
  </div>
`;

class PageTitle extends HTMLElement {
  constructor() {
    super();
    const title = this.getAttribute('title') || 'Connect 4';
    const subtitle = this.getAttribute('subtitle') || '';

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('h1').innerText = title;
    this.shadowRoot.querySelector('h2').innerText = subtitle;
  }

  connectedCallback() {
    if (this.getAttribute('logo') === 'none') this.shadowRoot.querySelector('.logo').style.display = 'none';
  }

  // disconnectedCallback() {
  // }
}

window.customElements.define('page-title', PageTitle);

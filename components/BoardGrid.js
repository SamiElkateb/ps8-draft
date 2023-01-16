const template = document.createElement('template');
template.innerHTML = `
<style>
 .board-grid {
    color: white;
    display: flex;
    flex: 1;
    justify-content: center;
    cursor: url('../public/cursors/yellow-player.svg'), pointer;
 }
  .column>* {
    min-width: 3rem;
    min-height: 3rem;
    border: 1px solid white;
    width: fit-content;
    height: fit-content;
  }
  .column.hover>div:not(.dropzone){
    background-color: rgb(125, 125, 255, 0.2);
  }
  .column>*:not(.dropzone) {
    cursor: pointer;
  }
  .dropzone {
    border:none;
  }
</style>
  <div class="board-grid">
    <div id="c1" class="column">
      <div id="c1-0" class="dropzone"></div>
      <div id="c1-1"></div>
      <div id="c1-2"></div>
      <div id="c1-3"></div>
      <div id="c1-4"></div>
      <div id="c1-5"></div>
      <div id="c1-6"></div>
    </div>
    <div id="c2" class="column">
       <div id="c2-0" class="dropzone"></div>
       <div id="c2-1"></div>
       <div id="c2-2"></div>
       <div id="c2-3"></div>
       <div id="c2-4"></div>
       <div id="c2-5"></div>
       <div id="c2-6"></div>
    </div>
    <div id="c3" class="column">
       <div id="c3-0" class="dropzone"></div>
       <div id="c3-1"></div>
       <div id="c3-2"></div>
       <div id="c3-3"></div>
       <div id="c3-4"></div>
       <div id="c3-5"></div>
       <div id="c3-6"></div>
    </div>
    <div id="c4" class="column">
        <div id="c4-0" class="dropzone"></div>
        <div id="c4-1"></div>
        <div id="c4-2"></div>
        <div id="c4-3"></div>
        <div id="c4-4"></div>
        <div id="c4-5"></div>
        <div id="c4-6"></div>
    </div>
    <div id="c5" class="column">
      <div id="c5-0" class="dropzone"></div>
      <div id="c5-1"></div>
      <div id="c5-2"></div>
      <div id="c5-3"></div>
      <div id="c5-4"></div>
      <div id="c5-5"></div>
      <div id="c5-6"></div>
    </div>
    <div id="c6" class="column">
      <div id="c6-0" class="dropzone"></div>
      <div id="c6-1"></div>
      <div id="c6-2"></div>
      <div id="c6-3"></div>
      <div id="c6-4"></div>
      <div id="c6-5"></div>
      <div id="c6-6"></div>
    </div>
    <div id="c7" class="column">
        <div id="c7-0" class="dropzone"></div>
        <div id="c7-1"></div>
        <div id="c7-2"></div>
        <div id="c7-3"></div>
        <div id="c7-4"></div>
        <div id="c7-5"></div>
        <div id="c7-6"></div>
    </div>
  </div>
`;

class BoardGrid extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static mouseOverHandler(event) {
    const target = event.currentTarget;
    target.parentElement.classList.add('hover');
  }

  static mouseOutHandler(event) {
    const target = event.currentTarget;
    target.parentElement.classList.remove('hover');
  }

  connectedCallback() {
    this.shadowRoot.querySelectorAll('.dropzone').forEach((el) => { el.addEventListener('mouseover', (e) => { BoardGrid.mouseOverHandler(e); }); });
    this.shadowRoot.querySelectorAll('.dropzone').forEach((el) => { el.addEventListener('mouseout', (e) => { BoardGrid.mouseOutHandler(e); }); });
  }
}

window.customElements.define('board-grid', BoardGrid);

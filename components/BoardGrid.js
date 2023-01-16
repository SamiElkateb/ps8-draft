const template = document.createElement('template');
template.innerHTML = `
<style>
 .board-grid{
    color: white;
    display: flex;
    justify-content: center;
 }
 .board-grid *{
    border: 1px solid white;
    width: fit-content;
    height: fit-content;
}
.column *{
    height: 75px;
    width: 75px;
}
</style>
  
  <div class="board-grid">
    <div id="c1" class="column">
      <div id="c1-1"></div>
      <div id="c1-2"></div>
      <div id="c1-3"></div>
      <div id="c1-4"></div>
      <div id="c1-5"></div>
      <div id="c1-6"></div>
    </div>
    <div id="c2" class="column">
       <div id="c2-1"></div>
       <div id="c2-2"></div>
       <div id="c2-3"></div>
       <div id="c2-4"></div>
       <div id="c2-5"></div>
       <div id="c2-6"></div>
    </div>
    <div id="c3" class="column">
       <div id="c3-1"></div>
       <div id="c3-2"></div>
       <div id="c3-3"></div>
       <div id="c3-4"></div>
       <div id="c3-5"></div>
       <div id="c3-6"></div>
    </div>
    <div id="c4" class="column">
        <div id="c4-1"></div>
        <div id="c4-2"></div>
        <div id="c4-3"></div>
        <div id="c4-4"></div>
        <div id="c4-5"></div>
        <div id="c4-6"></div>
    </div>
    <div id="c5" class="column">
    <div id="c5-1"></div>
      <div id="c5-2"></div>
      <div id="c5-3"></div>
      <div id="c5-4"></div>
      <div id="c5-5"></div>
      <div id="c5-6"></div>
    </div>
    <div id="c6" class="column">
        <div id="c6-1"></div>
      <div id="c6-2"></div>
      <div id="c6-3"></div>
      <div id="c6-4"></div>
      <div id="c6-5"></div>
      <div id="c6-6"></div>
    </div>
    <div id="c7" class="column">
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
}

window.customElements.define('board-grid', BoardGrid);

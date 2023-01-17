const template = document.createElement('template');
template.innerHTML = `
<style>
   .board-grid *{
      box-sizing: border-box;
    }
    .board-grid img{
      width: 100%;
    }
   .board-grid {
      color: white;
      display: flex;
      flex: 1;
      justify-content: center;
   }
  .board-grid.red-player {
      cursor: url('../cursors/red-player.svg'), pointer;
  }
  .board-grid.yellow-player {
      cursor: url('../cursors/yellow-player.svg'), pointer;
  }
  .column>div {
    width: 5rem;
    height: 5rem;
    border: 1px solid white;
    padding: 0.5rem;
  }
  .column>div:hover{
    background-color: rgb(125, 125, 255, 0.3);
  }
  .board-grid.red-player .column>div.invalid:hover{
    background-color: rgb(255, 125, 125, 0.3);
    cursor: url('../cursors/red-player-invalid.svg'), pointer;
  }
  .board-grid.yellow-player .column>div.invalid:hover{
    background-color: rgb(255, 125, 125, 0.3);
    cursor: url('../cursors/yellow-player-invalid.svg'), pointer;
  }
</style>
  <div class="board-grid red-player">
    <div id="c0" class="column">
      <div id="c0-5"></div>
      <div id="c0-4"></div>
      <div id="c0-3"></div>
      <div id="c0-2"></div>
      <div id="c0-1"></div>
      <div id="c0-0"></div>
    </div>
    <div id="c1" class="column">
       <div id="c1-5"></div>
       <div id="c1-4"></div>
       <div id="c1-3"></div>
       <div id="c1-2"></div>
       <div id="c1-1"></div>
       <div id="c1-0"></div>
    </div>
    <div id="c2" class="column">
       <div id="c2-5"></div>
       <div id="c2-4"></div>
       <div id="c2-3"></div>
       <div id="c2-2"></div>
       <div id="c2-1"></div>
       <div id="c2-0"></div>
    </div>
    <div id="c3" class="column">
        <div id="c3-5"></div>
        <div id="c3-4"></div>
        <div id="c3-3"></div>
        <div id="c3-2"></div>
        <div id="c3-1"></div>
        <div id="c3-0"></div>
    </div>
    <div id="c4" class="column">
      <div id="c4-5"></div>
      <div id="c4-4"></div>
      <div id="c4-3"></div>
      <div id="c4-2"></div>
      <div id="c4-1"></div>
      <div id="c4-0"></div>
    </div>
    <div id="c5" class="column">
      <div id="c5-5"></div>
      <div id="c5-4"></div>
      <div id="c5-3"></div>
      <div id="c5-2"></div>
      <div id="c5-1"></div>
      <div id="c5-0"></div>
    </div>
    <div id="c6" class="column">
        <div id="c6-5"></div>
        <div id="c6-4"></div>
        <div id="c6-3"></div>
        <div id="c6-2"></div>
        <div id="c6-1"></div>
        <div id="c6-0"></div>
    </div>
  </div>
`;

class BoardGrid extends HTMLElement {
  constructor() {
    super();
    this.grid = new GameGrid();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.boardGame = this.shadowRoot.querySelector('.board-grid');
    this.currentPlayer = 'red';
    this.isOver = false;
  }

  mouseOverHandler(event) {
    const target = event.currentTarget;
    const stringCoord = target.id.replace('c', '').split('-');
    const coord = { x: parseInt(stringCoord[0], 10), y: parseInt(stringCoord[1], 10), color: 'r' };
    const isValid = this.grid.isValid(coord);
    if (!isValid) {
      target.classList.add('invalid');
    } else {
      target.classList.remove('invalid');
    }
  }

  mouseOutHandler(event) {
    const target = event.currentTarget;
    const stringCoord = target.id.replace('c', '').split('-');
    const coord = { x: parseInt(stringCoord[0], 10), y: parseInt(stringCoord[1], 10), color: 'r' };
    const isValid = this.grid.isValid(coord);
    if (!isValid) {
      target.classList.add('invalid');
    } else {
      target.classList.remove('invalid');
    }
  }

  createTokenElement() {
    const img = document.createElement('img');
    img.src = `../icons/${this.currentPlayer}-token.svg`;
    return img;
  }

  togglePlayer() {
    this.boardGame.classList.remove(`${this.currentPlayer}-player`);
    this.currentPlayer = this.currentPlayer === 'red' ? 'yellow' : 'red';
    this.boardGame.classList.add(`${this.currentPlayer}-player`);
  }

  clickHandler(event) {
    if (this.isOver) return;
    const target = event.currentTarget;
    const stringCoord = target.id.replace('c', '').split('-');
    const coord = {
      x: parseInt(stringCoord[0], 10),
      y: parseInt(stringCoord[1], 10),
      color: this.currentPlayer,
    };
    const { isSuccessful, isOver } = this.grid.add(coord);
    if (isSuccessful) {
      const img = this.createTokenElement();
      target.append(img);
      target.classList.add('invalid');
      if (isOver) {
        this.isOver = true;
        alert('Game Over');
      }
      this.togglePlayer();
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelectorAll('.column>div').forEach((el) => { el.addEventListener('mouseover', (e) => { this.mouseOverHandler(e); }); });
    this.shadowRoot.querySelectorAll('.column>div').forEach((el) => { el.addEventListener('mouseout', (e) => { this.mouseOutHandler(e); }); });
    this.shadowRoot.querySelectorAll('.column>div').forEach((el) => { el.addEventListener('click', (e) => { this.clickHandler(e); }); });
  }
}

window.customElements.define('board-grid', BoardGrid);

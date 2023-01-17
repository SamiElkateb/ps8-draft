const css = `
<style>
  .main-nav{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
`;

class EndGame extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.winner = this.getAttribute('winner');
    this.gameMode = this.getAttribute('gameMode');
    this.populateLocalEndGameScreen();
    this.render();
  }

  populateLocalEndGameScreen() {
    this.iconName = 'crown';
    this.pageTitle = `${this.winner} player wins!`;
    this.replayLink = '/pages/localGame.html';
  }

  restartHandler = () => {
    const restartGameEvent = new Event('restart-game');
    this.dispatchEvent(restartGameEvent);
  };

  render() {
    window.restartHandler = this.restartHandler;

    this.shadowRoot.innerHTML = `${css}
      <page-title title="${this.pageTitle}"></page-title>
      <div class="main-nav">
          <img src="../icons/${this.iconName}.svg">
          <pixel-button onClick="restartHandler()">Play again</pixel-button>
          <pixel-link href="/">Menu</pixel-link>
      </div>
    `;
  }
}

window.customElements.define('end-game', EndGame);

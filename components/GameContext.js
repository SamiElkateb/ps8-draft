import './EndGame';
import styled from '../core/styled';

const css = styled`
  header {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
  }
  .secondary-nav{
    display: flex;
  }
  .main-nav{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .game-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
}`;

class GameContext extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isOver = false;
    this.winner = '';
    this.gameMode = '';
    this.render();
  }

  gameOverHandlerWinner = (event) => {
    this.winner = event.detail.winner;
    this.gameMode = event.detail.gameMode;
    this.isOver = true;
    this.endGameType = 'crown';
    this.render();
  };

  gameOverHandlerNoWinner = (event) => {
    this.winner = null;
    this.gameMode = event.detail.gameMode;
    this.isOver = true;
    console.log('IsNyan');
    this.endGameType = 'nyancat';
    this.render();
  };

  restartGameHandler = () => {
    this.isOver = false;
    this.render();
  };

  connectEventListeners() {
    if (this.boardGrid) {
      this.boardGrid.removeEventListener('game-over', this.gameOverHandlerWinner);
    }
    this.boardGrid = this.shadowRoot.querySelector('board-grid');
    if (this.boardGrid) {
      if (this.boardGrid.winner != null) this.boardGrid.addEventListener('game-over', this.gameOverHandlerWinner);
      this.boardGrid.addEventListener('game-over', this.gameOverHandlerNoWinner);
    }

    if (this.endGame) {
      this.endGame.removeEventListener('restart-game', this.restartGameHandler);
    }
    this.endGame = this.shadowRoot.querySelector('end-game');
    if (this.endGame) {
      this.endGame.addEventListener('restart-game', this.restartGameHandler);
    }
  }

  connectedCallback() {
    this.connectEventListeners();
  }

  domChangedCallback() {
    this.connectEventListeners();
  }

  render() {
    const game = `
        <page-title title="Player1 VS Player2"></page-title>
        <div class="game-container">
          <chat-box></chat-box>
          <board-grid></board-grid>
          <pixel-button style="align-self: center">Save game</pixel-button>
        </div>`;

    const endGame = `<end-game winner="${this.winner}" gameMode="${this.gameMode}" endGameType="${this.endGameType}"></end-game>`;
    const header = `<header>
          <pixel-link size="xs" href="/"><img src="../icons/home.svg" /></pixel-link>
          <nav class="secondary-nav">
            <pixel-link href="/pages/profile.html" size="xs"><img src="../icons/profile.svg" /></pixel-link>
            <pixel-link href="/pages/friends.html" size="xs"><img src="../icons/friend.svg" /></pixel-link>
            <pixel-link href="/pages/settings.html" size="xs"><img src="../icons/wrench.svg" /></pixel-link>
          </nav>
        </header>`;

    if (!this.isOver) {
      this.shadowRoot.innerHTML = css + header + game;
    } else {
      this.shadowRoot.innerHTML = css + header + endGame;
    }
    this.domChangedCallback();
  }
}

window.customElements.define('game-context', GameContext);

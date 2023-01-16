const template = document.createElement('template');
template.innerHTML = `
  <style>
    .chat-box {
    }
    input {
      background-color: transparent;
      border: none;
      color: white;
      margin: 0px;
      font-family: 'VT323', monospace;
      font-size: 1.3rem;
      padding: 0.5rem 1rem;
    }
    input:focus-visible {
      outline-offset: -2px;
      outline: none;
    }
    .message-input {
      border: 1px solid white;
      flex:1;
    }
    .message-btn{
      border: 1px solid white;
      border-left: none;
    }
    .message-btn:hover {
      cursor:pointer;
      background-color: rgba(255, 255, 255, 0.1)
    }
    p {
      color: white;
      margin: 0.25rem 0;
    }
    .history{
      border: 1px solid white;
      border-bottom: none;
      padding:1rem;
      overflow: scroll;
      height: 10rem;
      display: flex;
      flex-direction: column-reverse;
    }
    .history>div{
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      flex-direction: column;
    }
    @keyframes wiggle {
      0%   {left:-0.5rem;}
      25%  {left:+0.5rem;}
      50%  {left:-0.5rem;}
      75%  {left:+0.5rem;}
      100% {left:0;}
    }
    .wiggle{
      position:relative;
      animation-name: wiggle;
      animation-duration: 300ms;
    }
    .sender-self {
      text-align: right;
      color: yellow;
    }
    .sender-other {
      text-align: left;
    }
    .empty-msg-error {
      flex: 1;
      padding-left: 1rem;
      font-size: 1.3rem;
      flex-basis: 100%;
      color: red;
      display: none;
      position: absolute;
    }
    .error>input{
      background-color: rgba(255, 0, 0, 0.05);
      border-color: red;
    }
    .error .message-btn {
      color:red;
    }
    .error .empty-msg-error{
      display: block;
    }
    form {
      padding: 0px;
    }
    .chat-box{
      margin: 2rem;
    }
  </style>
  <div class="chat-box">
      <div class="history">
        <div></div>
      </div>
      <form action="" method="POST">
        <input name="message" type="text" placeholder="Say hello" class="message-input"><!--
        --><input type="submit" value="send" class="message-btn">
        <p class="empty-msg-error">Messages can't be empty.</p>
      </form>
  </div>
`;

class ChatBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.isMessageValid = true;
  }

  onSubmitHandler(event) {
    event.preventDefault();
    const input = this.shadowRoot.querySelector('.message-input');
    const message = input.value;
    input.value = '';
    if (message.trim() === '') {
      this.handleError();
      return;
    }
    const timestamp = Date.now();
    this.onReceiveMessage({ message, sender: 'self', timestamp });
  }

  static parseTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  onReceiveMessage(data) {
    const { message, timestamp, sender } = data;
    const p = document.createElement('p');
    p.innerText = `${ChatBox.parseTime(timestamp)} - ${message}`;
    p.className = `sender-${sender}`;
    this.shadowRoot.querySelector('.history>div').append(p);
  }

  handleError() {
    this.isMessageValid = false;
    const form = this.shadowRoot.querySelector('form');
    form.className = 'error';
    setTimeout(() => { form.className = 'error wiggle'; });
  }

  messageChangeHandler(event) {
    if (this.isMessageValid) return;
    const message = event.currentTarget.value;
    if (message.trim() === '') return;
    this.isMessageValid = true;
    const form = this.shadowRoot.querySelector('form');
    form.className = '';
  }

  connectedCallback() {
    this.shadowRoot.querySelector('form').addEventListener('submit', (e) => { this.onSubmitHandler(e); });
    this.shadowRoot.querySelector('.message-input').addEventListener('keyup', (e) => { this.messageChangeHandler(e); });
  }
}

window.customElements.define('chat-box', ChatBox);

var socket = io();

var blockNick = document.getElementById('block_nick');
var blockChat = document.getElementById('block_chat');

var formNick = document.getElementById('form_nick');
var inputNick = document.getElementById('input_nick');

var form = document.getElementById('form');
var input = document.getElementById('input');
var messages = document.getElementById('messages');
var nickSelected = '';
var hiddenClassName = 'hidden';

formNick.addEventListener('submit', function(e) {
  e.preventDefault();
  nickSelected = inputNick.value;
  if (nickSelected) {
    inputNick.value = '';
    blockNick.classList.add(hiddenClassName);
    blockChat.classList.remove(hiddenClassName);
    
    activateChatListen();
    activateChatSender();
  } else {
    alert('Indique un nick por favor');
  }
});


const activateChatSender = () => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const message = input.value;
    if (message) {

      const messageData = {
        message: message,
        owner: nickSelected,
      }

      socket.emit('chat message', JSON.stringify(messageData));
      input.value = '';
    }
  });
}

const activateChatListen = () => {
  socket.on('chat message', function(messageDataStringfy) {
    const messageData = JSON.parse(messageDataStringfy);
    const message = messageData.message;
    const owner = messageData.owner;

    var item = document.createElement('li');
    item.textContent = `${owner}: ${message}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
}

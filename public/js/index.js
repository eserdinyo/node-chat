const socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
})

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {


    $("#messages").append(`
    <div class="message-box">
    <div class="message-time">${message.from}</div>
    <div class="message-content out">
      <p>
        ${message.text}
      </p>
    </div>
  </div>
    `);

    $('[name=message]').val("");
});

jQuery('#message-form').on('submit', (e) => {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val(),
    }, () => {

    })
})
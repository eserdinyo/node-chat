const socket = io();

function scroolToBottom() {
    //Selectors
    const messages = $("#messages");
    const newMessage = messages.children('li:last-child');
    // Heights
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scroolHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scroolHeight) {
        messages.scrollTop(scroolHeight);
    }
}

socket.on('connect', function () {
    console.log('Connected to server');
})

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    const template = $("#message-template").html();
    const formattedTime = moment(message.createdAt).format('h:mm a');

    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        time: formattedTime,
    });

    $("#messages").append(html);
    scroolToBottom();
});

socket.on('newLocationMsg', (message) => {
    const template = $("#location-template").html();
    const formattedTime = moment(message.createdAt).format('h:mm a');

    const html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        time: formattedTime,
    })

    $("#messages").append(html);
    scroolToBottom();

});

jQuery('#message-form').on('submit', (e) => {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val(),
    }, () => {

    })
});

const locationBtn = $("#send-location");

locationBtn.on("click", () => {
    if (!navigator.geolocation)
        return alert("Geolocation not supported by your browser");

    locationBtn.attr('disabled', 'disabled').text('Sending...');

    navigator.geolocation.getCurrentPosition((position) => {
        locationBtn.removeAttr('disabled').text('Send Location');

        socket.emit("createLocationMsg", {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        })
    }, () => {
        locationBtn.removeAttr('disabled').text('Send Location');
        alert("Unable to fetch location.");
    })

})

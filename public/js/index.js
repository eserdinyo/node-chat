const socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
})

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    let li = $("<li></li>");
    li.text(`${message.from}: ${message.text}`);
    $("#messages").append(li);

    $('[name=message]').val("");
});

socket.on('newLocationMsg', (message) => {
    let li = $("<li></li>");
    let a = $("<a class='location-link' target='_blank'>I'm here</a>")
    li.text(`${message.from}:`)
    a.attr('href', message.url);
    li.append(a);
    $("#messages").append(li);

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

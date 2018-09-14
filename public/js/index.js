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
            <div class="message-time">${message.createdAt}</div>
            <div class="message-content out">
            <p>
                ${message.text}
            </p>
            </div>
        </div>
    `);

    $('[name=message]').val("");
});

socket.on('newLocationMsg', (message) => {
    $("#messages").append(`
        <div class="message-box">
            <div class="message-time">${message.from}</div>
            <div class="message-content in">
            <a class="my-location" href="${message.url}" target="_blank">
                <img class="locaiton-img" src="./assets/location.png" alt="Location">
                I'm here.
            </a>
            </div>
        </div>
    `);
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
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit("createLocationMsg", {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        })
    }, () => {
        alert("Unable to fetch location.");
    })

})

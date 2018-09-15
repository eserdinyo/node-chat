const moment = require('moment');

// const date = moment();
// console.log(date.format('MMM do, YYYY'));


// console.log(date.format('h:mm a'));

const timeStamp = moment().valueOf();
console.log(timeStamp);

const date = moment(timeStamp);

console.log(date.format());

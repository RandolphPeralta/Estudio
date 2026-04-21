const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');

localStorage.setItem('username', 'JohnDoe');

const user = localStorage.getItem('username');
console.log(user); 

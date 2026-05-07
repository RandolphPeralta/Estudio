//XHR
const client = new XMLHttpRequest();

client.open("GET", "/robots.txt");    
client.send();

console.log(client.responseText);
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 1. Install prompt-sync: npm install prompt-sync
var promptSync = require("prompt-sync");
var prompt = promptSync();
// Take string input
var userName = prompt('What is your name? ');
console.log("Hello, ".concat(userName, "!"));
// Take numeric input and convert
var ageInput = prompt('How old are you? ');
var userAge = parseInt(ageInput);
if (!isNaN(userAge)) {
    console.log("You are ".concat(userAge, " years old."));
}
else {
    console.log('Invalid age entered.');
}

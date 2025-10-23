// 1. Install prompt-sync: npm install prompt-sync
import * as promptSync from 'prompt-sync';

const prompt = promptSync();

// Take string input
const userName: string = prompt('What is your name? ');
console.log(`Hello, ${userName}!`);

// Take numeric input and convert
//const ageInput: string = prompt('How old are you? ');
//const userAge: number = parseInt(ageInput);

//if (!isNaN(userAge)) {
//    console.log(`You are ${userAge} years old.`);
//} else {
//    console.log('Invalid age entered.');
//}
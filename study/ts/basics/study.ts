let age: string = "20";
let agmoths: number = 20;
let isSenio: boolean = true;
let person: Object = {};

let fruits: Object[] = ["manzana", "pra", {}]

let response: any = "Holaa";

response = 30;
response = true;
response = ["Hola", 123];

response.show();

function saludar(){
    console.log("Hola");
}

let response2:unknown;
response2 = true
if (response2){

} 

let response3 = null;
let response4 = undefined;

//combinacion de tipos
type ResponseTypeService = number | undefined;

let response5:  ResponseTypeService;
response5?.toString();

let responseProducts:  ResponseTypeService;
let responsePartners:  ResponseTypeService;

responsePartners?.toString().concat("");

// Type Assertion

let message: any = "";
let messageUpperCase = <string>message;
messageUpperCase.toUpperCase();

const canvas = <HTMLCanvasElement>document.getElementById("canvas");

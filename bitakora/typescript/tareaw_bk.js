"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
class Calculadora {
    sumar(num1, num2) {
        return num1 + num2;
    }
    restar(num1, num2) {
        return num1 - num2;
    }
    operacion(numero1, numero2) {
        const operacion = prompt("¿Qué operación desea: '+' o '-' ? ");
        if (operacion === '+') {
            return this.sumar(numero1, numero2);
        }
        else if (operacion === '-') {
            return this.restar(numero1, numero2);
        }
        else {
            return "La operación no es ni suma ni resta";
        }
    }
}
const numero1 = parseFloat(prompt("Ingrese su primer número: "));
const numero2 = parseFloat(prompt("Ingrese su segundo número: "));
const calculadora = new Calculadora();
console.log(calculadora.operacion(numero1, numero2));
//# sourceMappingURL=tareaw_bk.js.map
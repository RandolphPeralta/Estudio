var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Implementación simple del mensaje
var Mensaje = /** @class */ (function () {
    function Mensaje(contenido, destino) {
        this.contenido = contenido;
        this.destino = destino;
    }
    Mensaje.prototype.getContenido = function () {
        return this.contenido;
    };
    Mensaje.prototype.getDestino = function () {
        return this.destino;
    };
    return Mensaje;
}());
// =============================================================
// 2. Clase Logger (COMPOSICIÓN: usada por los notificadores)
// =============================================================
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.log = function (msg) {
        console.log("📝 LOG:", msg);
    };
    return Logger;
}());
// =============================================================
// 3. Clase abstracta Notificador (HERENCIA + POLIMORFISMO)
// =============================================================
var Notificador = /** @class */ (function () {
    function Notificador(logger) {
        this.logger = logger;
    }
    Notificador.prototype.registrarEnvio = function (mensaje) {
        this.logger.log("Mensaje enviado a ".concat(mensaje.getDestino(), " con contenido: \"").concat(mensaje.getContenido(), "\""));
    };
    return Notificador;
}());
// =============================================================
// 4. Clases concretas (POLIMORFISMO)
// =============================================================
var EmailNotificador = /** @class */ (function (_super) {
    __extends(EmailNotificador, _super);
    function EmailNotificador() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmailNotificador.prototype.enviar = function (mensaje) {
        console.log("\uD83D\uDCE7 Enviando Email a ".concat(mensaje.getDestino(), ": ").concat(mensaje.getContenido()));
        this.registrarEnvio(mensaje);
    };
    return EmailNotificador;
}(Notificador));
var SMSNotificador = /** @class */ (function (_super) {
    __extends(SMSNotificador, _super);
    function SMSNotificador() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SMSNotificador.prototype.enviar = function (mensaje) {
        console.log("\uD83D\uDCF1 Enviando SMS a ".concat(mensaje.getDestino(), ": ").concat(mensaje.getContenido()));
        this.registrarEnvio(mensaje);
    };
    return SMSNotificador;
}(Notificador));
var PushNotificador = /** @class */ (function (_super) {
    __extends(PushNotificador, _super);
    function PushNotificador() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PushNotificador.prototype.enviar = function (mensaje) {
        console.log("\uD83D\uDCF2 Enviando Notificaci\u00F3n Push a ".concat(mensaje.getDestino(), ": ").concat(mensaje.getContenido()));
        this.registrarEnvio(mensaje);
    };
    return PushNotificador;
}(Notificador));
// =============================================================
// 5. Programa principal (ejemplo de uso)
// =============================================================
var logger = new Logger();
var emailNotifier = new EmailNotificador(logger);
var smsNotifier = new SMSNotificador(logger);
var pushNotifier = new PushNotificador(logger);
var mensaje = new Mensaje("Hola, Randolph!", "Usuario123");
emailNotifier.enviar(mensaje);
smsNotifier.enviar(mensaje);
pushNotifier.enviar(mensaje);

// Se esta realizando la persistencia
var MemoryLocalStorage = /** @class */ (function () {
    function MemoryLocalStorage() {
    }
    MemoryLocalStorage.prototype.save = function (key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    };
    MemoryLocalStorage.prototype.load = function (key) {
        var raw = localStorage.getItem(key);
        if (!raw)
            return null;
        try {
            return JSON.parse(raw);
        }
        catch (_a) {
            return null; // datos corruptos
        }
    };
    MemoryLocalStorage.prototype.remove = function (key) {
        localStorage.removeItem(key);
    };
    return MemoryLocalStorage;
}());
var storage = new MemoryLocalStorage();
storage.save("users", { id: "1", name: "Randolph", role: "admin" });
var user = storage.load("users");
console.log(user);

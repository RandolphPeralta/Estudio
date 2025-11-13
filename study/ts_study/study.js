var Libro = /** @class */ (function () {
    function Libro(titulo, codigo, autor) {
        this.titulo = "";
        this.codigo = 0;
        this.autor = "";
        this.titulo = titulo;
        this.codigo = codigo;
        this.autor = autor;
    }
    return Libro;
}());
var libro = new Libro("Cien año de soledad", 1, "Gabriel Marquez");
console.log(libro);

console.log(nombre); // Muestra: undefined
var nombre = "Juan";
console.log(nombre); // Muestra: "Juan"

// Cómo lo interpreta JavaScript (fase de creación):
var nombre; // La declaración se eleva
console.log(nombre); 
nombre = "Juan"; // La asignación se queda en su sitio
console.log(nombre);

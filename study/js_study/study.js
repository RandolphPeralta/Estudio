//Incrementar a las variables

// var librosComprados = 105;
// console.log(librosComprados); // Inicialmente

// // Opcion 1

// librosComprados = librosComprados + 1
// console.log(librosComprados);

// // Opcion 2

// librosComprados++;
// console.log(librosComprados)

// // Reducir a las variables

// var numeroEstudiantes = 256;
// console.log(numeroEstudiantes);

// numeroEstudiantes = numeroEstudiantes - 1;
// console.log(numeroEstudiantes);

// numeroEstudiantes--;
// console.log(numeroEstudiantes);


// Asignacion de suma
// var a = 23;
// a += 5;
// console.log(a);

// Adiccion y resta
// var totalVentas = 13567.34;
// console.log(totalVentas);

// totalVentas += 345.67;
// // totalVentas -= 345.67;

// console.log(totalVentas)

//Multiplicacion
// var c = 23;

// c *= 2;

// console.log(c);

// var salario = 4500;

// console.log(salario);

// salario *= 5;

// console.log(salario);

//Asignacion de division
// var d = 39;

// d /= 3;

// console.log(d);

// var salario = 45000;
// console.log(salario);
// salario /= 2;
// console.log(salario);

// Variables con cadenas de caracteres

// var nombre = "Alan";
// var apellido = "Turing";

//Escapar comillas en cadenas de caracteres
// var miCadena = "Soy una cadena de caracteres con \"con comillas\" ";
// console.log(miCadena);

// Cadenas de caracteres con comillas simples
// var miMeta;
// miMeta = 'Aprender a programar con "freeCodeCamp" ';
// console.log(miMeta)

/* Secuencia de empate
 Código | Resultado
 ----------------------
 \' Comilla Simple
 \" Comilla Doble
 \\ Barra invertida
 \n Linea Nueva
 \r Retorno de Carro
 \t Tabulación
 \b Retroceso
 \f Salto de Página
 .......
*/

// console.log("Estoy aprendiendo \'javascript\' ")   //Comilla Simple
// console.log("Estoy aprendiendo  \"javascript\" ") //  \" Comilla Doble
// console.log("Estoy aprendiendo \\ javascript") // \\ Barra invertida
// console.log("Estoy aprndiendo \n javascript") // \n Linea nueva
// console.log("Estoy aprendiendo  \r javascript") // \r Retorno de Carro
// console.log("Estoy aprendiendo \t javascript") // \t Tabulación
// console.log("Estoy aprendiendo \b javascript") //  \b Retroceso
// console.log("Estoy aprendiendo \f javascript") // \f salto de pagina

// // Concatenar Cadenas de Caracteres
// var nombreCompleto = "Alan" + " " + "Turing";
// console.log(nombreCompleto);

// Construir cadenas con variables
// var verbo = "programar";
// var mensaje = "Estoy aprendiendo a " + verbo + "con freecodecamp";
// console.log(mensaje);

// Agregar variables a cadenas de caracteres
// var mensajeCompleto = "Estoy aprendiendo a programar ";
// var parteFinal = "con freecodecamp";

// console.log(mensajeCompleto);

// mensajeCompleto += parteFinal
// console.log(mensajeCompleto);

// Longitud de una cadena de caracteres
// var miCadena;
// miCadena = "¡Estoy aprendiendo a programar!";
// console.log(miCadena.length);

// Notacion de corchetes primer caracter
// var lenguajeDeProgramacion = "Javascript";
// /*
// Cadena: J a v a s c r i pt
// Inices: 0 1 2 3 4 56 7 8 9
// */
// console.log(lenguajeDeProgramacion[0]);

// // Inmutabilidad de Cadenas de Caracteres
// var miCadena = "Jola, mundo";
// console.log(miCadena);
// miCadena[0] = "H"; // Error: No es posible cambiar el caracter indiviual de un str

// Notacion de Corchetes: nésimo Carácter
// Cadena: J a v a s c r i pt
// Inices: 0 1 2 3 4 5 6 7 8 9

// var miCadena = "Javascript";
// //console.log(miCadena[0]);
// console.log(miCadena[1]); // Undefined
// No recibe numeros negativos o decimales en el indice de caracter del str
//.
//.
//.

// Notacion de Corchetes:
// Ultimo caracter
// var miCadena = "Python";
// /*
// El ultimo indice siempre es longitud - 1 porque comenzamos contrar desde 0
// */
// console.log(miCadena[miCadena.length - 1]);

// Notacion de corchetes de Derecha a Izquierda
var miCadena;
/* El penultimo ínice es longitud -2 
miCadena.length es 10. El penúltimo índice es 8
// Cadena: J a v a s c r i pt
// Inices: 0 1 2 3 4 5 6 7 8 9
*/
miCadena = "Javascript";
n = 4;
console.log(miCadena[miCadena.length - n]);

// Palabras en Blanco

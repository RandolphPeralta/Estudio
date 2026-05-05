// APUNTES DE TYPESCRIPT




// Toca consultar objetos, para investigar

// 1. Objetos Literales Tipados (Interfaces y Types)}
// Son la forma más común de definir estructuras de datos (como usuarios, productos, respuestas de API).
// Interfaces (interface): Se usan para definir la "forma" de un objeto. 
// Son ideales para estructuras que pueden extenderse.

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  activo?: boolean; 
}

// Alias de Tipo (type): Similares a las interfaces, 
// usados para definir la estructura de un objeto o combinaciones de tipos.

type Personaje = {
    id: number;
    usuario: Usuario;
}

// 2. Record Type (Record<Keys, Type>) Se utiliza para crear objetos tipo diccionario o mapa, 
// donde las claves (keys) y los valores (type) 
// tienen tipos específicos, ideal para mapeos dinámicos.

const roles: Record<string, number> = {
  admin: 1,
  user: 2,
};



function greet(person: { name: string; age: number }) {
  return "Hello " + person.name;
}
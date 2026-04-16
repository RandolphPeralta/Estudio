// CREAR MI PROPIO PROMPT CONVERTIDO EN ASK, 
// USANDO Promise 

// TOCA CREAR TU PROPIO TSCONFIG.TS PARA PODER USAR PROMISE

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    process.stdout.write(question);

    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    const listener = (data: string) => {
      process.stdin.pause();
      process.stdin.removeListener("data", listener);
      resolve(data.trim());
    };

    process.stdin.on("data", listener);
  });
}

async function main() {
  const nombre = await ask("Nombre: ");
  const edad = await ask("Edad: ");

  console.log(`Hola ${nombre}, tienes ${edad} años`);
  process.exit();
}

main();

export function Welcome (){
    return (
        <header>
            <h1>Hola mundo!</h1>
            <p>Hoy es {new Date().toLocaleDateString()}</p>
        </header>
    )
}
const express = require("express");
const app = express();
const port = 3127;

app.use(express.json())

let videojuegos = [
    {id: 1, titulo: "Red Dead Redemption2", precio: 200},
    {id:2, titulo: "Mafia", precio: 27}
];

app.get("/", (req, res) => 
{
    return res.json(videojuegos)
})

app.listen(port, ()=> {
    console.log("Servidor de node escuchando en http://localhost:"+port)
})
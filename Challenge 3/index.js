const http = require("http");

const host = "localhost";
const port = 8000;

class Usuario {
    constructor(id, firstname, lastname, age, country) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.country = country;
    }
}

class Error {
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}

const homero = new Usuario(1, "Homero", "Simspon", 39, "EEUU");
const marge = new Usuario(2, "Marge", "Simspon", 36, "EEUU");
const bart = new Usuario(3, "Bart", "Simspon", 11, "EEUU");
const lisa = new Usuario(4, "Lisa", "Simspon", 9, "EEUU");
const magui = new Usuario(5, "Magui", "Simspon", 1, "EEUU");

const usuarios = [homero, marge, bart, lisa, magui];

function findById(id) {
    for (usuario of usuarios) {
        if (usuario.id === id) {
            return usuario;
        }     
    }
    return new Error(404, "No existe usuario con id:" + id);
}

const requestListener = function(req, res) {
    res.setHeader("Content-Type", "application/json");
    let id = parseInt(req.url.slice(10));            
    switch (req.url) {
        case "/usuarios":
            res.writeHead(200);
            res.end(JSON.stringify(usuarios));
            break;
        case "/usuarios/" + id:
            res.writeHead(200);
            res.end(JSON.stringify(findById(id)));
            break;
        default:
            res.writeHead(404);
            res.end(JSON.stringify(new Error(404, "El recurso al que intenta acceder no existe.")));
    }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`El servidor se está ejecutando en http://${host}:${port}`);
});



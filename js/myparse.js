const textArea = document.querySelector('#text');
const form = document.querySelector('form');
let json;



// Escucho el evento submit del form, captura el contenido del textarea y se lo pasa como argumento al parseador.
form.addEventListener('submit', (e) => {
    e.preventDefault();    
    let text = textArea.value;
    json = parsear(text);
    window.confirm("El JSON ingresado ha sido parseado. Podrá acceder al objeto llamado 'json' en consola.")
});



/** Es la función principal del programa. Recibe una cadena y se la pasa como argumento a 
 * la funcion agregarClaves() para que comience el parseo. Finalizado el parseo se completan
 * los arreglos de llaves y valores que posteriormente se los pasa a la funcion inflarObjeto()
 * infle el objeto que finalmente se va a devolver.
 */
function parsear(text) {
    let respuesta = {}
    let arrayLlaves = [];
    let arrayValores = [];

    agregarClaves(text);
    inflarObjeto(arrayLlaves, arrayValores, respuesta) 

    /** Recibe una cadena con formato JSON. Lo recorre y en CADA iteracion extrae la clave, la guarda en el array
     * de claves y le pasa a la funcion agregarValores() un substring de la cadena inicial menos la seccion de
     * la cadena que ya fue procesada. 
     */
    function agregarClaves(text) {
        let t = text.substring(1, text.length - 1).trim().replace(/\n/g, "") + ","; // Quito llave inicial, final y espacios en los extremos. Tambien "\n" de todo el string.
        let index1 = 0; // Este indice va a ir marcando la posicion hasta donde ya se procesado la cadena.
        for (let i = 0; i < t.length; i++) {
            if (t[i] === ":" && i > index1) {
                let keyToAdd = t.substring(index1, i)
                arrayLlaves.push(keyToAdd.trim().replace(/"/g, "").replace(/'/g, ""));
                index1 = agregarValores(t.substring(i)) + i; // Muevo el indice a la posicion donde la cadena ya fue procesada por agregarValores().
            }
        }
    }

    /** Recibe la seccion de la cadena que falta procesar. Su funcion es guardar el primer valor que encuentre en el arreglo de valores. 
     * Una vez encontrada la clave, se la pasa a la funcion convertirTipo() para que esta le devuelva el valor con su tipo de dato correspodiente.
     */
    function agregarValores(t) {
        let llaves = 0;
        let corchetes = 0;
        let valueToAdd;
        let comillas = 0;
    
        for (let i = 0; i < t.length; i++) {
            if (t[i] === "{" || t[i] === "}") {
                llaves++;
            }
            if (t[i] === "[" || t[i] === "]") {
                corchetes++;
            }
            if (t[i] === '"') {
                comillas++;
            }
            if (t[i] === "," && esParOCero(llaves) && esParOCero(corchetes) && esParOCero(comillas)) {
                valueToAdd = t.substring(2, i).replace(/"/g, "'").trim();
                arrayValores.push(convertirTipo(valueToAdd));
                return i + 1;
            }
        }
    }
    return respuesta;
}

function inflarObjeto(claves, valores, objeto) {
    for (let i = 0; i < claves.length; i++) {
        objeto[claves[i]] = valores[i]
    }
}


function esParOCero(num) {
    return num == 0 || num % 2 == 0;
}

// Recibe una cadena, identifica a que tipo corresponde y hace la conversion de tipo correspondiente.
function convertirTipo(value) {
    if (parseFloat(value)) {
        return parseFloat(value);
    }
    switch (value[0]) {
        case "'":
            return value.replace(/'/g, "")
        case "t":
            return true;
        case "f":
            return false;
        case "n":
            return null; 
        case "{":
            return parsear(value);
        case "[":
            return crearArray(value);     
        default:
            break;
    }
}

// Recibe una cadena con formato de arreglo y devuelve un arreglo.
function crearArray(text) {
    let t = text.substring(1, text.length - 1).trim() + ",";
    
    let index1 = 0;
    let llaves = 0;
    let corchetes = 0;
    let elementoAAgregar;
    let result = [];

    for (let i = 0; i < t.length; i++) {
        if (t[i] === "{" || t[i] === "}") {
            llaves++;
        }
        if (t[i] === "[" || t[i] === "]") {
            corchetes++;
        }
        if (t[i] === "," && esParOCero(llaves) && esParOCero(corchetes)) {
            elementoAAgregar = t.substring(index1, i).trim();
            result.push(convertirTipo(elementoAAgregar));
            index1 = i + 1;
        }
    }
    return result;
}




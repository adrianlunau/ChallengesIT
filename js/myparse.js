const toParse1 = '{ "first_prop" : "Una cadena de texto", "second_prop" : 125.30, "third_prop" : [{"sub_prop_1" : "Descripción - 1", "sub_prop_2" : 200}, {"sub_prop_1" : "Descripción - 2", "sub_prop_2" : 100 }], "forth_prop" : true, "fifth_prop" : null }'

const json = {};
console.log(json);


let textArea = document.querySelector('#text');
let form = document.querySelector('form');


console.log(textArea);

let text;


form.addEventListener('submit', (e) => {
    e.preventDefault();
    text = textArea.value;
    crearObjeto(text);
});

let index1 = 0;
let index2 = 0;
let arrayKeys = [];
let arrayValues = [];




function addKeys(text) {
    let t = text.substring(1, text.length - 1).trim().replace(/\n/g, "") + ","; // Quito llave inicial, final y espacios en los extremos. Tambien "\n" de todo el string.
    index1 = 0;
    for (let i = 0; i < t.length; i++) {
        index2 = i;
        if (t[i] === ":" && i > index1) {
            let keyToAdd = t.substring(index1, index2)
            arrayKeys.push(keyToAdd.trim().replace(/"/g, ""));
            index1 = addValue(t.substring(i)) + index2;
        }
    }
    //console.log(arrayKeys);
    //console.log(arrayValues);
}

function addValue(t) {
    let llaves = 0;
    let corchetes = 0;
    let valueToAdd;

    for (let i = 0; i < t.length; i++) {
        if (t[i] === "{" || t[i] === "}") {
            llaves++;
        }
        if (t[i] === "[" || t[i] === "]") {
            corchetes++;
        }
        if (t[i] === "," && esPar(llaves) && esPar(corchetes)) {
            valueToAdd = t.substring(2, i).replace(/"/g, "'").trim();
            arrayValues.push(conversionDeTipo(valueToAdd));
            return i + 1;
        }
    }
}

function esPar(num) {
    return num == 0 || num % 2 == 0;
}

function conversionDeTipo(value) {
    if (parseFloat(value)) {
        return parseFloat(value);
    }
    switch (value[0]) {
        case "'":
            return value
        case "t":
            return true;
        case "f":
            return false;
        case "n":
            return null; 
        case "{":
            return value;
        case "[":
            return crearArray(value);     
        default:
            break;
    }
}

function crearArray(text) {
    let t = text.substring(1, text.length - 1).trim() + ",";
    index1 = 0;

    let llaves = 0;
    let corchetes = 0;
    let valueToAdd;
    let result = [];

    for (let i = 0; i < t.length; i++) {
        if (t[i] === "{" || t[i] === "}") {
            llaves++;
        }
        if (t[i] === "[" || t[i] === "]") {
            corchetes++;
        }
        if (t[i] === "," && esPar(llaves) && esPar(corchetes)) {
            valueToAdd = t.substring(index1, i).trim();
            result.push(conversionDeTipo(valueToAdd));
            index1 = i + 1;
        }
    }
    return result;

}

function crearObjeto(text) {
    addKeys(text);
    for (let i = 0; i < arrayKeys.length; i++) {
        json[arrayKeys[i]] = arrayValues[i]    
        //console.log(arrayKeys[i] + ":" + arrayValues[i]);
    }
    return json;
}



console.log("Puede hacer getUser() llamando a: \n- asyncAwait \n- promises \n- xmlHttpRequest  \n \nPuedo hacer getAlbums(id) llamando a: \n- asyncAwait\n- promises\n- xmlHttpRequest");


async function getUser(callback) {
    const url = "https://jsonplaceholder.typicode.com/users/"
    try {
        let respuesta = await callback(url);
        console.log(eliminarPropsIndeseadas(respuesta));
        
    } catch (error) {
        console.log(`Algo no resultó como se esperaba. ${error}`);
    }
}

async function getAlbums(id, callback) {
    const url = `https://jsonplaceholder.typicode.com/users/${id}/albums/`;
    try {
        let respuesta = await callback(url);
        console.log(respuesta);
        
    } catch (error) {
        console.log(`Algo no resultó como se esperaba. ${error}`);
    }
}

// FORMA 1: funcion async / await
async function asyncAwait(url) {
    const response = await fetch(url)
    const data = await response.json();
    return data;
}

// FORMA 2: promesas
function promises(url) {
    return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data;
        })
}

// FORMA 3: xmlHttpRequest 
function xmlHttpRequest(url) {
    let request = new XMLHttpRequest();

    request.open("GET", url, true);

    request.onload = function() {
        const data = JSON.parse(this.response);
        if(request.status >= 200 && request.status < 400) {
            console.log(data);
            return data;
        } else {
            return "No se pudo realizar la peticion web."
        }
    }
    request.send();
}

function eliminarPropsIndeseadas(arr) {
    let nuevoArray = []
    for (obj of arr) {
        // Extraigo solo las propiedades que SI voy a utilizar.
        const { address: { city, geo: {lng}, street, suite}, company, email, id, name, username, website } = obj

        // Creo una plantilla del objeto que quiero devolver, asigno los valores segun corresponda
        // y lo pusheo al array.
        const nuevoObjeto = {
            address: {
                city: city,
                geo: {
                    lng
                },
                street: street,
                suite: suite
            },
            company,
            email,
            id,
            name,
            username,
            website
        }
        nuevoArray.push(nuevoObjeto);        
    }    
    return nuevoArray;
}


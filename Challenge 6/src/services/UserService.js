export async function getUser(email, password) {
    let response = null;
    await fetch("http://localhost:3333/users")
        .then(response => response.json())
        .then(data => {
            response = data.find(user => user.email=== email.value && user.password === password.value )                 
                
            })  
           
        return response;
}

export function setUser(name, email, password) {
    return fetch("http://localhost:3333/users", 
    {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({ name, email, password })
    }).then(data => data.json())
}
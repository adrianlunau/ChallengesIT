export function getPost() {
    return fetch("http://localhost:3333/posts")
        .then(response => response.json())
}

export function setPost(title, content) {
    return fetch("http://localhost:3333/posts", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({title, content})
    })
    .then(data => data.json())
    .catch()
}
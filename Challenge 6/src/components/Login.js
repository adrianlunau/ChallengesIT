import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../services/UserService";
import "../styles/Login.css"

export default function Login() {

    // TODO: agregar hooks
    

    const [onLogin, setOnLogin] = useState(false);
    const [error, setError] = useState(false);


   async function handleSubmit(event) {
        event.preventDefault();
        setError(false);
        const {email, password} = event.target
        await getUser(email, password).then((user)=> {
            user ? setOnLogin(true) : setError(true)
        })
        
        // Si el usuario existe, redirijo a AllPost
        // Si el usuario no existe, doy un mensaje de error y me quedo en el login (se puede agregar un alerta)
    }

    return(
        <div className="wrapper-login">
            <h3>Por favor inicie sesión</h3>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="email">
                        <input name="email" type="email" placeholder="Escriba su dirección de correo"/>
                    </label>
                    <label htmlFor="password">
                        <input name="password" type="password" placeholder="Escriba su constraseña"/>
                    </label>
                </fieldset>
                {onLogin && <Navigate to="/AllPost" replace/>}
                {error && <p>Error de autenticación.</p>}
                <button>Ingresar</button>
            </form>
        </div>        
    )
}
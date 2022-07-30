import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../services/UserService";
import UserContext from "../contexts/UserContext";
import "../styles/Login.css"

export default function Login() {    

    const [onLogin, setOnLogin] = useState(false);
    const [error, setError] = useState(false);
    const {setUser} = useContext(UserContext);


   async function handleSubmit(event) {
        event.preventDefault();
        setError(false);
        const {email, password} = event.target
        await getUser(email, password).then((user)=> {
            if(user) {
                setOnLogin(true)
                setUser(user)
            } else {
                setError(true)
            }
        })
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
import React, { useState } from "react";
import { Navigate } from "react-router-dom"
import { setUser } from "../services/UserService";
import "../styles/Register.css"

export default function Register() {

    // Creamos aqui nuestros Hooks (useState) (ver la clase del martes)

    const [onRegister, setOnRegister] = useState(false);


    // TODO: 
    const handleSubmit = (event) => {
        event.preventDefault();
        const {target} = event;
        console.log(target);
        const { name, email, password } = target;

        console.log(name.value);
        setUser(name?.value, email?.value, password?.value).then((data) =>{
            setOnRegister(true)
        })
    }
    
    //verificar que me trae
    // puedo redirigirlo a login o (en este caso) podria directamente, una vez verificado el registro, a allPost ("poniendo en el 
    // contexto el nombre del usuario")
    return(
        <div className="wrapper-register">
            <h2>Por favor registrese aquí.</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="name">
                        <input name="name" type="text" placeholder="Escriba su nombre" className="register-input" required/>
                    </label>
                    <label htmlFor="email">
                        <input name="email" type="email" placeholder="Escriba su dirección de correo" className="register-input" required/>
                    </label>
                    <label htmlFor="password">
                        <input name="password" type="password" placeholder="Escriba su contraseña" className="register-input" required/>
                    </label>
                </fieldset>
                <button type="submit">Enviar</button>
                {onRegister && <Navigate to="/Login" replace/>}
            </form>
        </div>
    )
}
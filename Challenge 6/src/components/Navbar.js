import React, { useContext} from "react";
import '../styles/Navbar.css';
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function Navbar() {

    const {user} = useContext(UserContext);

    return (
        <div className="wrapper-navbar">
            <h2>Fabuloso Blog</h2>
            <div>
                <ul>
                    <li><Link to="/Login">Iniciar Sesión</Link></li>
                    <li><Link to="/Register">Registrarse</Link></li>
                    <li><Link to="/CreatePost">Escribir una historia</Link></li>
                </ul>
            </div>
            <p className="user-logged">Usuario: <span>{user.name}</span></p>
        </div>
    )
}
import React from "react";
import PropTypes from "prop-types";
import "../styles/CrearPost.css"

export default function CreatePost({ postTitle, postContent, savePost }) {

    return(
        <div className="wrapper-crearpost">
            <h2>Crear Historia</h2>
            <form onSubmit={savePost}>
                <fieldset>
                    <label>
                        <input type="text" placeholder="Escriba un titulo" required onChange={postTitle}/>
                        <textarea type="text" placeholder="Escriba una historia" required onChange={postContent}/>
                    </label>
                </fieldset>
                        <button type="submit">Guardar</button>
            </form>

        </div>
    )
}

CreatePost.propTypes = {
    postTitle: PropTypes.func,
    postContent: PropTypes.func,
    savePost: PropTypes.func
}
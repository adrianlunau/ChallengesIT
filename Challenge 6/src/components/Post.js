import React from "react";
import PropTypes from "prop-types";
import "../styles/Post.css"

export default function Post({ title, content }) {
    return(
        <div className="wrapper-post">
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
    )
}

Post.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string
}
import React from "react";
import "../styles/Home.css"

export default function Home() {
    return(
        <div className="wrapper-home">
            <div className="home-body">
                <img className="home-img" 
                    src="https://www.mediasource.mx/hubfs/blog-files/que-es-blog.jpg"
                    alt="bienvenido"
                    width="650px"/>
            </div>
            <div className="home-title">
                <h1>Bienvenidos a mi Blog</h1>
            </div>
        </div>
    )
}
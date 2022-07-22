import React, { useContext } from "react";
import { createUseStyles } from "react-jss";
import UserContext from "../User/User";


const useStyles = createUseStyles({
    wrapper:{
        margin: [20, 0],
        borderBottom: "black solid 1px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around"
    }
});

export default function Header() {
    const user = useContext(UserContext)
    const classes = useStyles();

    return(
        <div className={classes.wrapper}>
            <div><img className="logo" src={__dirname + "images/logo.png" }></img></div>
            <div>Bienvenido {user.name}</div>
        </div>
    )
}
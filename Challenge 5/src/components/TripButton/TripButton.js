import React from "react";
import PropTypes from 'prop-types';
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    button: {
        display: "block",
        background: "none",
        borderRadius: 5,
        padding: 15,
    },

})

export default function TripButton({name, action}) {
    const classes = useStyles()

    return (
        <>
        <button className={classes.button} onClick= {()=> action(name)}>{name}</button>
        </>
    )
}

TripButton.propTypes = {
    name: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
}
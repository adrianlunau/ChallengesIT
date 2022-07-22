import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { createUseStyles } from "react-jss";
import TripButton from "../TripButton/TripButton";
import { TripContext } from "../TripMaker/TripMaker";


const useStyles = createUseStyles({
    wrapper: {
        border: "lightgrey solid 1px",
        margin: 20,
        padding: 10,
        position: "relative",
        textAlign: "center",
        width: 300,
    },
    image: {
        width: 300
    },
    buttonWrapper: {
        display: "flex",
        justifyContent: "center",
    }

})

const currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}

export default function TripItem({ image, name, description, price, button }) {
    const classes = useStyles();
    const { setTrips } = useContext(TripContext);

    function getTotal(total) {
        return total.toLocaleString(undefined, currencyOptions);
    }

    return (
        <div>
        <div className={classes.wrapper}>
            <img className={classes.image} src={image} alt={name} aria-label={name}></img>
            <h3>{name}</h3>
            <p>{description}</p>
            <span>$ {getTotal(price)}</span>
        </div>
            <div  className={classes.buttonWrapper}><TripButton name={button} action={setTrips}/></div>
        </div>
    )
}

TripItem.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    button: PropTypes.string.isRequired
}
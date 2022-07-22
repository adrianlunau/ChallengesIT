import React from "react";
import { createUseStyles } from "react-jss";
import TripItem from "../TripItem/TripItem";
import {trips} from "../data/data"

const useStyles = createUseStyles({
    wrapper: {
        display: "flex",
        flexWrap: "wrap",
        padding: [10, 50],
        justifyContent: "center",
    },

});

export default function TripBuilder() {
    const classes = useStyles();

    return(
        <div className={classes.wrapper}>
            {trips.map((trip) => (
                <TripItem 
                key={trip.name}
                image={__dirname + "images/" + trip.image}
                name={trip.name}
                description={trip.description}
                price={trip.price}
                button={trip.button}/>
            ))}
        </div>
    )
}
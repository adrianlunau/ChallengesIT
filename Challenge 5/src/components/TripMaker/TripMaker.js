import React, { useReducer, createContext } from "react";
import { createUseStyles } from "react-jss";
import TripBuilder from "../TripBuilder/TripBuilder";
import TripButton from "../TripButton/TripButton";
import TripSummary from "../TripSummary/TripSummary";


const useStyles = createUseStyles({
    wrapper: {
    },
    cancel: {
        width: "90%",
        display: "flex",
        justifyContent: "flex-end"
    }
});

export const TripContext = createContext();

function sendMail(action) {
    switch (action) {
        case "reservar":
            console.log("Se reservo su viaje a la nieve.");
            return;
        case "comprar":
            console.log("Compro un viaje a la ciudad.");
            return;
        case "cancelarCompra":
            console.log("Su ultima compra ha sido cancelada.");
            return;
        case "cancelarReserva":
            console.log("Su reserva ha sido cancelada.");
            return;
        default:
            return;
    }
}

let ultimaOperacion = "";

function reducer(state, action) {
    switch(action) {
        case "promo":
            ultimaOperacion = "promo"
            return [...state, "Playa"]
        case "reservar":
            ultimaOperacion = "reservar"
            sendMail(action);
            return state;
        case "comprar":
            ultimaOperacion = "comprar"
            sendMail(action);
            return [...state, "Ciudad"]

        case "cancelar":
            const carro = [...state];
            const ultimo = carro[carro.length-1]
            if(ultimaOperacion === "promo") {
                console.log("No puede cancelar una promoción.");
                return state;
            }
            if (ultimaOperacion === "reservar") {
                ultimaOperacion = "cancelar"
                sendMail("cancelarReserva");
                return state;
            }
            if (ultimaOperacion === "comprar" && ultimo==="Ciudad") {
                sendMail("cancelarCompra");
                carro.pop();
                //ultimaOperacion = "cancelar"
                return carro;
            }
            if (ultimaOperacion === "cancelar") {
                console.log("No puede realizar mas de una cancelacion de forma consecutiva.");
                return carro;
            }
            return carro;
        default:
            return state;
    }
}

export default function TripMaker() {
    const classes = useStyles()
    const [trips, setTrips] = useReducer(reducer, [])

    return(
        <div className={classes.wrapper}>
            <TripContext.Provider value={{ trips, setTrips }}>
                <div className={classes.cancel}>
                <TripButton name="cancelar" action={() => setTrips("cancelar")}/>
                </div>

                <TripBuilder/>
                <TripSummary/>
            </TripContext.Provider>
        </div>
    )
}
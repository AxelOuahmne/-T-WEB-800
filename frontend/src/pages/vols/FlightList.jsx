import React from "react";

const FlightList = ({ flights }) => {
    return (
        <div>
            <h2>Liste des vols disponibles :</h2>
            <ul>
                {flights.map((flight, index) => (
                    <li key={index}>
                        <p>Vols de {flight.origin} à {flight.destination}</p>
                        <p>Départ : {flight.departureDate}</p>
                        <p>Retour : {flight.returnDate}</p>
                        <p>Prix : {flight.price}</p>
                        {/* Ajoutez d'autres détails du vol ici */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FlightList;

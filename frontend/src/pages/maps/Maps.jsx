import React, { useState } from 'react';
import { Box } from "@mui/material";
import { GoogleMap, LoadScript, Autocomplete, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '800px',
    height: '600px'
};

const center = {
    lat: 48.8566, // Latitude de Paris
    lng: 2.3522    // Longitude de Paris
};

const Maps = () => {
    const [destination, setDestination] = useState("");
    const [startLocation, setStartLocation] = useState(null);
    const [endLocation, setEndLocation] = useState(null);
    const [directions, setDirections] = useState(null);

    const handlePlaceSelect = (place) => {
        console.log('Adresse sélectionnée:', place);
        setDestination(place.formatted_address);
    };

    const handleMapClick = (e) => {
        console.log('Coordonnées du clic:', e.latLng);
        setEndLocation({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        });
    };

    const onDirectionsLoad = (directions) => {
        console.log('Directions:', directions);
        setDirections(directions);
    };

    return (
        <Box>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    onClick={handleMapClick}
                >
                    {/* Champ de recherche d'adresse pour la destination */}
                    <Autocomplete
                        onLoad={handlePlaceSelect}
                        options={{ types: ['geocode'] }}
                    >
                        <input
                            placeholder="Rechercher une adresse ..."
                            type="text"
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `32px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                position: "absolute",
                                left: "50%",
                                marginLeft: "-120px",
                                marginTop: "10px"
                            }}
                        />
                    </Autocomplete>

                    {/* Affichage du marqueur pour le point de départ */}
                    {startLocation && <Marker position={startLocation} />}

                    {/* Affichage du marqueur pour le point d'arrivée */}
                    {endLocation && <Marker position={endLocation} />}

                    {/* Affichage du trajet */}
                    {directions && <DirectionsRenderer directions={directions} onLoad={onDirectionsLoad} />}
                </GoogleMap>
        </Box>
    );
};

export default Maps;

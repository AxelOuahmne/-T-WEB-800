import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Box, alpha } from "@mui/material";
import styled from "@emotion/styled";
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const Hotels = () => {
    const [destination, setDestination] = useState("");
    const [arrivalDate, setArrivalDate] = useState(null);
    const [departureDate, setDepartureDate] = useState(null);

    useEffect(() => {
        const handlePlaceSelect = () => {
            const selectedPlace = autocomplete.getPlace();
            console.log('Adresse sélectionnée:', selectedPlace);
            setDestination(selectedPlace.formatted_address);
        };

        const autocomplete = new window.google.maps.places.Autocomplete(
            document.getElementById('autocomplete'),
            { types: ['geocode','establishment'] }
        );

        autocomplete.addListener('place_changed', handlePlaceSelect);
    }, []);

    const handleSearch = () => {
        // Effectuer la requête POST vers le backend avec les données des champs
        fetch('http://localhost:3000/api/sleep2', { // Ajoutez le protocole (http://) devant localhost
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                location: destination,
                arrivalDate: arrivalDate,
                departureDate: departureDate,
            }),
        })
            .then(response => {
                response.json().then(data => {
                    console.log('Requête POST envoyée avec succès :', data.data);});
                if (!response.ok) {
                    throw new Error('La requête a échoué.');
                }
                // Gérer la réponse si nécessaire
            })
            .catch(error => {
                console.error('Erreur lors de la requête POST:', error);
                // Gérer les erreurs si nécessaire
            });
    };

    return (
        <Box>
            <h1>Où voulez-vous séjourner ?</h1>
            <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                {/* Premier champ */}
                <Search style={{ width: "600px", display: "flex", alignItems: "center", padding: "5px 0px" }}>
                    <input
                        id="autocomplete"
                        placeholder="Choisir sa destination ..."
                        type="text"
                        aria-label="search"
                        className="searchName"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        style={{ width: "100%" }} // Ajustez la largeur de l'input
                    />
                </Search>
                <Box sx={{ width: "400px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date d'arrivée"
                            sx={{ width: "400px" }}
                            value={arrivalDate}
                            onChange={(date) => setArrivalDate(date)}
                        />
                    </LocalizationProvider>
                </Box>
                <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date de départ"
                            sx={{ width: "400px" }}
                            value={departureDate}
                            onChange={(date) => setDepartureDate(date)}
                        />
                    </LocalizationProvider>
                </Box>
                {/* Bouton Rechercher */}
                <Button variant="contained" onClick={handleSearch}>Rechercher</Button>
            </Box>
        </Box>
    );
};

export default Hotels;

import React from 'react';
import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Box, alpha, Stack, Grid, TextField } from "@mui/material";
import styled from "@emotion/styled";
import RecipeReviewCard from './RecipeReviewCard';
// import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

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
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const handlePlaceSelect = () => {
            const selectedPlace = autocomplete.getPlace();
            console.log('Adresse sélectionnée:', selectedPlace);
            setDestination(selectedPlace.formatted_address);
        };

        const autocomplete = new window.google.maps.places.Autocomplete(
            document.getElementById('autocomplete'),
            { types: ['geocode', 'establishment'] }
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
                    console.log('Requête POST envoyée avec succès :', data.data);
                    setSearchResults(data.data);
                });

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
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Search>
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
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date d'arrivée"
                            sx={{ width: "100%" }}
                            value={arrivalDate}
                            onChange={(date) => setArrivalDate(date)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date de départ"
                            sx={{ width: "100%" }}
                            value={departureDate}
                            onChange={(date) => setDepartureDate(date)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Button variant="contained" onClick={handleSearch} fullWidth>Rechercher</Button>
                </Grid>
            </Grid>

            <Box sx={{ marginTop: "70px" }}>
                <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap" sx={{ marginTop: "30px" }}>
                    {searchResults.map((result, index) => (
                        <div key={index}>
                            <RecipeReviewCard hotel={result} />
                        </div>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
};

export default Hotels;

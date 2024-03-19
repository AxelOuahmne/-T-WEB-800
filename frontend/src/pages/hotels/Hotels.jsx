import styled from "@emotion/styled";
import { Box, alpha, Button } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";

// Le reste du code reste inchangé...

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

    const [originIata, setOriginIata] = useState('');
    const [destinationIata, setDestinationIata] = useState('');

    useEffect(() => {
        // Fonction d'autocomplétion pour le champ de destination
        $('.destinationSearch').autocomplete({
            source: function(req, res) {
                $.ajax({
                    url: "http://localhost:3000/api/airport",
                    dataType: "json",
                    type: "GET",
                    data: req,
                    success: function(data) {
                        res($.map(data, function(el) {
                            return {
                                label: el.address.cityName + ' (' + el.iataCode + ')',
                                value: el.iataCode
                            };
                        }));
                    },
                    error: function(err) {
                        console.log(err.status);
                    }
                });
            },
            select: function(event, ui) {
                const selectedIata = ui.item.value;
                console.log('Code IATA sélectionné (Destination):', selectedIata);
                setDestinationIata(selectedIata);
            }
        });
    }, []); // Utilisez un tableau vide pour exécuter useEffect une seule fois lors du montage

    const handleSearch = () => {
        // Effectuer la requête POST vers le backend avec les données des champs
        fetch('http://localhost:3000/api/sleep', { // Ajoutez le protocole (http://) devant localhost
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                destination: destination,
                arrivalDate: arrivalDate,
                departureDate: departureDate,
            }),
        })
            .then(response => {
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
                <Search style={{ width: "400px", display: "flex", alignItems: "center", padding: "5px 0px" }}>
                    <input
                        placeholder="Choisir sa destination ..."
                        type="text"
                        aria-label="search"
                        className="searchName destinationSearch"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
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
}

export default Hotels;

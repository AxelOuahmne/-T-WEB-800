import styled from "@emotion/styled";
import { Box, alpha } from "@mui/material";
import FlightIcon from '@mui/icons-material/Flight';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { formatISO } from 'date-fns';
import FlightList from './FlightList';

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

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const Vols = () => {
    const [originIata, setOriginIata] = useState(''); // État pour stocker le code IATA de l'origine
    const [destinationIata, setDestinationIata] = useState(''); // État pour stocker le code IATA de la destination
    const [departureDate, setDepartureDate] = useState(null); // État pour stocker la date de départ
    const [returnDate, setReturnDate] = useState(null); // État pour stocker la date de retour
    const [numberOfAdults, setNumberOfAdults] = useState(1); // État pour stocker le nombre de voyageurs adultes
    const [flightResults, setFlightResults] = useState([]);

    useEffect(() => {
        // Fonction d'autocomplétion pour le champ d'origine
        $('.originSearch').autocomplete({
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
                console.log('Code IATA sélectionné (Origine):', selectedIata);
                setOriginIata(selectedIata);
            }
        });

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
        const formattedDepartureDate = departureDate ? formatISO(new Date(departureDate)).split('T')[0] : '';
        const formattedReturnDate = returnDate ? formatISO(new Date(returnDate)).split('T')[0] : '';

        console.log('Origine:', originIata);
        console.log('Destination:', destinationIata);
        console.log('Date de départ sélectionnée:', formattedDepartureDate);
        console.log('Date de retour sélectionnée:', formattedReturnDate);
        console.log('Nombre de voyageurs adultes:', numberOfAdults);

        // Effectuer la requête POST vers le backend avec les données des champs
        fetch('http://localhost:3000/api/travel', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                originLocationCode: originIata,
                destinationLocationCode: destinationIata,
                departureDate: formattedDepartureDate,
                returnDate: formattedReturnDate,
                adults: numberOfAdults
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Réponse du back-end:", data);
                setFlightResults(data);
            })
            .catch(error => {
                console.error("Erreur lors de l'envoi des données au back-end:", error);
            });
    };

    return (
        <Box>
            <h1>Où voulez-vous partir ?</h1>
            <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                <Search style={{ width: "400px", display: "flex", alignItems: "center", padding: "5px 0px" }}>
                    <SearchIconWrapper>
                        <FlightIcon />
                    </SearchIconWrapper>
                    <input
                        placeholder="De ..."
                        type="text"
                        aria-label="search"
                        value={originIata}
                        onChange={(e) => setOriginIata(e.target.value)}
                        className="originSearch"
                    />
                </Search>
                <Search style={{ width: "400px", display: "flex", alignItems: "center", padding: "5px 0px" }}>
                    <SearchIconWrapper>
                        <FlightIcon />
                    </SearchIconWrapper>
                    <input
                        placeholder="À ..."
                        type="text"
                        aria-label="search"
                        value={destinationIata}
                        onChange={(e) => setDestinationIata(e.target.value)}
                        className="destinationSearch"
                    />
                </Search>
                <SyncAltIcon sx={{ fontSize: "40px" }} />
                <Box sx={{ width: "400px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date de départ" sx={{ width: "400px" }}
                            value={departureDate}
                            onChange={(date) => setDepartureDate(date)}
                        />
                    </LocalizationProvider>
                </Box>
                <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date de retour" sx={{ width: "400px" }}
                            value={returnDate}
                            onChange={(date) => setReturnDate(date)}
                        />
                    </LocalizationProvider>
                </Box>
                <Box>
                    <label htmlFor="numberOfAdults">Nombre de voyageurs adultes :</label>
                    <input
                        id="numberOfAdults"
                        type="number"
                        min="1"
                        max="9"
                        value={numberOfAdults}
                        onChange={(e) => setNumberOfAdults(parseInt(e.target.value))}
                    />
                </Box>
                <Button variant="contained" onClick={handleSearch}>Rechercher</Button>
            </Box>
            {console.log((flightResults.data))}
            <Box sx={{ marginTop: "20px" }}>
                {flightResults && flightResults.data ? (
                    flightResults.data.map((flight, index) => (
                        <p key={index}>{flight.id}</p>
                    ))
                ) : (
                    <p>Les résultats de vol sont indisponibles.</p>
                )}
            </Box>




        </Box>
    );
}

export default Vols;

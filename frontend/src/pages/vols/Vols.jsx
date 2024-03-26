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
<<<<<<< HEAD
import axios from 'axios'; 
import TextField from '@mui/material/TextField';
import ComboBox from "./ComboBox";

=======
import FlightList from './FlightList';
>>>>>>> 17841222c410532c23d495e4c8a648b7e8b5dd2a

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
    const [originIata, setOriginIata] = useState('');
    const [destinationIata, setDestinationIata] = useState('');
    const [departureDate, setDepartureDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [numberOfAdults, setNumberOfAdults] = useState(1);
    const [flightResults, setFlightResults] = useState([]);

    // const handleSearch = () => {
    //     const formattedDepartureDate = departureDate ? formatISO(new Date(departureDate)).split('T')[0] : '';
    //     const formattedReturnDate = returnDate ? formatISO(new Date(returnDate)).split('T')[0] : '';

    //     console.log('Origine:', originIata);
    //     console.log('Destination:', destinationIata);
    //     console.log('Date de départ sélectionnée:', formattedDepartureDate);
    //     console.log('Date de retour sélectionnée:', formattedReturnDate);
    //     console.log('Nombre de voyageurs adultes:', numberOfAdults);

    //     // Effectuer la requête POST vers le backend avec les données des champs
    //     fetch('http://localhost:3000/api/travel', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             originLocationCode: originIata,
    //             destinationLocationCode: destinationIata,
    //             departureDate: formattedDepartureDate,
    //             returnDate: formattedReturnDate,
    //             adults: numberOfAdults
    //         })
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log("Réponse du back-end:", data);
    //             setFlightResults(data);
    //         })
    //         .catch(error => {
    //             console.error("Erreur lors de l'envoi des données au back-end:", error);
    //         });
    // };
    const handleSearch = () => {
        const formattedDepartureDate = departureDate ? formatISO(new Date(departureDate)).split('T')[0] : '';
        const formattedReturnDate = returnDate ? formatISO(new Date(returnDate)).split('T')[0] : '';
    
        console.log('Données à envoyer :', {
            originLocationCode: originIata,
            destinationLocationCode: destinationIata,
            departureDate: formattedDepartureDate,
            returnDate: formattedReturnDate,
            adults: numberOfAdults
        });
    
        // Effectuer la requête POST vers le backend avec les données des champs en utilisant Axios
        axios.post('http://localhost:3000/api/travel', {
            originLocationCode: originIata,
            destinationLocationCode: destinationIata,
            departureDate: formattedDepartureDate,
            returnDate: formattedReturnDate,
            adults: numberOfAdults
        })
        .then(response => {
            console.log("Réponse du back-end:", response.data);
            setFlightResults(response.data);
        })
        .catch(error => {
            console.log("originIata axel",originIata)
            console.log("destinationIata axel",destinationIata)
            console.error("Erreur lors de l'envoi des données au back-end:", error);
        });
    };
    return (
        <Box>
{
console.log((flightResults.data))



}
            <h1>Où voulez-vous partir ?</h1>

            <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" , alignItems:"center"}}>
                <ComboBox dis={originIata} setDis={setOriginIata} style={{ width: "400px", display: "flex", alignItems: "center", padding: "5px 0px" }} />
                <SyncAltIcon sx={{ fontSize: "40px" }} />
                <ComboBox dis={destinationIata} setDis={setDestinationIata} style={{ width: "400px", display: "flex", alignItems: "center", padding: "5px 0px" }} />

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
                <TextField
          id="outlined-number"
          label="Nombre de voyageurs adultes :"
          type="number"
          InputProps={{ inputProps: { min: 1, max: 10 } }}
          value={numberOfAdults}
          onChange={(e) => setNumberOfAdults(parseInt(e.target.value))}
          InputLabelProps={{
            shrink: true,
          }}
        />
                    {/* <label htmlFor="numberOfAdults"></label>
                    <input
                        id="numberOfAdults"
                        type="number"
                        value={numberOfAdults}
                        onChange={(e) => setNumberOfAdults(parseInt(e.target.value))}
                    /> */}
                </Box>
                <Button variant="outlined" onClick={handleSearch} style={{padding:"10px"}}>Rechercher</Button>
                

            </Box>

        </Box>
    );
}

export default Vols;

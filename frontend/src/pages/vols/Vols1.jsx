import styled from "@emotion/styled";
import { Box, alpha, Grid, TextField, Typography, Button, Modal } from "@mui/material";
import FlightIcon from '@mui/icons-material/Flight';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import LuggageIcon from '@mui/icons-material/Luggage';
import BadgeIcon from '@mui/icons-material/Badge';
import PaymentIcon from '@mui/icons-material/Payment';
import axios from 'axios';
import { formatISO } from 'date-fns';
import Card from '@mui/material/Card';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";


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

const Vols1 = () => {
    const [originIata, setOriginIata] = useState('');
    const [destinationIata, setDestinationIata] = useState('');
    const [departureDate, setDepartureDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [numberOfAdults, setNumberOfAdults] = useState(1);
    const [flightResults, setFlightResults] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFlightIndex, setSelectedFlightIndex] = useState(null);

    const convertirDuree = (dureeISO) => {
        const regex = /PT(\d+)H(\d+)M/;
        const match = dureeISO.match(regex);
        if (match) {
            const heures = parseInt(match[1]);
            const minutes = parseInt(match[2]);
            return `${heures} heures ${minutes} minutes`;
        }
        return '';
    };

    useEffect(() => {
        $('.originSearch').autocomplete({
            source: function (req, res) {
                $.ajax({
                    url: "http://localhost:3000/api/airport",
                    dataType: "json",
                    type: "GET",
                    data: req,
                    success: function (data) {
                        res($.map(data, function (el) {
                            return {
                                label: el.address.cityName + ' (' + el.iataCode + ')',
                                value: el.iataCode
                            };
                        }));
                    },
                    error: function (err) {
                        console.log(err.status);
                    }
                });
            },
            select: function (event, ui) {
                const selectedIata = ui.item.value;
                console.log('Code IATA sélectionné (Origine):', selectedIata);
                setOriginIata(selectedIata);
            }
        });

        $('.destinationSearch').autocomplete({
            source: function (req, res) {
                $.ajax({
                    url: "http://localhost:3000/api/airport",
                    dataType: "json",
                    type: "GET",
                    data: req,
                    success: function (data) {
                        res($.map(data, function (el) {
                            return {
                                label: el.address.cityName + ' (' + el.iataCode + ')',
                                value: el.iataCode
                            };
                        }));
                    },
                    error: function (err) {
                        console.log(err.status);
                    }
                });
            },
            select: function (event, ui) {
                const selectedIata = ui.item.value;
                console.log('Code IATA sélectionné (Destination):', selectedIata);
                setDestinationIata(selectedIata);
            }
        });
    }, []);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSearch = () => {
        const formattedDepartureDate = departureDate ? formatISO(new Date(departureDate)).split('T')[0] : '';
        const formattedReturnDate = returnDate ? formatISO(new Date(returnDate)).split('T')[0] : '';

        console.log('Origine:', originIata);
        console.log('Destination:', destinationIata);
        console.log('Date de départ sélectionnée:', formattedDepartureDate);
        console.log('Date de retour sélectionnée:', formattedReturnDate);
        console.log('Nombre de voyageurs adultes:', numberOfAdults);

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
                console.error("Erreur lors de l'envoi des données au back-end:", error);
            });
    };

    const handleChooseFlight = (index) => {
        setSelectedFlightIndex(index);
        openModal();
    };

    const handleConfirmReservation = () => {
        console.log("Réservation confirmée pour le vol:", selectedFlightIndex);
        closeModal();

        const doc = new jsPDF();
        const element = document.getElementById(`flight-details-${selectedFlightIndex}`);

        html2canvas(element).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            doc.addImage(imgData, "PNG", 0, 0);
            doc.save("flight-details.pdf");
        });
    };

    return (
        <Box sx={{ padding: "20px" }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Où voulez-vous partir ?
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={4}>
                    <Search>
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
                            style={{ width: "100%", padding: "10px" }}
                        />
                    </Search>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Search>
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
                            style={{ width: "100%", padding: "10px" }}
                        />
                    </Search>
                </Grid>
                <Grid item xs={12} md={4} container justifyContent="center">
                    <SyncAltIcon sx={{ fontSize: "40px", alignSelf: "center" }} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date de départ"
                            value={departureDate}
                            onChange={(date) => setDepartureDate(date)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date de retour"
                            value={returnDate}
                            onChange={(date) => setReturnDate(date)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        id="outlined-number"
                        label="Nombre de voyageurs adultes"
                        type="number"
                        InputProps={{ inputProps: { min: 1, max: 10 } }}
                        value={numberOfAdults}
                        onChange={(e) => setNumberOfAdults(parseInt(e.target.value))}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={4} container justifyContent="center">
                    <Button variant="contained" onClick={handleSearch} fullWidth>
                        Valider
                    </Button>
                </Grid>
            </Grid>
            <Box sx={{ marginTop: "20px" }}>
                {flightResults && flightResults.data ? (
                    flightResults.data.map((flight, index) => (
                        <Card key={index} id={`flight-details-${index}`} sx={{ marginBottom: "20px", padding: "20px" }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={10}>
                                    <Box>
                                        <Typography variant="body1">
                                            Aéroport de départ : {flight.itineraries[0].segments[0].departure.iataCode}
                                        </Typography>
                                        <Typography variant="body1">
                                            Aéroport d'arrivée : {flight.itineraries[0].segments[0].arrival.iataCode}
                                        </Typography>
                                        <Typography variant="body1">
                                            Date de départ : {new Date(flight.itineraries[0].segments[0].departure.at).toLocaleDateString()}
                                        </Typography>
                                        <Typography variant="body1">
                                            Date d'arrivée : {new Date(flight.itineraries[flight.itineraries.length - 1].segments[flight.itineraries[flight.itineraries.length - 1].segments.length - 1].arrival.at).toLocaleDateString()}
                                        </Typography>
                                        {flight.itineraries.map((itinerary, i) => (
                                            <Box key={i} sx={{ marginTop: "10px" }}>
                                                <Typography variant="body2">
                                                    {i === 0 ? "Aller" : "Retour"}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Heure de départ : {itinerary.segments[0].departure.at.split('T')[1]}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Heure d'arrivée : {itinerary.segments[itinerary.segments.length - 1].arrival.at.split('T')[1]}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={2} container alignItems="center" direction="column">
                                    <Box sx={{ textAlign: "center" }}>
                                        <BadgeIcon />
                                        <LuggageIcon />
                                        <PaymentIcon />
                                    </Box>
                                    <Typography variant="h6" sx={{ marginTop: "10px" }}>
                                        {flight.price.total} {flight.price.currency}
                                    </Typography>
                                    <Button variant="contained" color="warning" sx={{ marginTop: "10px" }} onClick={() => handleChooseFlight(index)}>
                                        Choisir
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>
                    ))
                ) : (
                    <Typography variant="body1">
                        Les résultats de vol sont indisponibles.
                    </Typography>
                )}
            </Box>
            <Modal
                open={modalOpen}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Êtes-vous sûr de bien vouloir réserver ce vol ?
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                        <Button onClick={handleConfirmReservation} variant="contained" color="primary">
                            Oui
                        </Button>
                        <Button onClick={closeModal} variant="contained" color="error">
                            Non
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

export default Vols1;

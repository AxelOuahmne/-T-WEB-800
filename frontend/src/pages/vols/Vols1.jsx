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
import LuggageIcon from '@mui/icons-material/Luggage';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import BadgeIcon from '@mui/icons-material/Badge';
import PaymentIcon from '@mui/icons-material/Payment';
import Typography from '@mui/joy/Typography';
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
    const convertirDuree = (dureeISO) => {
        // Regex pour extraire les heures et les minutes de la durée ISO 8601
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
        // Fonction d'autocomplétion pour le champ d'origine
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

        // Fonction d'autocomplétion pour le champ de destination
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
                        <>
                            <Grid key={index} container spacing={2} sx={{ width: "60%", margin: "10px auto", borderRadius: "15px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                                <Grid item xs={10} sx={{ borderRight: 1, padding: "50px 0px" }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", padding: "20px 20px 0px 20px" }}>
                                        <Box sx={{ display: "flex", justifyContent: " space-between" }}>
                                            <p>Aéroport de départ : {flight.itineraries[0].segments[0].departure.iataCode}</p>
                                            <p>Aéroport d'arrivée : {flight.itineraries[0].segments[0].arrival.iataCode}</p>
                                            <p>Date de départ : {new Date(flight.itineraries[0].segments[0].departure.at).toLocaleDateString()}</p>
                                            <p>Date d'arrivée : {new Date(flight.itineraries[flight.itineraries.length - 1].segments[flight.itineraries[flight.itineraries.length - 1].segments.length - 1].arrival.at).toLocaleDateString()}</p>

                                            {flight.itineraries.map((itinerary, i) => (
                                                <div key={i}>
                                                    <p>{i === 0 ? "Aller" : "Retour"}</p>
                                                    <p>Heure de départ : {itinerary.segments[0].departure.at.split('T')[1]}</p>
                                                    <p>Heure d'arrivée : {itinerary.segments[itinerary.segments.length - 1].arrival.at.split('T')[1]}</p>
                                                    {/* Autres détails de l'itinéraire */}
                                                </div>
                                            ))}

                                            {/* <p>Date de départ : {itinerary.segments[0].departure.at}</p>
                                                    <p>Aéroport de départ : {itinerary.segments[0].departure.iataCode}</p>
                                                    <p>Heure de départ : {itinerary.segments[0].departure.at.split('T')[1]}</p>
                                                    <p>Date d'arrivée : {itinerary.segments[itinerary.segments.length - 1].arrival.at}</p>
                                                    <p>Aéroport d'arrivée : {itinerary.segments[itinerary.segments.length - 1].arrival.iataCode}</p>
                                                    <p>Heure d'arrivée : {itinerary.segments[itinerary.segments.length - 1].arrival.at.split('T')[1]}</p>
                                                    <p>Durée : {convertirDuree(itinerary.duration)}</p>
                                                    <Typography>Itinéraire  {i + 1} </Typography>
                                                    <Typography>Durée: {convertirDuree(itinerary.duration)}</Typography> */}
                                                    {/* Vous pouvez ajouter d'autres informations spécifiques à l'itinéraire ici */}
                                            {/*{flight.travelerPricings.map((pricing, i) => (
                                                <div key={i}>
                                                    <Typography>
                                                        Nombre d'escales : {pricing.fareDetailsBySegment.length}
                                                    </Typography>
                                                </div>
                                            ))}*/}

                                        </Box>
                                        <Box sx={{ display: "flex", justifyContent: " space-between", marginTop: "20px" }}>
                                          <p>Nombre de voyageurs : {flight.travelerPricings.length}</p>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box>
                                        <Box sx={{ with: "300px", display: "flex", gap: "5px" }}>
                                            <BadgeIcon />
                                            <LuggageIcon />
                                            <PaymentIcon />
                                        </Box>
                                        <Box sx={{ padding: "30px 0px" }}>
                                            <Typography level="h1" sx={{ fontSize: "35px", fontWeight: "900" }}>
                                                {flight.price.total} {flight.price.currency}
                                            </Typography>


                                            <Button
                                                sx={{ width: "60%", padding: "10px 0" }}
                                                color="warning"
                                                disabled={false}
                                                loading={false}
                                                onClick={function () { }}
                                                size="lg"
                                                variant="contained"
                                            >Choisir</Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </>

                    ))
                ) : (
                    <p>Les résultats de vol sont indisponibles.</p>
                    // <Grid container spacing={2} sx={{ width: "60%", margin: "10px auto", borderRadius: "15px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                    //     <Grid item xs={10} sx={{ borderRight: 1, padding: "50px 0px" }}>
                    //         <Box sx={{ display: "flex", flexDirection: "column", padding: "20px 20px 0px 20px" }}>
                    //             <Box sx={{ display: "flex", justifyContent: " space-between" }}>
                    //                 <Typography>FLAYERS A41</Typography>
                    //                 <Typography>DATE</Typography>
                    //                 <Typography> 4 escale</Typography>
                    //                 <Typography> Duration</Typography>
                    //             </Box>
                    //             <Box>
                    //                 <Typography>B</Typography>
                    //             </Box>
                    //         </Box>
                    //     </Grid>
                    //     <Grid item xs={2}>
                    //         <Box>
                    //             <Box sx={{ with: "300px", display: "flex", gap: "5px" }}>
                    //                 <BadgeIcon />
                    //                 <LuggageIcon />
                    //                 <PaymentIcon />
                    //             </Box>
                    //             <Box sx={{ padding: "30px 0px" }}>
                    //                 <Typography level="h1" sx={{ fontSize: "35px", fontWeight: "900" }}>
                    //                     190 €
                    //                 </Typography>
                    //                 <Typography level="h6" sx={{ fontSize: "16px", fontWeight: "300" }}>Economy Light</Typography>
                    //                 <Button
                    //                     sx={{ width: "60%", padding: "10px 0" }}
                    //                     color="warning"
                    //                     disabled={false}
                    //                     loading={false}
                    //                     onClick={function () { }}
                    //                     size="lg"
                    //                     variant="contained"
                    //                 >Choisir</Button>
                    //             </Box>
                    //         </Box>
                    //     </Grid>
                    // </Grid>
                )}
            </Box>




        </Box>
    );
}

export default Vols;

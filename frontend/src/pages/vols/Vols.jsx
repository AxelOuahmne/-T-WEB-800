import styled from "@emotion/styled";
import { Box, alpha } from "@mui/material"; // Importez alpha depuis @mui/material
import FlightIcon from '@mui/icons-material/Flight';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect } from "react";

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
    useEffect(() => {
        // Charger le script d'autocomplétion ici
        const script = document.createElement("script");
        script.src = "/autocomplete.js";
        script.async = true;
        document.body.appendChild(script);

        // Nettoyer le script lors du démontage du composant
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        // Initialiser l'autocomplétion ici
        $('.searchName').autocomplete({
            source: function(req, res){
                $.ajax({
                    url: "/api/airport",
                    dataType: "json",
                    type:"GET",
                    data:req,
                    success: function (data){
                        res($.map(data, function(el){
                            return {
                                label: el.address.cityName + ' (' + el.iataCode +')',
                                value: el.iataCode
                            };
                        }));
                    },
                    error: function(err){
                        console.log(err.status);
                    }
                });
            }
        });
    }, []);

    return (
        <Box>
            <h1>Où voulez-vous partir ?</h1>
            <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                {/* Premier champ */}
                <Search style={{ width: "400px", display: "flex", alignItems: "center", padding: "5px 0px" }}>
                    <SearchIconWrapper>
                        <FlightIcon />
                    </SearchIconWrapper>
                    <input
                        placeholder="De ..."
                        type="text"
                        aria-label="search"
                        className="searchName"
                    />
                </Search>
                {/* Deuxième champ (nouveau champ) */}
                <Search style={{ width: "400px", display: "flex", alignItems: "center", padding: "5px 0px" }}>
                    <SearchIconWrapper>
                        <FlightIcon />
                    </SearchIconWrapper>
                    <input
                        placeholder="À ..."
                        type="text"
                        aria-label="search"
                        className="searchName"
                    />
                </Search>
                <SyncAltIcon sx={{ fontSize: "40px" }} />
                <Box sx={{ width: "400px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Date de départ" sx={{ width: "400px" }} />
                    </LocalizationProvider>
                </Box>
                <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Date de retour" sx={{ width: "400px" }} />
                    </LocalizationProvider>
                </Box>
            </Box>
        </Box>
    );
}

export default Vols;

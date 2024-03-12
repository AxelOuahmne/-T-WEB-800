import styled from "@emotion/styled";
import { Box, InputBase, TextField, Typography, alpha } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import FlightIcon from '@mui/icons-material/Flight';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
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
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
const Vols = () => {
    return (
        <Box>
            <h1>Où voulez-vous partir ? </h1>
            <Box sx={{ display: "flex", justifyContent: "center",gap:"20px" }}>
                <Search  style={{ width:"400px", display:"flex", alignItems:"center" ,padding:"5px 0px"}} >
                    <SearchIconWrapper>
                        <FlightIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="De ..."
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <SyncAltIcon  sx={{fontSize:"40px"}} />
                <Search style={{ width:"400px", display:"flex", alignItems:"center" ,padding:"5px 0px"}}>
                    <SearchIconWrapper>
                        <FlightIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="A ..."
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <Box sx={{width:"400px"}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="selected date "  sx={{width:"400px"}} />

                    </LocalizationProvider>
                </Box>
               
                <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="selected date "  sx={{width:"400px"}} />

                    </LocalizationProvider>
                </Box>
            </Box>
        </Box>
    )
}

export default Vols

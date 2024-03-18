import { Box, Button, IconButton, InputBase, Stack, Toolbar, alpha, styled, useTheme } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Sunny from '@mui/icons-material/WbSunnyOutlined';
import DarkMode from '@mui/icons-material/DarkModeOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from "../../assets/Kayak-logo-2.png"
import CustomizedMenus from "./Menu";
const drawerWidth = 240;


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
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
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));




function TopBar({ open, handleDrawerOpen, setMode }) {
  const theme = useTheme();
  return (
    <>

      <AppBar position="fixed" open={open} color="transparent">
        <Toolbar >
          <IconButton
            // color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} alt="Kayak-logo-2" width={120} />
          <Box flexGrow={1} />

          <Stack direction={"row"}>


            {
              theme.palette.mode === "light" ? (
                <IconButton onClick={() => {
                  localStorage.setItem('currenMode', theme.palette.mode === "light" ? 'dark' : "light")
                  setMode((prevMode) =>
                    prevMode === 'light' ? 'dark' : 'light',
                  );
                }
                }>
                  <Sunny />
                </IconButton>) : (
                <IconButton onClick={() => {
                  localStorage.setItem('currenMode', theme.palette.mode === "light" ? 'dark' : "light")
                  setMode((prevMode) =>
                    prevMode === 'light' ? 'dark' : 'light',
                  );
                }
                }>
                  <DarkMode />
                </IconButton>
              )
            }

            <IconButton color="inherit">
              <FavoriteIcon />  
            </IconButton>
            <Button variant="outlined" startIcon={< AccountCircleIcon/>}  sx={{padding:"10px"}} color="inherit">
            Connexion
            </Button>
            <CustomizedMenus/>

          </Stack>


        </Toolbar>
      </AppBar>
    </>
  )
}

export default TopBar

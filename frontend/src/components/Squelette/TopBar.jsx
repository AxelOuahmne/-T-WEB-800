import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Box, Button, Stack, useTheme, styled, alpha, InputBase } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Sunny from '@mui/icons-material/WbSunnyOutlined';
import DarkMode from '@mui/icons-material/DarkModeOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from "../../assets/NADA.png";
import CustomizedMenus from "./Menu";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  transition: theme.transitions.create(['margin', 'background-color'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(scrolled && {
    marginTop: '-64px', // Adjust this value according to your AppBar height
    backgroundColor: theme.palette.background.paper, // Change background color when scrolled
  }),
}));

const TopBar = ({ open, handleDrawerOpen, setMode }) => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <StyledAppBar position="fixed" open={open} scrolled={scrolled} color='transparent'>
        <Toolbar>
          <IconButton
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
            {!user && (<Button onClick={() => { navigate('/login') }} variant="outlined" startIcon={<AccountCircleIcon />} sx={{ padding: "10px" }} color="inherit">
              Connexion
            </Button>)}
            {user && (<CustomizedMenus user={user.nom} />)}
          </Stack>
        </Toolbar>
      </StyledAppBar>
    </>
  )
}

export default TopBar;

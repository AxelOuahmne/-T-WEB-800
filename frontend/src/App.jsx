import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TopBar from './components/Squelette/TopBar';
import SaidBar from './components/Squelette/SaidBar';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { getDesignTokens } from './Theme';
import { Outlet, useNavigate } from 'react-router-dom'; // Importez useNavigate depuis react-router-dom

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

export default function MiniDrawer() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate(); // Utilisez useNavigate pour la navigation

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [mode, setMode] = React.useState(localStorage.getItem('currenMode')!==null ?localStorage.getItem('currenMode'):'light');
    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    React.useEffect(() => {
        // Vérifiez le statut de l'API ici
        // Si le statut est 401, redirigez l'utilisateur vers la page de connexion
        const checkApiStatus = async () => {
            try {
                const response = await fetch('URL_DE_VOTRE_API');
                // Vérifiez si la variable 'user' existe dans le localStorage
                const userExists = localStorage.getItem('user');
                if ((response.status === 401) || (!userExists)) {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Erreur lors de la vérification du statut de l\'API :', error);
            }
        };

        checkApiStatus();
    }, [navigate]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <TopBar open={open} handleDrawerOpen={handleDrawerOpen} setMode={setMode} />
                <SaidBar open={open}  handleDrawerClose={handleDrawerClose} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Outlet />
                </Box>
            </Box>
        </ThemeProvider>
    );
}

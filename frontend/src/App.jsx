import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TopBar from './components/Squelette/TopBar';
import SaidBar from './components/Squelette/SaidBar';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { getDesignTokens } from './Theme';
import { Outlet } from 'react-router-dom';

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

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [mode, setMode] = React.useState(localStorage.getItem('currenMode')!==null ?localStorage.getItem('currenMode'):'light');
    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])
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




























































import React from 'react';

import { Avatar, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, styled ,useTheme} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiDrawer from '@mui/material/Drawer';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FlightIcon from '@mui/icons-material/Flight';
import { useLocation, useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import KingBedIcon from '@mui/icons-material/KingBed';
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import FeedIcon from '@mui/icons-material/Feed';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import CommentIcon from '@mui/icons-material/Comment';
import CookieIcon from '@mui/icons-material/Cookie';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);
function SaidBar({open,handleDrawerClose}) {
    let location = useLocation();
    const theme = useTheme();
    const Array1 =[
        {"text":"Connexion","icon":<AccountCircleIcon/>,"path":"/login"},
  
    ]
    const Array2 =[
        {"text":"Vols","icon":<FlightIcon/>,"path":"/vols"},
        {"text":"Hébergements","icon":<KingBedIcon/>,"path":"/hotels"},
        {"text":"Voitures","icon":<ElectricCarIcon/>,"path":"/cars"}, 
        {"text":"Vols+Hôtels","icon":<BeachAccessIcon/>,"path":"/vols&hotels"}, 
        {"text":"Explore","icon":<MapsHomeWorkIcon/>,"path":"/allMaps"},
    ]
    const Array3 =[
        {"text":"Explore","icon":<TravelExploreIcon/>,"path":"/maps"},
        {"text":"Conseils de voyage","icon":<FeedIcon/>,"path":"/Conseils-de-voyage"},
        {"text":"Vols directs","icon":<FirstPageIcon/>,"path":"/cars"}, 
        {"text":"Meilleur moment pour voyager","icon":<AccessTimeFilledIcon/>,"path":"/Meilleur-moment-pour-voyager"}, 
    ]
    const Array4 =[
        {"text":"Commentaire","icon":<CommentIcon/>,"path":"/Explore"},
    ] 
    const Array5 =[
        {"text":"Préférences de confidentialité","icon":<CookieIcon/>,"path":"/Explore"},
    ] 
    const Array6 =[
        {"text":"Trips","icon":<FavoriteIcon/>,"path":"/Explore"},
    ] 
    //Préférences de confidentialité ';


    // const hightwidth= open ? 80 :40 ;
    // const fz = open ?20:0 ;

    const navigate = useNavigate();
  return (
    <>
 <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>

                {/* <Divider />
                <Avatar sx={{mx:"auto" , my:2 , width:hightwidth ,height:hightwidth, border:"2px solid #8e918f ",transition:".30s"}} alt="Remy Sharp" src="https://media.licdn.com/dms/image/D4E35AQF4hzvJYAY24w/profile-framedphoto-shrink_100_100/0/1693893421424?e=1708876800&v=beta&t=BCB_-RkRfYg7s_tzoK1pVuElQWstgYq-Cbs3As4bqQY" />
                <Typography align='center' variant='body1' sx={{fontSize:fz,fontWeight:"bold" ,textTransform:"uppercase" ,transition:".30s"}}> Celia </Typography>
                <Typography align='center' variant='body1'  sx={{fontSize:fz ,fontWeight:100 ,marginBottom:"2px" ,transition:".30s",color:theme.palette.info.main}}> Admin </Typography>
                <Divider /> */}



                <List>
                    {Array1.map((item) => (
                        <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    bgcolor: location.pathname === item.path ? theme.palette.mode==='dark'?grey[800]:grey[400]:null

                                }}
                                onClick={()=>{
                                    navigate(item.path)
                                }}

                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',

                                    }}
                                >
                                  {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {Array2.map((item) => (
                        <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    bgcolor: location.pathname === item.path ? theme.palette.mode==='dark'?grey[800]:grey[400]:null

                                }}
                                onClick={()=>{
                                    navigate(item.path)
                                }}

                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',

                                    }}
                                >
                                  {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {Array3.map((item) => (
                        <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    bgcolor: location.pathname === item.path ? theme.palette.mode==='dark'?grey[800]:grey[400]:null

                                }}
                                onClick={()=>{
                                    navigate(item.path)
                                }}

                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',

                                    }}
                                >
                                  {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {Array4.map((item) => (
                        <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    bgcolor: location.pathname === item.path ? theme.palette.mode==='dark'?grey[800]:grey[400]:null

                                }}
                                onClick={()=>{
                                    navigate(item.path)
                                }}

                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',

                                    }}
                                >
                                  {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {Array5.map((item) => (
                        <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    bgcolor: location.pathname === item.path ? theme.palette.mode==='dark'?grey[800]:grey[400]:null

                                }}
                                onClick={()=>{
                                    navigate(item.path)
                                }}

                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',

                                    }}
                                >
                                  {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {Array6.map((item) => (
                        <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    bgcolor: location.pathname === item.path ? theme.palette.mode==='dark'?grey[800]:grey[400]:null

                                }}
                                onClick={()=>{
                                    navigate(item.path)
                                }}

                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',

                                    }}
                                >
                                  {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
    </>
  )
}

export default SaidBar

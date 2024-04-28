import React from 'react';
import { Box, Paper, Typography, useMediaQuery } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import Rating from '@mui/material/Rating';
import { LocationOnOutlined } from '@mui/icons-material';
import useStyles from './style';

function Map({ setCoordinates, setBounds, coordinates, places ,setChildClicked}) {
  console.log("place => => =>", places);
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width: 600px)');
  
  return (
    <Box style={{ height: '85vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBvOki7ed7m1K79jUyi8qJPyMU2j4rlkm8' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={''}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <div
            style={{
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
              '&:hover': { zIndex: 2 }
            }}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!isDesktop ? (
              <LocationOnOutlined color='primary' fontSize='large' />
            ) : (
              <Paper
                elevation={3}
                style={{
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  width: '100px'
                }}
              >
                <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                  {place.name}
                </Typography>
                <img
                  style={{ cursor: 'pointer' }}
                  className='test-img'
                  src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  alt={place.name}
                />
                <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </Box>
  );
}

export default Map;

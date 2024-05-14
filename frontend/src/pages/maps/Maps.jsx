import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Input,
  Skeleton,
  Typography,
} from '@mui/material';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';

import {
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';

import { useJsApiLoader } from '@react-google-maps/api';

const center = { lat: 48.8584, lng: 2.2945 };

function Maps() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyB4poGuphIn0U1MvnuJ3GrekYi3AIRsUl4',
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const calculateRoute = async () => {
    if (!originRef.current.value || !destinationRef.current.value) {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destinationRef.current.value = '';
  };

  if (!isLoaded) {
    return <Skeleton />;
  }

  return (
    <Box
    
     padding={"50px 0px"}
      display='flex'
      flexDirection='column'
      alignItems='center'
      height='100vh'
      width='100%'
    >
      <Box position='relative' left={0} top={0} height='100%' width='100%'>
        <GoogleMap
          center={center}
          zoom={14}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgcolor='#fff'
        color='#000'
        boxShadow='base'
        minWidth='container.md'
        zIndex='1'
        opacity={0.6}
      >
        <Box
          display='flex'
          spacing={2}
          justifyContent='space-between'
          alignItems='center'
        >
          <Box flex={1}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' inputRef={originRef} />
            </Autocomplete>
          </Box>
          <Box flex={1}>
            <Autocomplete>
              <Input
                type='text'
                placeholder='Destination'
                inputRef={destinationRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme='pink' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton aria-label='Clear' onClick={clearRoute}>
              <FaTimes />
            </IconButton>
          </ButtonGroup>
        </Box>
        <Box
          display='flex'
          spacing={4}
          mt={4}
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography>Distance: {distance} </Typography>
          <Typography>Duration: {duration} </Typography>
          <IconButton
            aria-label='Center'
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          >
            <FaLocationArrow />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Maps;

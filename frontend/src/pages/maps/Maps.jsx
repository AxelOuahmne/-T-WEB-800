import React from 'react';
import MapContainer from '../../components/Squelette/Map';
import { GoogleMap, useLoadScript,LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
  return (
    <div>
      <h1>Welcome to My Website!</h1>
      <MapContainer />
      {/* You can include other components or content here */}
    </div>
  );
};

export default Map;

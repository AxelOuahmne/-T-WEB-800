import { CssBaseline, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import Header from './Header/Header'
import Map from './Map/Map'
import List from './List/List'
import { getPlacesData } from '../../api'

function AllMaps() {
    const [places,setPlaces] =useState() ;
    const [coordinates,setCoordinates] = useState({}) ;
    const [bounds,setBounds] = useState({}) ;
    const [childClicked,setChildClicked] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [type,setType] = useState('restaurants');
    const [rating,setRating] = useState('');
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    // const [weatherData,setWeatherData]=useState([])
    
    useEffect(() => {
      
      navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}}) => {
        setCoordinates({
          lat: latitude,
          lng: longitude,
        })
      })
    },[])
  
    useEffect(() =>{
      setLoading(true)
      if (bounds.sw && bounds.ne) {
        // getWeatherData(coordinates.lat,coordinates.lng).then((data)=>{
        //   setWeatherData(data)
        // })
        getPlacesData(type, bounds.sw, bounds.ne).then((data) =>{
        if(data) {
          setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([])
          setLoading(false)
        }
        
        });
      }
    },[type,bounds]);
    useEffect(() => {
     if(places){
      const filtered = places.filter((place) => Number(place.rating) > rating);
  
      setFilteredPlaces(filtered);
     }
    }, [rating]);
    return (
      <>
      {/* {console.log(weatherData)} */}
        <CssBaseline />
        <Header setCoordinates={setCoordinates} />
        <Grid container spacing={3} style={{ width: "100%",marginTop:'40px' }}>
        <Grid item xs={12} md={8} >
              <Map  setCoordinates={setCoordinates} 
                    setBounds={setBounds} 
                    coordinates={coordinates}
                    places={filteredPlaces.length ? filteredPlaces : places} 
                    setChildClicked={setChildClicked}
              />
            </Grid>
            <Grid item xs={12} md={4} >
              <List 
              places={filteredPlaces.length ? filteredPlaces : places}
              childClicked={childClicked} 
              isLoading={isLoading} 
              type={type} 
              setType={setType} 
              rating={rating} 
              setRating={setRating}/>
            </Grid>
    
        </Grid>
      </>
    )
}

export default AllMaps

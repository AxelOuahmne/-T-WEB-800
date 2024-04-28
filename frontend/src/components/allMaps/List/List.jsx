import { Box, CircularProgress, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React, { createRef, useEffect, useState } from 'react'
import PlaceDetails from '../PlaceDetails/PlaceDetails';

function List({places,childClicked,isLoading,type,setType,rating,setRating}) {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);
  console.log({childClicked})
  return (
    <Container maxWidth="sm">
      {isLoading ? (
  <div style={{ height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <CircularProgress size={"5rem"} />
  </div>
) : (
  <>


      {/* <FormControl sx={{minWidth: 150, margin:'30px 20px 30px 0px'}} >
      <InputLabel id="type">Type</InputLabel>
        <Select fullWidth  label="Type" value={type} id='type' onChange={(e)=>setType(e.target.value)}>
          <MenuItem value={'restaurants'}>Restaurants</MenuItem>
          <MenuItem value={'hotels'}>Hotels</MenuItem>
          <MenuItem value={'attractions'}>Attractions</MenuItem>
        </Select>
      </FormControl> */}
      <FormControl sx={{minWidth: 150, margin:'30px 20px 30px 0px'}}>
            <InputLabel id="type">Type</InputLabel>
            {/* <Select id="type" value={type} onChange={(e) => setType(e.target.value)}> */}
            <Select fullWidth value={type} labelId="type" onChange={(e)=>setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
      <FormControl sx={{minWidth: 150, margin:'30px 0px'}} >
      <InputLabel id="rating">Rating</InputLabel>
        <Select fullWidth  label="rating" value={rating} id='type' onChange={(e)=>setRating(e.target.value)}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing = {3}  sx={{height: '75vh', overflow: 'auto',}}>
      {places?.map((place, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
              </Grid>
            ))}
      </Grid>
      </>
      )}
    </Container>

  )
}

export default List

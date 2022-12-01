import React, {useEffect, useState} from "react";
import {CssBaseline, Grid} from '@mui/material';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import {getPlacesData} from './api/index';


function App() {
  const [places, setPlaces]=useState([]);
  const [childClicked, setChildClicked]=useState(null);
  const [coordinates, setCoordinates]=useState({});
  const [bounds, setBounds]=useState(null);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setCoordinates({lat: latitude, lng: longitude});
    });
  }, []);

  useEffect(() => {
    console.log(coordinates, bounds)

    getPlacesData(bounds.sw, bounds.ne)
      .then((data) => {
        console.log(data);

        setPlaces(data);
      })

  }, [coordinates, bounds])
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{width: "100%"}}>
        <Grid item xs={12} md={4}>
          <List
            place={places}
            childClicked={childClicked}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
            setChildClicked={setChildClicked}
          />
        </Grid>

      </Grid>

    </>
  );
}

export default App;

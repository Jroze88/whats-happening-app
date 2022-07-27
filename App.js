import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, StyleSheet, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// const GOOGLE_API_KEY = *GOOGLE API*
const screenWidth = Dimensions.get('window').width

function App() {

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 })

  async function getPermission() {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )
  }
  useEffect(() => {
    getPermission().then(() => {
      Geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: false, timeout: 15000 }
      );
    })

  }, []);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        followsUserLocation = {true}
        showsPointsOfInterest={false}
        rotateEnabled={false}
        region={{
          latitude: 38.695794,
          longitude: -101.807704,
          // latitude: location.latitude,
          // longitude: location.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={{
            latitude: 38.695794,
            longitude: -101.807704,
          }}
        />
      </MapView>
      <GooglePlacesAutocomplete
      style={styles.searchBar}
      placeholder='Search Places'
      query={{
        // key: GOOGLE_API_KEY,
        language:'en'
      }}
      GooglePlacesDetailsQuery={{
        fields:'geometry'
      }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#369',
    paddingTop:5
  },
  map:{
    left:0,
    right:0,
    top:0,
    bottom:0,
    position:'absolute'
  },
  searchBar:{
    description:{
      fontWeight:"bold"
    },
    predefinedPlacesDescription:{
      color:"red"
    },
    textInputContainer:{
      backgroundColor:'#369',
      top:50,
      width:screenWidth - 20,
      borderWidth:0
    },
    textInput:{
      marginLeft:0,
      marginRight:0,
      height:38,
      color:'#5d5d5d',
      fontSize:16,
      borderWidth:0
    },
    listView:{
      backgroundColor:'rgba(192,192,192,0.9)',
      top:23
    }
  }
})

export default App

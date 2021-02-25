import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Button, TextInput, View, StyleSheet, Dimensions } from "react-native";

export default function FindTheAdress() {
  const [findLocation, setFindLocation] = useState("");
  const [location, setLocation] = useState({ lat: 60.200692, lng: 24.93402 });

  const getLocation = () => {
    let url =
      "http://www.mapquestapi.com/geocoding/v1/address?key=cDPcCSevpOFCXigo8AYdAsAhfqv3DolD&location=" +
      findLocation;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results[0].locations[0].latLng);
        setLocation(data.results[0].locations[0].latLng);
      });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
        region={{
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.lat,
            longitude: location.lng,
          }}
        />
      </MapView>
      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.input}
          placeholder="Find adress"
          onChangeText={(findLocation) => setFindLocation(findLocation)}
          value={findLocation}
        />
        <Button
          style={styles.buttons}
          title="Find"
          onPress={() => getLocation()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 8,
  },
  input: {
    width: 350,
    borderColor: "grey",
    borderWidth: 1,
    textAlign: "center",
    margin: 1,
    height: 40,
  },
  buttons: {
    width: 350,
  },
});

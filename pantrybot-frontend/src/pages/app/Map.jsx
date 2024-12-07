import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

const Map = ({ zipCode }) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const [center, setCenter] = useState({ lat: 38.973148, lng: -95.238251 }); // Default to Lawrence, KS
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (!apiKey) {
      console.error("API Key is not defined");
      return;
    }

    const fetchCoordinates = async () => {
      try {
        const geoResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}`
        );
        const location = geoResponse.data.results[0].geometry.location;
        setCenter(location);

        const placesResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=5000&type=grocery_or_supermarket&key=${apiKey}`
        );
        setPlaces(placesResponse.data.results);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };

    if (zipCode) fetchCoordinates();
  }, [zipCode]);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={12}
      >
        {places.map((place) => (
          <Marker
            key={place.place_id}
            position={{
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
            }}
            title={place.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};
export default Map;
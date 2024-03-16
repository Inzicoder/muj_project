import React, { useState, useEffect } from 'react';
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';
import { useParams } from 'react-router-dom';

const LiveTracking = props => {
  const { google } = props;
  const { fromLat, fromLng, toLat, toLng } = useParams();
  const [initialCenterAddress, setInitialCenterAddress] = useState({
    lat: parseFloat(fromLat),
    lng: parseFloat(fromLng),
  });
  const [destinationAddress, setDestinationAddress] = useState({
    lat: parseFloat(toLat),
    lng: parseFloat(toLng),
  });
  const [activeMarker, setActiveMarker] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [mapBounds, setMapBounds] = useState(null);
  const [map, setMap] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
    });

    setDirectionsRenderer(directionsRenderer);

    directionsService.route(
      {
        origin: initialCenterAddress,
        destination: destinationAddress,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const route = result.routes[0].overview_path;
          setRouteCoordinates(route);
          const bounds = new google.maps.LatLngBounds();
          route.forEach(point => bounds.extend(point));
          setMapBounds(bounds);
          directionsRenderer.setDirections(result);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  }, [google, initialCenterAddress, destinationAddress]);

  const onMarkerClick = (props, marker) => {
    setActiveMarker(marker);
    setShowInfoWindow(true);
  };

  const onCloseInfoWindow = () => {
    setShowInfoWindow(false);
  };

  const handleMapReady = (mapProps, map) => {
    if (map) {
      setMap(map);
      directionsRenderer.setMap(map);
    }
  };

  return (
    <Map
      google={google}
      zoom={11}
      center={mapBounds && mapBounds.getCenter()}
      initialCenter={initialCenterAddress}
      fullscreenControl={false}
      mapTypeControl={false}
      onReady={handleMapReady}
    >
      <Marker position={initialCenterAddress} onClick={onMarkerClick} />
      <Marker position={destinationAddress} onClick={onMarkerClick} />
      <InfoWindow
        marker={activeMarker}
        visible={showInfoWindow}
        onClose={onCloseInfoWindow}
      >
        <div>
          <h3>Marker Info</h3>
          <p>Additional information about the marker</p>
        </div>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBdc7TPydN4945Q-91KC7ndiczXdkqaPKo',
})(LiveTracking);

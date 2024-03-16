import React, { useState, useEffect } from 'react';
import {
  Map,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
  Polyline,
} from 'google-maps-react';

const LiveTracking = props => {
  const { google } = props;
  const [initialCenterAddress, setInitialCenterAddress] = useState({
    lat: 12.9151174,
    lng: 77.6338816,
  });
  const [destinationAddress, setDestinationAddress] = useState({
    lat: 12.9047903,
    lng: 77.6279679,
  });
  const [activeMarker, setActiveMarker] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [mapBounds, setMapBounds] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();
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
    setMap(map);
  };

  useEffect(() => {
    if (map) {
      const trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);
    }
  }, [map, google]);

  return (
      <Map
        google={google}
        zoom={15}
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
        {routeCoordinates.length > 0 && (
          <Polyline
            path={routeCoordinates}
            strokeColor="#0080ff" // Blue color
            strokeOpacity={0.7}
            strokeWeight={6} // Thicker line
            icons={[
              {
                icon: {
                  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  scale: 2, // Size of the arrow
                },
                offset: '50%', // Show the arrow at the middle of the line
                repeat: '100px', // Repeat the arrow every 100 pixels
              },
            ]}
          />
        )}
      </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBdc7TPydN4945Q-91KC7ndiczXdkqaPKo',
})(LiveTracking);

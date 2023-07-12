import {
  DrawingManager,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useState } from "react";
import { IProperties } from "src/types/properties";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 38.246639,
  lng: 21.734573,
};

interface IMapProps {
  data?: IProperties[];
  activeMarker: number | null;
  setActiveMarker: any;
}

const Map = ({ data, activeMarker, setActiveMarker }: IMapProps) => {
  const apiKey = "AIzaSyC6BN1ePFMAmJJfF71uN7vsNXIOCpQ5DbQ";
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries: ["drawing"],
  });
  const [map, setMap] = React.useState(null);
  const [mapRef, setMapRef] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState<any>();
  const [center, setCenter] = useState({ lat: 37.98381, lng: 23.727539 }); // Athens
  const [bounds, setBounds] = useState<any>(null);
  const [cities, setCities] = useState([]);

  const markers = data ? data
    .filter((property) => property.location !== null) // some properties are dummies
    .map((property) => {
      const location = property.location;
      return {
        address: location.street + " " + location.number,
        lat: location.lat,
        lng: location.lng,
      };
    }) : [];

  const onMapLoad = (map: any) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  const handleMarkerClick = (id: any, lat: any, lng: any, address: any) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, address });
    setIsOpen(true);
  };

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    if (map.current) {
      map.current.fitBounds(bounds);
    }

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  const handleMarkerMouseOver = (marker: any) => {
    setActiveMarker(marker);
  };

  const onPolygonComplete = (polygon: any) => {
    console.log(polygon);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <DrawingManager onLoad={onLoad} onPolygonComplete={onPolygonComplete} />

      {markers.map(({ address, lat, lng }, ind) => (
        <Marker
          // icon={{ url: "/static/img/house.png" }}
          key={ind}
          position={{ lat, lng }}
          onMouseUp={() => handleMarkerMouseOver(ind)}
          animation={
            activeMarker === ind ? google.maps.Animation.BOUNCE : undefined
          }
          onClick={() => {
            handleMarkerClick(ind, lat, lng, address);
          }}
        />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(Map);

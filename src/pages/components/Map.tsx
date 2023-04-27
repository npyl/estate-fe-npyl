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
  data: IProperties[];
  activeMarker: number | null;
  setActiveMarker: any;
}

const Map = ({ data, activeMarker, setActiveMarker }: IMapProps) => {
  console.log(data);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC6BN1ePFMAmJJfF71uN7vsNXIOCpQ5DbQ",
    libraries: ["drawing"],
  });
  const [mapRef, setMapRef] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState<any>();
  const markers = [
    { address: "Address1", lat: 38.246639, lng: 21.734573 },
    { address: "Address2", lat: 38.236639, lng: 21.724573 },
    { address: "Address3", lat: 38.256639, lng: 21.744573 },
  ];

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
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
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
          icon={{ url: "/static/img/house.png" }}
          key={ind}
          position={{ lat, lng }}
          onMouseUp={() => handleMarkerMouseOver(3)}
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

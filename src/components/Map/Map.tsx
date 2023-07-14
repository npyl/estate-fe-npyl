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
	onClick?: (event: google.maps.MapMouseEvent) => void;
	data?: IProperties[];
	activeMarker: number | null;
	setActiveMarker: any;
	drawing?: boolean;
}

const Map = ({
	onClick,
	data,
	activeMarker,
	setActiveMarker,
	drawing = true,
}: IMapProps) => {
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

	const markers = data
		? data
				.filter((property) => property.location !== null) // some properties are dummies
				.map((property) => {
					const location = property.location;
					return {
						address: location.street + " " + location.number,
						lat: location.lat,
						lng: location.lng,
					};
				})
		: [];

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
			onClick={(event) => onClick && onClick(event)}
			onLoad={onLoad}
			onUnmount={onUnmount}
		>
			{drawing && (
				<DrawingManager onLoad={onLoad} onPolygonComplete={onPolygonComplete} />
			)}

			{markers.map(({ address, lat, lng }, ind) => (
				<Marker
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

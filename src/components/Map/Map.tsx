import {
	DrawingManager,
	GoogleMap,
	Marker,
	useJsApiLoader,
} from "@react-google-maps/api";
import React, { useCallback, useEffect, useState } from "react";
import { IProperties } from "src/types/properties";

const containerStyle = {
	width: "100%",
	height: "100%",
};

export interface IMapMarker {
	lat: number;
	lng: number;
	address: string;
	draggable: boolean;
}

interface IMapProps {
	onClick?: (event: google.maps.MapMouseEvent) => void;
	onDragEnd?: (marker: IMapMarker, newLat: number, newLng: number) => void;

	data?: IProperties[];
	mainMarker?: IMapMarker;
	activeMarker: number | null;
	setActiveMarker: any;
	drawing?: boolean;
}

const Map = ({
	onClick,
	onDragEnd,
	data,
	mainMarker,
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

	const [markers, setMarkers] = useState<IMapMarker[]>([]);

	useEffect(() => {
		if (!data) return;

		setMarkers([
			...markers,
			...data
				.filter((property) => property.location !== null) // some properties are dummies
				.map((property) => {
					const location = property.location;

					return {
						address: location.street + " " + location.number,
						lat: location.lat,
						lng: location.lng,
						draggable: false,
					};
				}),
		]);
	}, [data]);

	useEffect(() => {
		if (!mainMarker) return;

		setMarkers([...markers, mainMarker]);
	}, [mainMarker]);

	const onLoad = useCallback((map: any) => {
		const bounds = new window.google.maps.LatLngBounds(center);

		if (map.current) {
			map.current.fitBounds(bounds);
		}

		setMap(map);
	}, []);

	const onUnmount = useCallback(() => {
		setMap(null);
	}, []);

	//
	// Markers
	//
	const handleMarkerClick = (id: any, lat: any, lng: any, address: any) => {
		mapRef?.panTo({ lat, lng });
		setInfoWindowData({ id, address });
		setIsOpen(true);
	};

	const handleMarkerMouseOver = (marker: any) => {
		setActiveMarker(marker);
	};

	const onMarkerDragEnd = (
		latLng: any,
		index: number,
		markers: IMapMarker[]
	) => {
		const lat = latLng.lat();
		const lng = latLng.lng();
		markers[index].lat = lat;
		markers[index].lng = lng;
		setMarkers([...markers]);

		// also call parent callback
		if (onDragEnd) onDragEnd(markers[index], lat, lng);
	};

	//
	//	Draw
	//
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

			{markers.map((marker, ind) => {
				const { address, lat, lng, draggable } = marker;

				return (
					<Marker
						key={ind}
						position={{ lat, lng }}
						onMouseUp={() => handleMarkerMouseOver(ind)}
						animation={
							marker !== mainMarker && activeMarker === ind
								? google.maps.Animation.BOUNCE
								: undefined
						}
						onClick={() => handleMarkerClick(ind, lat, lng, address)}
						draggable={draggable}
						onDragEnd={(e: google.maps.MapMouseEvent) =>
							onMarkerDragEnd(e.latLng, ind, markers)
						}
					/>
				);
			})}
		</GoogleMap>
	) : (
		<></>
	);
};

export default React.memo(Map);

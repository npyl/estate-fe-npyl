import {
	DrawingManager,
	GoogleMap,
	Marker,
	useJsApiLoader,
} from "@react-google-maps/api";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ILocationPOST } from "src/types/location";

const containerStyle = {
	width: "100%",
	height: "100%",
};

export interface IMapCoordinates {
	lat: number;
	lng: number;
}

export interface IMapMarker extends IMapCoordinates {
	address: string;
	main: boolean;
}

export interface IMapAddress {
	street: string;
	number: string;
	zipCode: string;
}

interface IMapProps {
	onClick?: (lat: number, lng: number, address: IMapAddress) => void;
	onDragEnd?: (
		marker: IMapMarker,
		newLat: number,
		newLng: number,
		address: IMapAddress
	) => void;

	data?: ILocationPOST[];
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
	const athensLatLng = { lat: 37.98381, lng: 23.727539 };
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: apiKey,
		libraries: ["drawing"],
	});
	const [geocoder, setGeocoder] = useState<google.maps.Geocoder>();

	const [map, setMap] = React.useState(null);
	const [mapRef, setMapRef] = useState<any>();
	const [isOpen, setIsOpen] = useState(false);
	const [infoWindowData, setInfoWindowData] = useState<any>();

	const [markers, setMarkers] = useState<IMapMarker[]>([]);

	// center is based on mainMarker's latLng
	const center = useMemo(() => {
		return mainMarker
			? { lat: mainMarker.lat, lng: mainMarker.lng }
			: athensLatLng;
	}, [mainMarker?.lat, mainMarker?.lng]);

	useEffect(() => {
		if (!data) return;

		setMarkers([
			...markers,
			...data
				.filter((location) => location !== null) // some properties are dummies
				.map((location) => ({
					address: location.street + " " + location.number,
					lat: location.lat!,
					lng: location.lng!,
					main: false,
				})),
		]);
	}, [data]);

	useEffect(() => {
		if (!markers || !mainMarker) return;

		setMarkers([...markers, mainMarker]);
	}, []);

	const onLoad = useCallback((map: any) => {
		const bounds = new window.google.maps.LatLngBounds(center);
		setGeocoder(new window.google.maps.Geocoder());

		if (map.current) {
			map.current.fitBounds(bounds);
		}

		setMap(map);
	}, []);

	const onUnmount = useCallback(() => {
		setMap(null);
	}, []);

	const getAddressFromLatLng = async (
		lat: number,
		lng: number
	): Promise<IMapAddress> => {
		if (!geocoder) throw new Error("Geocoder is not initialised!");

		// Helper function to extract the address component value based on the type
		const getAddressComponent = (
			addressComponents: google.maps.GeocoderAddressComponent[],
			type: string
		) => {
			const component = addressComponents.find((component) =>
				component.types.includes(type)
			);
			return component ? component.long_name : "";
		};

		const { results } = await geocoder.geocode({
			location: { lat, lng },
		});

		if (!results || results.length === 0 || !results[0])
			throw new Error("Geocoder failed");

		// Access the address components from the first result
		const addressComponents = results[0].address_components;

		// Extract the desired address details from address components
		const street = getAddressComponent(addressComponents, "route");
		const number = getAddressComponent(addressComponents, "street_number");
		const zipCode = getAddressComponent(addressComponents, "postal_code");

		return { street, number, zipCode };
	};

	//
	//	Map
	//
	const handleMapClick = (event: google.maps.MapMouseEvent) => {
		const latLng = event.latLng;
		const lat = latLng?.lat();
		const lng = latLng?.lng();

		if (!lat || !lng) return;

		if (onClick)
			getAddressFromLatLng(lat, lng).then((response) =>
				onClick(lat, lng, response)
			);
	};

	//
	// 	Markers
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
		if (onDragEnd)
			getAddressFromLatLng(lat, lng).then((response) =>
				onDragEnd(markers[index], lat, lng, response)
			);
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
			onClick={handleMapClick}
			onLoad={onLoad}
			onUnmount={onUnmount}
		>
			{drawing && (
				<DrawingManager onLoad={onLoad} onPolygonComplete={onPolygonComplete} />
			)}

			{markers.map((marker, ind) => {
				const { address, lat, lng, main } = marker;

				return (
					<Marker
						key={ind}
						position={{ lat, lng }}
						onMouseUp={() => handleMarkerMouseOver(ind)}
						animation={
							!main && activeMarker === ind
								? google.maps.Animation.BOUNCE
								: undefined
						}
						onClick={() => handleMarkerClick(ind, lat, lng, address)}
						draggable={main}
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

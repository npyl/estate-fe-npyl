import { IMapMarker } from "@/components/Map";

const getMarkerId = ({ lat, lng, propertyId }: IMapMarker) =>
    `${lat}-${lng}-${propertyId}`;

export default getMarkerId;

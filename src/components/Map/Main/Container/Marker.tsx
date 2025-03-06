import { FC } from "react";
import { IMapCoordinates } from "../../types";
import { MarkerF, MarkerProps as MarkerFProps } from "@react-google-maps/api";

interface MarkerProps extends Omit<MarkerFProps, "position"> {
    m: IMapCoordinates;
}

const Marker: FC<MarkerProps> = ({ m, ...props }) => {
    const { lat, lng } = m;
    if (!Boolean(lat) || !Boolean(lng)) return null;

    return (
        <MarkerF
            position={{ lat, lng }}
            icon="/static/map/mapIcon.svg"
            {...props}
        />
    );
};

export default Marker;

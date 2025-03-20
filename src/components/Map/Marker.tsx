import { MarkerF, MarkerProps } from "@react-google-maps/api";
import { FC } from "react";

const Marker: FC<MarkerProps> = (props) => (
    <MarkerF icon="/static/map/mapIcon.svg" {...props} />
);

export type { MarkerProps };
export default Marker;

import { useJsApiLoader } from "@react-google-maps/api";
import { libraries } from "./constants";

const googleMapsApiKey = process.env.NEXT_PUBLIC_MAP_API_KEY0 ?? "";

const useLoadApi = () =>
    useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey,
        libraries: libraries as any,
    });

export default useLoadApi;

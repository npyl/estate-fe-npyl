import { useJsApiLoader } from "@react-google-maps/api";
import { apiKey, libraries } from "./constants";

const useLoadApi = () =>
    useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: apiKey,
        libraries: libraries as any,
    });

export default useLoadApi;

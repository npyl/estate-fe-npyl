import { IMapAddress } from "../../types";
import getAddressComponent from "../../util/getAddressComponent";

const getAddressFromLatLng = async (
    lat: number,
    lng: number,
    geocoder?: google.maps.Geocoder
): Promise<IMapAddress | null> => {
    if (!geocoder) {
        console.error("Geocoder is not available!");
        return null;
    }

    const { results } = await geocoder.geocode({
        location: { lat, lng },
    });

    if (!results || results?.length === 0) {
        console.error("Results are faulty: ", results);
        return null;
    }

    // Access the address components from the first result
    const addressComponents = results[0].address_components;

    // Extract the desired address details from address components
    const street = getAddressComponent(addressComponents, "route");
    const number = getAddressComponent(addressComponents, "street_number");
    const zipCode = getAddressComponent(
        addressComponents,
        "postal_code"
    ).replace(/\s/g, ""); // remove spaces

    return { street, number, zipCode };
};

export default getAddressFromLatLng;

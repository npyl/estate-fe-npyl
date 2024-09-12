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

export default getAddressComponent;

import PropertyCard from "@/components/Cards/PropertyCard";
import { IMapMarker } from "@/components/Map/Map";
import { IPropertyResultResponse } from "@/types/properties";
import { useGetPropertyCardByIdQuery } from "@/services/properties";
import { InfoWindowF } from "@react-google-maps/api";
import { useEffect } from "react";
import { Box } from "@mui/material";

interface PropertyInfoWindowProps {
    marker: IMapMarker;
    properties: IPropertyResultResponse[] | undefined;
    setActiveMarker: (index: number | undefined) => void;
}

const PropertyInfoWindow = ({
    marker,
    properties,
    setActiveMarker,
}: PropertyInfoWindowProps) => {
    // Check if the property is in the current filtered properties
    const property = properties?.find((item) => item.id === marker.propertyId);

    // Fetch the property data if not found in the filtered properties
    const { data: fetchedProperty, isLoading } = useGetPropertyCardByIdQuery(
        +marker.propertyId!,
        {
            skip: !!property, // Skip fetching if the property is already available
        }
    );

    const propertyToShow = property || fetchedProperty;
    if (!propertyToShow && !isLoading) return null;

    useEffect(() => {
        const styleElement = document.createElement("style");
        styleElement.innerHTML = `
            .gm-style-iw {
                background: transparent !important;
                box-shadow: none !important;
                padding: 0 !important;
                border-radius: 0 !important;
                border: none !important;
                overflow: hidden !important;
            }
            .gm-style-iw-c {
    background: transparent !important;
    box-shadow: none !important;
}   
            
            .gm-style-iw-t::after, .gm-style-iw-t::before {
                display: none !important;
                
            }
                
            .gm-ui-hover-effect {
            display: none !important;
            }

/* Remove the white background from the InfoWindow */
            .gm-style-iw-d {
                background: transparent !important;
                box-shadow: none !important;
                padding: 0 !important;
                overflow: hidden !important;
                border-radius: 12px !important;
            }    
                .gm-style .gm-style-iw-tc::after {
    // background: none !important;
    height:8px !important;
    width:25px !important;
    }
        `;
        document.head.appendChild(styleElement);

        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    return (
        <InfoWindowF
            position={{ lat: marker.lat, lng: marker.lng }}
            onCloseClick={() => setActiveMarker(undefined)} // Close the InfoWindow when clicked
            options={{
                maxWidth: 290,
                pixelOffset: new google.maps.Size(0, -30),
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    p: -1,
                    backgroundColor: "transparent",
                    overflowX: "hidden",
                }}
            >
                {propertyToShow && (
                    <PropertyCard
                        item={propertyToShow}
                        selectedMarker={marker}
                    />
                )}
            </Box>
        </InfoWindowF>
    );
};

export default PropertyInfoWindow;

import PropertyCard from "@/components/Cards/PropertyCard";
import { IMapMarker } from "@/components/Map/Map";
import { IPropertyResultResponse } from "@/types/properties";
import { useGetPropertyCardByIdQuery } from "@/services/properties";
import { InfoWindowF } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
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
    //useRef for closing the infoWindow
    const infoWindowRef = useRef<HTMLDivElement | null>(null);
    const [isDraggingMap, setIsDraggingMap] = useState(false); //keep state for dragging the map
    const [lastClickedMarker, setLastClickedMarker] = useState<
        number | undefined
    >(undefined);
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

    //mount and unmount styles for the popup window
    useEffect(() => {
        const styleElement = document.createElement("style");
        styleElement.innerHTML = `
            .gm-style-iw {
                background: transparent !important;
                box-shadow: none !important;
                padding:1 !important;
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
                height: 12px !important;
                width: 25px !important;  
}

        `;
        document.head.appendChild(styleElement);

        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    const handleCloseClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setActiveMarker(undefined);
        console.log("Close clicked");
    };
    //controls the info window behavior depending on mouse clicks or drag on the map
    useEffect(() => {
        // Mouse event to detect dragging
        const handleMouseDown = () => {
            setIsDraggingMap(false); // Reset drag state on mouse down
        };

        const handleMouseMove = () => {
            setIsDraggingMap(true); // Set dragging state on mouse move
        };

        const handleMouseUp = (event: MouseEvent) => {
            if (isDraggingMap) {
                return; //do not close
            }
            // close only if it's a simple click
            if (
                infoWindowRef.current &&
                !infoWindowRef.current.contains(event.target as Node)
            ) {
                setActiveMarker(undefined);
            }
        };

        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [setActiveMarker, isDraggingMap]);

    // used for not scrolling the page when the InfoWindow is opened
    useEffect(() => {
        if (
            propertyToShow &&
            (marker.propertyId === lastClickedMarker ||
                lastClickedMarker === undefined)
        ) {
            // Save the current scroll position
            const scrollY = window.scrollY;
            // Reset the scroll position to the saved position
            window.scrollTo(0, scrollY);

            setLastClickedMarker(marker.propertyId);
        }
    }, [propertyToShow, marker.propertyId, lastClickedMarker]);

    return (
        <InfoWindowF
            position={{ lat: marker.lat, lng: marker.lng }}
            onCloseClick={() => setActiveMarker(undefined)}
            options={{
                maxWidth: 290,
                pixelOffset: new google.maps.Size(0, -30),
            }}
        >
            <Box
                ref={infoWindowRef}
                sx={{
                    width: "100%",
                    backgroundColor: "transparent",
                    overflowX: "hidden",
                    position: "relative",
                }}
            >
                <button
                    onClick={handleCloseClick}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        width: "20px",
                        height: "20px",
                        background: "rgba(0, 0, 0, 0.6)",
                        borderRadius: "50%",
                        border: "none",
                        color: "white",
                        fontSize: "12px",
                        cursor: "pointer",
                        display: "flex",
                        zIndex: 9999,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    X
                </button>
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

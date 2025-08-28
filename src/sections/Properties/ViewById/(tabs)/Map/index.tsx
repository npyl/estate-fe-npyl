import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useMemo, useReducer, useState } from "react";
import { useLoadApi } from "@/components/Map";
import { useGetPropertyByIdQuery } from "src/services/properties";
import RelatedPlaces from "./RelatedPlaces";
import Grid from "@mui/material/Grid";
import MapUnavailable from "@/components/Map/MapUnavailable";
import { useTranslation } from "react-i18next";
import { AddressSection } from "../../(sections)";
import MapContent from "./MapContent";
import { initialState, reducer } from "./reducer";

function MyComponent() {
    const { t } = useTranslation();
    const router = useRouter();

    const { isLoaded } = useLoadApi();

    const { propertyId } = router.query;

    const { data } = useGetPropertyByIdQuery(+propertyId!);

    const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
    const [state, dispatchState] = useReducer(reducer, initialState);

    const center = useMemo(
        () => ({
            lat: data?.location?.lat || 37.98381,
            lng: data?.location?.lng || 23.727539,
        }),
        [data?.location]
    );

    if (
        !(
            data?.location?.lat &&
            data?.location?.lat > 0 &&
            data?.location?.lng &&
            data?.location?.lng > 0
        )
    ) {
        return <MapUnavailable />;
    }

    return (
        <Grid container spacing={1}>
            <Grid
                item
                xs={12}
                md={6}
                position="relative"
                height={{ xs: "65vh", sm: "100vh" }}
            >
                {isLoaded && data ? (
                    <MapContent
                        center={center}
                        data={data}
                        setPlaces={setPlaces}
                        dispatchState={dispatchState}
                    />
                ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
                <AddressSection />

                <Box mt={1} />

                <RelatedPlaces
                    data={data}
                    title={t("Closest points") || ""}
                    list={places}
                    duration={state}
                />
            </Grid>
        </Grid>
    );
}

export default MyComponent;

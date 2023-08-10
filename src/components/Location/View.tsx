import { Grid, List } from "@mui/material";
import { ListItem } from "src/components/List";
import { ILocation } from "src/types/location";

import { useMemo } from "react";

import { useTranslation } from "react-i18next";
import {
    useGetMunicipalitiesQuery,
    useGetRegionsQuery,
} from "src/services/location";

interface ViewLocationProps {
    location: ILocation;
}

const isNumberString = (input: string): boolean => !isNaN(Number(input));

export const ViewLocation = ({ location }: ViewLocationProps) => {
    const { t } = useTranslation();

    const { data: regions } = useGetRegionsQuery();
    const { data: municips } = useGetMunicipalitiesQuery(+location?.region);

    // region is most of the types a code; translate to human readable form; otherwise just return the string
    const region: string = useMemo(() => {
        if (!location?.region || !regions) return "";

        return isNumberString(location.region)
            ? regions.filter((r) => r.areaID === +location.region)[0]?.nameGR ||
                  ""
            : location.region;
    }, [location?.region, regions]);

    // city is most of the types a code; translate to human readable form; otherwise just return the string
    const city = useMemo(() => {
        if (!location?.city || !municips) return "";

        return isNumberString(location.city)
            ? municips.filter((m) => m.areaID === +location.city)[0]?.nameGR ||
                  ""
            : location.city;
    }, [location?.city]);

    return (
        <>
            <Grid container>
                <Grid item xs={6} padding={0}>
                    <List>
                        <ListItem
                            label={t("Street")}
                            value={location?.street}
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Number")}
                            value={location?.number}
                            align="horizontal"
                        />

                        <ListItem
                            label={t("City")}
                            value={city}
                            align="horizontal"
                        />
                    </List>
                </Grid>

                <Grid item xs={6} padding={0}>
                    <List>
                        <ListItem
                            label={t("Zip Code")}
                            value={location?.zipCode}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Region")}
                            value={region}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Country")}
                            value={location?.country}
                            align="horizontal"
                        />
                    </List>
                </Grid>
            </Grid>
        </>
    );
};

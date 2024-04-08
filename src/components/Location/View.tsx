import { Grid, List } from "@mui/material";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ListItem } from "src/components/List";
import {
    useGetMunicipalitiesQuery,
    useGetNeighbourhoodsQuery,
    useGetRegionsQuery,
} from "src/services/location";
import { IGeoLocation } from "src/types/geolocation";
import { ILocation } from "src/types/location";

interface ViewLocationProps {
    location: ILocation;
}

const isNumberString = (input: string | undefined): boolean =>
    !isNaN(Number(input));

interface CustomerProps {
    street: string;
    number: string;
    city: string;
}

const Customer = ({ street, number, city }: CustomerProps) => {
    const { t } = useTranslation();

    return (
        <>
            <Grid container>
                <Grid item xs={6} padding={0}>
                    <List>
                        <ListItem label={t("Street")} value={street || "-"} />

                        <ListItem label={t("Number")} value={number || "-"} />
                    </List>
                </Grid>

                <Grid item xs={6} padding={0}>
                    <List>
                        <ListItem label={t("City")} value={city || "-"} />
                    </List>
                </Grid>
            </Grid>
        </>
    );
};

const useHumanReadable = (
    code: string | undefined,
    data: IGeoLocation[] | undefined
) => {
    const { i18n } = useTranslation();

    const greekVersion = useMemo(() => i18n.language === "el", [i18n.language]);

    const result = useMemo(() => {
        if (!code) return "";

        if (!isNumberString(code)) return code;

        const found = data?.find((r) => r.areaID === +code);

        return (greekVersion ? found?.nameGR : found?.nameEN) || "";
    }, [code, data, greekVersion]);

    return result;
};

interface PropertyProps {
    location?: ILocation;
}

const Property = ({ location }: PropertyProps) => {
    const { t } = useTranslation();

    const { data: regions } = useGetRegionsQuery();
    const { data: municips } = useGetMunicipalitiesQuery(+location?.region!, {
        skip: !isNumberString(location?.region),
    });
    const { data: neighbs } = useGetNeighbourhoodsQuery(+location?.city!, {
        skip: !isNumberString(location?.city),
    });

    // region is most of the types a code; translate to human readable form; otherwise just return the string
    const region = useHumanReadable(location?.region, regions);

    // city is most of the types a code; translate to human readable form; otherwise just return the string
    const city = useHumanReadable(location?.city, municips);

    // neighb is most of the types a code; translate to human readable form; otherwise just return the string
    const neighb = useHumanReadable(location?.complex, neighbs);

    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem
                            label={t("Street")}
                            value={location?.street || "-"}
                        />

                        <ListItem
                            label={t("Number")}
                            value={location?.number || "-"}
                        />

                        <ListItem label={t("City")} value={city || "-"} />
                    </List>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem
                            label={t("Zip Code")}
                            value={location?.zipCode || "-"}
                        />
                        <ListItem label={t("Region")} value={region || "-"} />
                        <ListItem
                            label={t("Country")}
                            value={location?.country || "-"}
                        />
                        <ListItem
                            label={t("Neighborhood")}
                            value={neighb || "-"}
                        />
                    </List>
                </Grid>
            </Grid>
        </>
    );
};

export const ViewLocation = ({ location }: ViewLocationProps) => {
    const pathname = usePathname();
    const isProperty = useMemo(() => pathname.includes("property"), [pathname]);

    return isProperty ? (
        <Property location={location} />
    ) : (
        <Customer
            street={location?.street}
            number={location?.number}
            city={location?.city}
        />
    );
};

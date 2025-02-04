import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    useGetRegionsQuery,
    useLazyGetMunicipalitiesQuery,
    useLazyGetNeighbourhoodsQuery,
} from "src/services/location";
import { Grid, List } from "@mui/material";
import { ListItem } from "src/components/List";
import { IGeoLocation } from "@/types/geolocation";
import { useHumanReadableCallback } from "@/components/Location/hook";
import { toNumberSafe } from "@/utils/toNumber";

// TODO: reuse this

interface ViewLocationMiniProps {
    regionCodes: string[];
    cityCodes: string[];
    complexCodes: string[];
}

const ViewLocationMini = ({
    regionCodes,
    cityCodes,
    complexCodes,
}: ViewLocationMiniProps) => {
    const { t } = useTranslation();

    const { data: regions } = useGetRegionsQuery();
    const [allMunicipalities, setAllMunicipalities] = useState<IGeoLocation[]>(
        []
    );
    const [allNeighbourhoods, setAllNeighbourhoods] = useState<IGeoLocation[]>(
        []
    );
    const [getMunicipalities] = useLazyGetMunicipalitiesQuery();
    const [getNeighbourhoods] = useLazyGetNeighbourhoodsQuery();

    useEffect(() => {
        const fetchAllMunicipalities = async () => {
            const municipalitiesData: IGeoLocation[] = [];

            for (const code of regionCodes) {
                const iCode = toNumberSafe(code);
                if (iCode === -1) continue;

                const { data: municipalities } = await getMunicipalities(+code);
                if (municipalities) {
                    municipalitiesData.push(...municipalities);
                }
            }

            setAllMunicipalities(municipalitiesData);
        };

        fetchAllMunicipalities();
    }, [regionCodes, getMunicipalities]);

    useEffect(() => {
        const fetchAllNeighbourhoods = async () => {
            const neighbourhoodsData: IGeoLocation[] = [];

            for (const code of cityCodes) {
                const iCode = toNumberSafe(code);
                if (iCode === -1) continue;

                const { data: neighbourhoods } = await getNeighbourhoods(+code);
                if (neighbourhoods) {
                    neighbourhoodsData.push(...neighbourhoods);
                }
            }

            setAllNeighbourhoods(neighbourhoodsData);
        };

        fetchAllNeighbourhoods();
    }, [cityCodes, getNeighbourhoods]);

    const { getHumanReadable } = useHumanReadableCallback();

    const renderListItem = (label: string, codes: string[], data: any) => (
        <ListItem
            label={t(label)}
            value={codes
                .map((code) => getHumanReadable(code, data))
                .filter(Boolean)
                .join(", ")}
        />
    );

    return (
        <Grid container>
            <Grid item xs={6}>
                <List>
                    {renderListItem("Region", regionCodes, regions)}
                    {renderListItem(
                        "Neighborhood",
                        complexCodes,
                        allNeighbourhoods
                    )}
                </List>
            </Grid>
            <Grid item xs={6}>
                <List>
                    {renderListItem("City", cityCodes, allMunicipalities)}
                </List>
            </Grid>
        </Grid>
    );
};

export default ViewLocationMini;

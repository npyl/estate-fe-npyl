import { List, ListItem } from "@/components/List";
import { IValuationRes } from "@/types/properties";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAllFilters } from "../Properties/FiltersContext";
import { useValuationByFiltersQuery } from "@/services/properties";
import Paper from "@mui/material/Paper";
import { Divider, SxProps, Theme } from "@mui/material";

const FakeData: IValuationRes = {
    normal: {
        min: 10,
        mid: 15,
        max: 20,
    },
    perSqm: {
        min: 10,
        mid: 15,
        max: 20,
    },
    smallSample: false,
};

const PaperSx: SxProps<Theme> = {};

interface ContentProps {
    valuation: IValuationRes;
}

const Content: FC<ContentProps> = ({ valuation }) => {
    const { t } = useTranslation();

    const { normal, perSqm } = valuation;

    return (
        <Paper component={Grid} container sx={PaperSx} elevation={20}>
            <Grid xs={12} sm={6}>
                <Typography pl={3} variant="h6" py={1}>
                    {t("General")}
                </Typography>
                <Divider />
                <List>
                    <ListItem label={t("Minimum")} value={normal.min ?? "-"} />
                    <ListItem label={t("Median")} value={normal.mid ?? "-"} />
                    <ListItem label={t("Maximum")} value={normal.max ?? "-"} />
                </List>
            </Grid>
            <Grid xs={12} sm={6}>
                <Typography pl={3} variant="h6" py={1}>
                    {t("Per (m²)")}
                </Typography>
                <Divider />
                <List>
                    <ListItem label={t("Minimum")} value={perSqm.min ?? "-"} />
                    <ListItem label={t("Median")} value={perSqm.mid ?? "-"} />
                    <ListItem label={t("Maximum")} value={perSqm.max ?? "-"} />
                </List>
            </Grid>
        </Paper>
    );
};

const Final = () => {
    const filters = useAllFilters();
    const { data } = useValuationByFiltersQuery(filters);

    // if (!data) return null;

    // if (data?.smallSample) return <RadiusPlaceholder />;

    return <Content valuation={FakeData} />;
};

export default Final;

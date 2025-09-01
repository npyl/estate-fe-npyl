import { List } from "@/components/List";
import { IValuationRes } from "@/types/properties";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import Paper from "@mui/material/Paper";
import { Divider, SxProps, Theme } from "@mui/material";
import ListItem from "./ListItem";

const PaperSx: SxProps<Theme> = {};

interface ContentProps {
    valuation: IValuationRes;
}

const Content: FC<ContentProps> = ({ valuation }) => {
    const { t } = useTranslation();

    const {
        minArea,
        averageArea,
        maxArea,
        // ...
        minPrice,
        averagePrice,
        maxPrice,
    } = valuation;

    return (
        <Paper component={Grid} container sx={PaperSx} elevation={20}>
            <Grid xs={12} sm={6}>
                <Typography pl={3} variant="h6" py={1}>
                    {t("Price")} (€)
                </Typography>
                <Divider />
                <List>
                    <ListItem label={t("Minimum")} value={minPrice} />
                    <ListItem label={t("Median")} value={averagePrice} />
                    <ListItem label={t("Maximum")} value={maxPrice} />
                </List>
            </Grid>
            <Grid xs={12} sm={6}>
                <Typography pl={3} variant="h6" py={1}>
                    {t("Area")} (m²)
                </Typography>
                <Divider />
                <List>
                    <ListItem label={t("Minimum")} value={minArea} />
                    <ListItem label={t("Median")} value={averageArea} />
                    <ListItem label={t("Maximum")} value={maxArea} />
                </List>
            </Grid>
        </Paper>
    );
};

export default Content;

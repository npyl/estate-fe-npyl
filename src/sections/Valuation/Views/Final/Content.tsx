import { List, ListItem } from "@/components/List";
import { IValuationRes } from "@/types/properties";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ContentProps {
    valuation: IValuationRes;
}

const Content: FC<ContentProps> = ({ valuation }) => {
    const { t } = useTranslation();

    const { normal, perSqm } = valuation;

    return (
        <Grid container>
            <Grid xs={12} sm={6}>
                <Typography pl={3} variant="h6">
                    {t("General")}
                </Typography>
                <List>
                    <ListItem label={t("Minimum")} value={normal.min ?? "-"} />
                    <ListItem label={t("Median")} value={normal.mid ?? "-"} />
                    <ListItem label={t("Maximum")} value={normal.max ?? "-"} />
                </List>
            </Grid>
            <Grid xs={12} sm={6}>
                <Typography pl={3} variant="h6">
                    {t("Per (m²)")}
                </Typography>
                <List>
                    <ListItem label={t("Minimum")} value={perSqm.min ?? "-"} />
                    <ListItem label={t("Median")} value={perSqm.mid ?? "-"} />
                    <ListItem label={t("Maximum")} value={perSqm.max ?? "-"} />
                </List>
            </Grid>
        </Grid>
    );
};

export default Content;

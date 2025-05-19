import { List } from "@/components/List";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";
import SkeletonListItem from "@/components/List/Items/skeleton";

const Skeleton = () => {
    const { t } = useTranslation();

    return (
        <Paper component={Grid} container elevation={20}>
            <Grid xs={12} sm={6}>
                <Typography pl={3} variant="h6" py={1}>
                    {t("Price")} (€)
                </Typography>
                <Divider />
                <List>
                    <SkeletonListItem label={t("Minimum")} />
                    <SkeletonListItem label={t("Median")} />
                    <SkeletonListItem label={t("Maximum")} />
                </List>
            </Grid>
            <Grid xs={12} sm={6}>
                <Typography pl={3} variant="h6" py={1}>
                    {t("Area")} (m²)
                </Typography>
                <Divider />
                <List>
                    <SkeletonListItem label={t("Minimum")} />
                    <SkeletonListItem label={t("Median")} />
                    <SkeletonListItem label={t("Maximum")} />
                </List>
            </Grid>
        </Paper>
    );
};

export default Skeleton;

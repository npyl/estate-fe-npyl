import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import { useGetDashboardQuery } from "src/services/dashboard";
import CardWithIcon from "./CardWithIcon";

const Cards = () => {
    const { t } = useTranslation();
    const { data } = useGetDashboardQuery();

    return (
        <>
            <Grid xs={12} sm={6} md={12} lg={3}>
                <CardWithIcon
                    title={data?.totalProperties.toString() ?? ""}
                    subtitle={t("Total Properties")}
                />
            </Grid>
            <Grid xs={12} sm={6} md={12} lg={3}>
                <CardWithIcon
                    title={data?.totalSoldProperties.toString() ?? ""}
                    subtitle={t("Total Sold Properties")}
                />
            </Grid>
            <Grid xs={12} sm={6} md={12} lg={3}>
                <CardWithIcon
                    title={data?.totalActiveProperties.toString() ?? ""}
                    subtitle={t("Total Active Properties")}
                    info={
                        t(
                            "The active properties are published in public sites."
                        ) as string
                    }
                />
            </Grid>
            <Grid xs={12} sm={6} md={12} lg={3}>
                <CardWithIcon
                    title={data?.totalRentedProperties.toString() ?? ""}
                    subtitle={t("Total Rented Properties")}
                />
            </Grid>
        </>
    );
};

export default Cards;

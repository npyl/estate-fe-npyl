import { Box, Divider, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { List, ListItem } from "@/components/List";
import PanelWithQuickView from "../PanelWithQuickView";
import useGetProperty from "@/sections/Properties/hooks/useGetProperty";

const BalconiesSection = () => {
    const { property } = useGetProperty();
    const { t } = useTranslation();
    const details = property?.details;
    const balconies = details?.balconies || [];

    if (balconies.length === 0) return null;

    return (
        <PanelWithQuickView hideHeader label="BalconiesSection">
            {balconies?.map((balcony, index) => (
                <Box key={balcony.id} borderRadius={1}>
                    <Typography variant="h6" p={1} px={2.5}>
                        {t("Balcony No.")}
                        {index + 1}
                    </Typography>
                    <Divider />
                    <Grid container spacing={1}>
                        <Grid item xs={12} order={"row"} padding={0}>
                            <List>
                                <ListItem
                                    label={t("Living Space")}
                                    value={balcony?.area}
                                />
                                <ListItem
                                    label={t("Side")}
                                    value={balcony?.side.value}
                                />
                            </List>
                        </Grid>
                    </Grid>
                </Box>
            ))}
        </PanelWithQuickView>
    );
};

export default BalconiesSection;

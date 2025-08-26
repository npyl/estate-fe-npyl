import { Box, Divider, Typography } from "@mui/material";
import { List, ListItem } from "src/components/List";
import { useTranslation } from "react-i18next";
import PanelWithQuickView from "../PanelWithQuickView";
import useGetProperty from "@/sections/Properties/hooks/useGetProperty";

const ParkingsSection = () => {
    const { property } = useGetProperty();
    const parkings = property?.details?.parkings;
    const { t } = useTranslation();

    if (property?.parentCategory.key !== "RESIDENTIAL") return null;
    if (!parkings) return null;
    if (parkings.length === 0) return null;

    return (
        <PanelWithQuickView hideHeader label="ParkingsSection">
            {parkings?.map((parking, index) => (
                <Box key={index}>
                    <Box
                        sx={{
                            px: 3,
                            py: 1.5,
                            display: "flex",
                            justifyContent: "left",
                        }}
                    >
                        <Typography variant="h6">
                            {t("Parking No.")}
                            {index + 1}
                        </Typography>
                    </Box>
                    <Divider />
                    <List>
                        <ListItem
                            label={t("Parking Type")}
                            value={parking?.parkingType.value}
                        />
                        <ListItem label={t("Spots")} value={parking?.spots} />
                    </List>
                </Box>
            ))}
        </PanelWithQuickView>
    );
};

export default ParkingsSection;

import React from "react";
import { IProperties } from "src/types/properties";
import CarouselWithLightbox from "src/components/CarouselWithLightbox";
import { Typography, Box, Paper, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import ICarouselImage from "src/components/carousel/types";

interface BlueprintsSectionProps {
    data: IProperties;
}

const BlueprintsSection: React.FC<BlueprintsSectionProps> = ({
    data: { blueprints },
}) => {
    const { t } = useTranslation();

    return (
        <Paper elevation={10} sx={{ overflow: "auto" }}>
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">{t("Blueprints")}</Typography>
            </Box>
            <Divider></Divider>

            <CarouselWithLightbox data={blueprints as ICarouselImage[]} />
        </Paper>
    );
};

export default BlueprintsSection;

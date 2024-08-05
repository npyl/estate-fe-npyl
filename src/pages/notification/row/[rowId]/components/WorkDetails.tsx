import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import { t } from "i18next";

interface WorkDetailsProps {
    workForUs: any;
    truePositions: any;
}

const WorkDetails: React.FC<WorkDetailsProps> = ({
    workForUs,
    truePositions,
}) => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            gap={7}
            ml={3}
            justifyContent="center"
        >
            <Stack direction="row" alignItems="center" gap={0.5}>
                <Typography fontWeight="bold">{t("Location")}:</Typography>
                <Typography variant="body2" color="text.secondary">
                    {workForUs?.workRegion?.nameGR}
                </Typography>
            </Stack>
            <Stack flexDirection="row">
                <Typography fontWeight="bold">
                    {t("Working positions")}:
                </Typography>
                <Box flexDirection="row" display="flex" gap={2} ml={2}>
                    {truePositions.map((position: any) => (
                        <li key={position}>{position}</li>
                    ))}
                </Box>
            </Stack>
        </Stack>
    );
};

export default WorkDetails;

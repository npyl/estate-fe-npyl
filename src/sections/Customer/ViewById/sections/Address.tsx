import { Box, Divider, Paper, Typography } from "@mui/material";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ViewLocation } from "src/components/Location/View";
import useGetCustomer from "@/hooks/customer";

const AddressSection: React.FC = () => {
    const { t } = useTranslation();
    const { customer } = useGetCustomer();
    const location = customer?.location;

    if (!location) return null;

    return (
        <Paper
            elevation={10}
            sx={{
                overflow: "auto",
                padding: 0,
            }}
        >
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">{t("Address Details")}</Typography>
            </Box>
            <Divider />
            <ViewLocation location={location} />
        </Paper>
    );
};

export default AddressSection;

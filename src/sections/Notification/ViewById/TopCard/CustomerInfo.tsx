import React from "react";
import { Box, Typography } from "@mui/material";
import { LocalPhone, Email } from "@mui/icons-material";
import useGetNotification from "@/sections/Notification/useGetNotification";

const CustomerInfo = () => {
    const { notification } = useGetNotification();
    const { customerEmail, customerMobile } = notification || {};

    return (
        <Box display="flex" flexDirection="row" gap={7}>
            <Typography display="flex" alignItems="center">
                <LocalPhone
                    sx={{
                        color: "black",
                        fontSize: "medium",
                        mr: 1,
                    }}
                />
                {customerMobile}
            </Typography>
            <Typography display="flex" alignItems="center">
                <Email
                    sx={{
                        color: "black",
                        fontSize: "medium",
                        mr: 1,
                    }}
                />
                {customerEmail}
            </Typography>
        </Box>
    );
};

export default CustomerInfo;

import React from "react";
import { Box, Typography } from "@mui/material";
import { LocalPhone, Email } from "@mui/icons-material";

interface CustomerInfoProps {
    customerMobile: string;
    customerEmail: string;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({
    customerMobile,
    customerEmail,
}) => {
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

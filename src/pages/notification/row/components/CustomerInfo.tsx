import React from "react";
import { Stack, Typography } from "@mui/material";
import LocalPhone from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";

interface CustomerInfoProps {
    customerMobile: string;
    customerEmail: string;
    tourType?: string;
    tourDate?: string;
    tourTime?: string;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({
    customerMobile,
    customerEmail,
    tourType,
    tourDate,
    tourTime,
}) => {
    return (
        <Stack
            flexDirection="row"
            gap={2}
            alignItems="center"
            mt={tourType || tourDate || tourTime ? 0.5 : 3}
        >
            <Typography variant="body2" display="flex" alignItems="center">
                <LocalPhone
                    sx={{
                        color: "black",
                        fontSize: "medium",
                        mr: 1,
                    }}
                />
                {customerMobile}
            </Typography>
            <Typography variant="body2" display="flex" alignItems="center">
                <EmailIcon
                    sx={{
                        color: "black",
                        fontSize: "medium",
                        mr: 1,
                    }}
                />
                {customerEmail}
            </Typography>
        </Stack>
    );
};

export default CustomerInfo;

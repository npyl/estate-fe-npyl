import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import ExpireIcon from "@mui/icons-material/WarningAmber"; // Use appropriate icon
import ExpiredIcon from "@mui/icons-material/Cancel"; // Use appropriate icon
import { NormalBadge } from "@/components/PropertyCard/styled";

// Define the necessary interfaces
interface OwnerAgreement {
    id: number;
    name: string;
}

interface PropertyAgreement {
    id: number;
    code: string;
}

interface KeyValue {
    key: string;
    value: string;
}

interface AgreementDetails {
    active: boolean;
    code: string;
    expirationDate: string;
    expiredToday: boolean;
    expiresSoon: boolean;
    id: number;
    owner: OwnerAgreement;
    property: PropertyAgreement;
    title: string;
    variant: KeyValue;
}

interface AgreementDetailsProps {
    row: {
        agreement: AgreementDetails;
        message: string;
    };
    t: (key: string) => string;
    handlePropertyCodeClick: (event: React.MouseEvent) => void;
    handleCustomerNameClick: (event: React.MouseEvent) => void;
}

const AgreementDetails: React.FC<AgreementDetailsProps> = ({
    row,
    t,
    handlePropertyCodeClick,
    handleCustomerNameClick,
}) => (
    <Box>
        <Typography fontWeight="bold">{row?.agreement?.title}</Typography>
        <Box>
            <Typography variant="body2" mt={0.5}>
                {row?.message}
            </Typography>

            <Stack direction="row" mt={0.5} gap={0.5} alignItems="center">
                <Typography variant="body2">For property with </Typography>
                <Link
                    href={`/property/${row?.agreement?.property?.id}`}
                    passHref
                    style={{ textDecoration: "none" }}
                >
                    <NormalBadge
                        name={`${t("Code")}: ${
                            row?.agreement?.property?.code || ""
                        }`}
                        color={"#ffcc00"}
                        sx={{
                            color: "#854D0E",
                            width: "100%",
                            "&:hover": {
                                backgroundColor: "#e6b800",
                            },
                        }}
                        onClick={handlePropertyCodeClick}
                    />
                </Link>
            </Stack>
            <Link
                href={`/customer/${row?.agreement?.owner?.id}`}
                passHref
                style={{ textDecoration: "none" }}
            >
                <Typography
                    variant="body2"
                    onClick={handleCustomerNameClick}
                    mt={0.5}
                >
                    Owner: {row?.agreement?.owner?.name}
                </Typography>
            </Link>
            <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="body2" mt={0.5}>
                    Expiration Date: {row?.agreement?.expirationDate}
                </Typography>
                <Stack direction="row" gap={1} alignItems="center">
                    {row?.agreement?.expiresSoon && (
                        <Tooltip title="Expires soon" placement="top">
                            <ExpireIcon
                                color="warning"
                                sx={{ width: "21px", height: "21px" }}
                            />
                        </Tooltip>
                    )}
                    {row?.agreement?.expiredToday && (
                        <Tooltip title="Expired" placement="top">
                            <ExpiredIcon
                                color="error"
                                sx={{ width: "21px", height: "21px" }}
                            />
                        </Tooltip>
                    )}
                </Stack>
            </Stack>
        </Box>
    </Box>
);

export default AgreementDetails;

import React, { FC } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import {
    IconButton,
    SvgIcon,
    Tooltip,
    TooltipProps,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const CrossedGoogleIcon = () => (
    <SvgIcon>
        <GoogleIcon />
        <path
            d="M22 2L2 22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </SvgIcon>
);

const DisabledIndicator: FC<Omit<TooltipProps, "title" | "children">> = (
    props
) => {
    const { t } = useTranslation();
    return (
        <Tooltip
            title={
                <Typography>
                    {t("Not integrated. Please go to Settings -> Integrations")}
                </Typography>
            }
            {...props}
        >
            <IconButton>
                <CrossedGoogleIcon />
            </IconButton>
        </Tooltip>
    );
};

export default DisabledIndicator;

import { FC } from "react";
import { IconButton, Tooltip, TooltipProps, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CrossedGoogleIcon from "@/assets/logo/CrossedGoogleLogo";

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

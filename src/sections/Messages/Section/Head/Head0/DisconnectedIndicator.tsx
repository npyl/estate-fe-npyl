import HideSourceIcon from "@mui/icons-material/HideSource";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";

const DisconnectedIndicator = () => {
    const { t } = useTranslation();

    return (
        <Tooltip title={t("Disconnected")}>
            <IconButton color="error">
                <HideSourceIcon />
            </IconButton>
        </Tooltip>
    );
};

export default DisconnectedIndicator;

import { Button } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import LocationOffIcon from "@mui/icons-material/LocationOff";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { HideText } from "@/components/styled";

interface PinLockProps {
    locked: boolean;
    onToggle: VoidFunction;
}

const PinLock: FC<PinLockProps> = ({ locked, onToggle }) => {
    const { t } = useTranslation();

    return (
        <Button
            variant="contained"
            onClick={onToggle}
            endIcon={locked ? <LocationOffIcon /> : <LocationOnIcon />}
            sx={HideText}
        >
            {locked ? t("Locked Pin") : t("Free Pin")}
        </Button>
    );
};

export default PinLock;

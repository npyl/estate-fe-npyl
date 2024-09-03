import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import LocationOffIcon from "@mui/icons-material/LocationOff";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface PinLockProps {
    locked: boolean;
    onToggle: VoidFunction;
}

const PinLock: FC<PinLockProps> = ({ locked, onToggle }) => {
    const { t } = useTranslation();

    return (
        <Stack position="absolute" top={60} right={10}>
            <Button
                variant="contained"
                onClick={onToggle}
                endIcon={locked ? <LocationOffIcon /> : <LocationOnIcon />}
            >
                {locked ? t("Locked Pin") : t("Free Pin")}
            </Button>
        </Stack>
    );
};

export default PinLock;

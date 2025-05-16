import { Button } from "@mui/material";
import { FC, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface ClearButtonProps {
    DEFAULT_VALUES: any;
}

const ClearButton: FC<ClearButtonProps> = ({ DEFAULT_VALUES }) => {
    const { t } = useTranslation();
    const { reset } = useFormContext();
    const onClear = useCallback(
        () => reset(DEFAULT_VALUES),
        [reset, DEFAULT_VALUES]
    );
    return (
        <Button variant="outlined" color="secondary" onClick={onClear}>
            {t("Clear")}
        </Button>
    );
};

export default ClearButton;

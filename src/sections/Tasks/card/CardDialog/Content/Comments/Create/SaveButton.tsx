import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { SxProps, Theme } from "@mui/material/styles";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const SaveButtonSx: SxProps<Theme> = {
    borderRadius: "12px",
};

interface SaveButtonProps {
    value?: string;
}

const SaveButton: FC<SaveButtonProps> = ({ value }) => {
    const { t } = useTranslation();
    return (
        <InputAdornment position="end">
            <Button disabled={!value} variant="contained" sx={SaveButtonSx}>
                {t("Add")}
            </Button>
        </InputAdornment>
    );
};

export default SaveButton;

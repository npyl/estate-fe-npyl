import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import CancelIcon from "@mui/icons-material/Cancel";

interface ActionsProps {
    onCancel: VoidFunction;
}

const Actions: FC<ActionsProps> = ({ onCancel }) => {
    const { t } = useTranslation();

    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="flex-end"
            mt={1}
        >
            <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={onCancel}
            >
                {t("Cancel")}
            </Button>

            <Button type="submit" variant="contained">
                {t("Save")}
            </Button>
        </Stack>
    );
};

export default Actions;

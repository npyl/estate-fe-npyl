import { Button, Stack } from "@mui/material";
import SoftButton from "@/components/SoftButton";
import { useTranslation } from "react-i18next";
import { FC } from "react";

interface ActionsProps {
    loading: boolean;
    onDelete: VoidFunction;
    onClose?: VoidFunction;
}

const Actions: FC<ActionsProps> = ({ loading, onDelete, onClose }) => {
    const { t } = useTranslation();

    return (
        <Stack direction="row" justifyContent="center" spacing={1} width={1}>
            <Button
                sx={{ mr: 1 }}
                variant="outlined"
                color="secondary"
                onClick={onClose}
            >
                {t("No")}
            </Button>

            <SoftButton
                loading={loading}
                disabled={loading}
                color="error"
                onClick={onDelete}
            >
                {t("Yes")}
            </SoftButton>
        </Stack>
    );
};

export default Actions;

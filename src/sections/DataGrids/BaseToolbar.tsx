import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

interface BaseToolbarProps {
    loading: boolean;
    onBulkEditClick: VoidFunction;
    onBulkDeleteClick: VoidFunction;
}

const BaseToolbar: FC<BaseToolbarProps> = ({
    loading,
    onBulkEditClick,
    onBulkDeleteClick,
}) => {
    const { t } = useTranslation();

    return (
        <Stack direction="row" justifyContent="flex-end" my={1} spacing={1}>
            <LoadingButton
                loading={loading}
                variant="contained"
                onClick={onBulkEditClick}
                startIcon={<EditNoteIcon />}
            >
                {t("Edit")}
            </LoadingButton>

            <LoadingButton
                loading={loading}
                variant="contained"
                color="error"
                onClick={onBulkDeleteClick}
                startIcon={<DeleteIcon />}
            >
                {t("Delete")}
            </LoadingButton>
        </Stack>
    );
};

export default BaseToolbar;

import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import { FC, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

interface BaseToolbarProps extends PropsWithChildren {
    isDeleting: boolean;
    isEditing: boolean;
    onBulkEditClick: VoidFunction;
    onBulkDeleteClick?: VoidFunction;
}

const BaseToolbar: FC<BaseToolbarProps> = ({
    isDeleting,
    isEditing,
    onBulkEditClick,
    onBulkDeleteClick,
    children,
}) => {
    const { t } = useTranslation();

    return (
        <Stack direction="row" justifyContent="flex-end" my={1} spacing={1}>
            {children}

            <LoadingButton
                loading={isEditing}
                disabled={isEditing}
                variant="contained"
                onClick={onBulkEditClick}
                startIcon={<EditNoteIcon />}
            >
                {t("Edit")}
            </LoadingButton>

            {onBulkDeleteClick ? (
                <LoadingButton
                    loading={isDeleting}
                    disabled={isDeleting}
                    variant="contained"
                    color="error"
                    onClick={onBulkDeleteClick}
                    startIcon={<DeleteIcon />}
                >
                    {t("Delete")}
                </LoadingButton>
            ) : null}
        </Stack>
    );
};

export default BaseToolbar;

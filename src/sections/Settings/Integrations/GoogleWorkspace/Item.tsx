import { FC, useCallback } from "react";
import BaseItem from "../BaseItem";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import {
    useDeleteGoogleWorkspaceMutation,
    useIsGoogleWorkspaceIntegratedQuery,
} from "@/services/company";
import { LoadingButton } from "@mui/lab";
import { alpha } from "@mui/material";

const RemoveButton = () => {
    const { t } = useTranslation();
    const [deleteWorkspace, { isLoading }] = useDeleteGoogleWorkspaceMutation();
    const handleDelete = useCallback(() => deleteWorkspace(), []);
    return (
        <LoadingButton
            color="error"
            loading={isLoading}
            disabled={isLoading}
            onClick={handleDelete}
        >
            {t("Delete")}
        </LoadingButton>
    );
};

// -----------------------------------------------------------------------------

interface PlaceholderProps extends TypographyProps {
    integrated: boolean;
}

const Placeholder: FC<PlaceholderProps> = ({ integrated, ...props }) => {
    const { t } = useTranslation();

    if (integrated)
        return (
            <Typography {...props}>
                {t("Integrated. You can change workspace if you'd like.")}
            </Typography>
        );

    return (
        <Typography {...props}>
            {t(
                "Not integrated. Please edit to support features like Calendar."
            )}
        </Typography>
    );
};

// -----------------------------------------------------------------------------

interface ItemProps {
    onEdit: VoidFunction;
}

const Item: FC<ItemProps> = ({ onEdit }) => {
    const { data: isIntegrated } = useIsGoogleWorkspaceIntegratedQuery();

    return (
        <BaseItem
            type="Google Workspace"
            topRightContent={isIntegrated ? <RemoveButton /> : undefined}
            onEdit={onEdit}
        >
            <Placeholder
                integrated={Boolean(isIntegrated)}
                p={2}
                variant="body1"
                color="text.secondary"
            />
        </BaseItem>
    );
};

export default Item;

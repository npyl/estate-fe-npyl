import { FC, useCallback } from "react";
import BaseItem from "../BaseItem";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import {
    useDeleteGoogleWorkspaceMutation,
    useIsGoogleWorkspaceIntegratedQuery,
} from "@/services/company";
import { LoadingButton } from "@mui/lab";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import OriginalGoogleLogo from "@/assets/logo/OriginalGoogleLogo";
import { useAuth } from "@/hooks/use-auth";
const ConfirmationDialog = dynamic(() => import("./ConfirmDialog"));

interface RemoveButtonProps {
    domain: string;
}

const RemoveButton: FC<RemoveButtonProps> = ({ domain }) => {
    const { t } = useTranslation();

    const { user } = useAuth();

    const [deleteWorkspace, { isLoading }] = useDeleteGoogleWorkspaceMutation();
    const handleDelete = useCallback(
        () => deleteWorkspace(user?.id!),
        [user?.id]
    );

    const [isDelete, openDelete, closeDelete] = useDialog();

    return (
        <>
            <Typography variant="body2" color="text.secondary">
                {domain}
            </Typography>

            <LoadingButton
                color="error"
                loading={isLoading}
                disabled={isLoading}
                onClick={openDelete}
            >
                {t("Delete")}
            </LoadingButton>

            {isDelete ? (
                <ConfirmationDialog
                    onConfirm={handleDelete}
                    onClose={closeDelete}
                />
            ) : null}
        </>
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
    const { data } = useIsGoogleWorkspaceIntegratedQuery();

    const isIntegrated = data?.isIntegrated;

    const topRightContent = isIntegrated ? (
        <RemoveButton domain={data?.domain} />
    ) : null;

    return (
        <BaseItem
            Icon={OriginalGoogleLogo}
            type="Google Workspace"
            topRightContent={topRightContent}
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

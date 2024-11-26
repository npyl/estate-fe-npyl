import {
    useBulkDeletePropertiesMutation,
    useBulkEditPropertiesMutation,
} from "@/services/properties";
import { FC, useCallback } from "react";
import BaseToolbar from "@/sections/DataGrids/BaseToolbar";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import { useAuth } from "@/hooks/use-auth";
const DeleteDialog = dynamic(() => import("@/components/Dialog/Delete"));
const BulkEdit = dynamic(() => import("./BulkEdit"));
const BulkArchiveButton = dynamic(() => import("./BulkArchiveButton"));
const BulkRestoreButton = dynamic(() => import("./BulkRestoreButton"));

interface ToolbarProps {
    archived: boolean;
    selectedRows: number[];
}

const PropertiesToolbar: FC<ToolbarProps> = ({ archived, selectedRows }) => {
    const { user } = useAuth();
    const isAdmin = user?.isAdmin;

    const [isBulkEditOpen, openBulkEdit, closeBulkEdit] = useDialog();
    const [isBulkDeleteOpen, openBulkDelete, closeBulkDelete] = useDialog();

    const [bulkDelete, { isLoading: isDeleting }] =
        useBulkDeletePropertiesMutation();

    const [bulkEdit, { isLoading: isEditing }] =
        useBulkEditPropertiesMutation();

    // Bulk Delete
    const handleBulkDelete = useCallback(
        () => bulkDelete(selectedRows),
        [selectedRows]
    );

    return (
        <>
            <BaseToolbar
                isDeleting={isDeleting}
                isEditing={isEditing}
                onBulkEditClick={openBulkEdit}
                onBulkDeleteClick={isAdmin ? openBulkDelete : undefined}
            >
                {!archived ? (
                    <BulkArchiveButton selectedRows={selectedRows} />
                ) : null}

                {archived ? (
                    <BulkRestoreButton selectedRows={selectedRows} />
                ) : null}
            </BaseToolbar>

            {isBulkEditOpen ? (
                <BulkEdit
                    open={isBulkEditOpen}
                    selectedIds={selectedRows}
                    onSave={bulkEdit}
                    onClose={closeBulkEdit}
                />
            ) : null}

            {isBulkDeleteOpen ? (
                <DeleteDialog
                    multiple
                    open={isBulkDeleteOpen}
                    onClose={closeBulkDelete}
                    onDelete={handleBulkDelete}
                />
            ) : null}
        </>
    );
};

export default PropertiesToolbar;

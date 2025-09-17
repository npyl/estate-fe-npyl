import {
    IPropertyFilterParams,
    useBulkDeletePermanentPropertiesMutation,
    useBulkEditPropertiesMutation,
} from "@/services/properties";
import { FC, useCallback } from "react";
import BaseToolbar from "@/sections/DataGrids/BaseToolbar";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import { useAuth } from "@/sections/use-auth";
import Share from "./Share";
import { defaultValues } from "./constants";
const DeleteDialog = dynamic(() => import("@/components/DialogDelete"));
const BulkEdit = dynamic(() => import("./BulkEdit"));
const BulkArchiveButton = dynamic(() => import("./BulkArchiveButton"));
const BulkRestoreButton = dynamic(() => import("./BulkRestoreButton"));

// ------------------------------------------------------------------------------

const getTabPathForId = (id: number) => [
    `/property/${id}`,
    `/property/edit/${id}`,
];

const getTabPaths = (ids: number[]) => ids.map(getTabPathForId).flat();

// ------------------------------------------------------------------------------

interface ToolbarProps {
    archived: boolean;
    selectedRows: number[];
    filters: IPropertyFilterParams;
}

const PropertiesToolbar: FC<ToolbarProps> = ({
    archived,
    selectedRows,
    filters,
}) => {
    const { user } = useAuth();
    const isAdmin = user?.isAdmin;

    const [isBulkEditOpen, openBulkEdit, closeBulkEdit] = useDialog();
    const [isBulkDeleteOpen, openBulkDelete, closeBulkDelete] = useDialog();

    const [bulkDeletePermanent, { isLoading: isDeleting }] =
        useBulkDeletePermanentPropertiesMutation();

    const [bulkEdit, { isLoading: isEditing }] =
        useBulkEditPropertiesMutation();

    // Bulk Delete
    const handleBulkDelete = useCallback(
        () =>
            bulkDeletePermanent({
                tabPaths: getTabPaths(selectedRows),
                props: selectedRows,
            }),
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
                <Share selectedRows={selectedRows} filters={filters} />

                {!archived ? (
                    <BulkArchiveButton selectedRows={selectedRows} />
                ) : null}

                {archived ? (
                    <BulkRestoreButton selectedRows={selectedRows} />
                ) : null}
            </BaseToolbar>

            {isBulkEditOpen ? (
                <BulkEdit
                    DEFAULT_VALUES={defaultValues}
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

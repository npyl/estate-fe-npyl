import { FC, useCallback } from "react";
import {
    useBulkDeleteCustomersMutation,
    useBulkEditCustomersMutation,
} from "@/services/customers";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import BaseToolbar from "@/sections/DataGrids/BaseToolbar";
const BulkEdit = dynamic(() => import("./(BulkEdit)"));
const DeleteDialog = dynamic(() => import("@/components/Dialog/Delete"));

interface ToolbarProps {
    selectedRows: number[];
}

const CustomersToolbar: FC<ToolbarProps> = ({ selectedRows }) => {
    const [isBulkEditOpen, openBulkEdit, closeBulkEdit] = useDialog();
    const [isBulkDeleteOpen, openBulkDelete, closeBulkDelete] = useDialog();

    const [bulkDelete, { isLoading: isDeleting }] =
        useBulkDeleteCustomersMutation();

    const [bulkEdit, { isLoading: isEditing }] = useBulkEditCustomersMutation();

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
                onBulkDeleteClick={openBulkDelete}
            />

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

export default CustomersToolbar;

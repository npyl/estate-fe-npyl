import { FC, useCallback } from "react";
import {
    useBulkDeleteCustomersMutation,
    useBulkEditCustomersMutation,
} from "@/services/customers";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import BaseToolbar from "@/sections/DataGrids/BaseToolbar";
import ShareButton from "./Share";
const BulkEdit = dynamic(() => import("./(BulkEdit)"));
const DeleteDialog = dynamic(() => import("@/components/Dialog/Delete"));

// --------------------------------------------------------------------------------

const getTabPath = (id: number) => `/customer/${id}`;

// --------------------------------------------------------------------------------

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
        () =>
            bulkDelete({
                tabPaths: selectedRows.map(getTabPath),
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
                onBulkDeleteClick={openBulkDelete}
            >
                <ShareButton selectedRows={selectedRows} />
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

export default CustomersToolbar;

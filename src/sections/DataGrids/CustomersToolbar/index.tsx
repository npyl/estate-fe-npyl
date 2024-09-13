import { FC } from "react";
import { useBulkDeleteCustomersMutation } from "@/services/customers";
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

    const [bulkDeleteCustomers, { isLoading }] =
        useBulkDeleteCustomersMutation();

    // Bulk Delete
    const handleBulkDelete = () => bulkDeleteCustomers(selectedRows);

    return (
        <>
            <BaseToolbar
                loading={isLoading}
                onBulkEditClick={openBulkEdit}
                onBulkDeleteClick={openBulkDelete}
            />

            {isBulkEditOpen ? (
                <BulkEdit
                    open={isBulkEditOpen}
                    selectedIds={selectedRows}
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

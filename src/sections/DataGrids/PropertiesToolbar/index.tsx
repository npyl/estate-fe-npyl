import { useBulkDeletePropertiesMutation } from "@/services/properties";
import { FC } from "react";
import BaseToolbar from "@/sections/DataGrids/BaseToolbar";
import useDialog from "@/hooks/useDialog";
import { BulkEdit } from "./BulkEdit/BulkEdit";
import DeleteDialog from "@/components/Dialog/Delete";

interface ToolbarProps {
    selectedRows: number[];
}

const PropertiesToolbar: FC<ToolbarProps> = ({ selectedRows }) => {
    const [isBulkEditOpen, openBulkEdit, closeBulkEdit] = useDialog();
    const [isBulkDeleteOpen, openBulkDelete, closeBulkDelete] = useDialog();

    const [bulkDeleteProperties, { isLoading }] =
        useBulkDeletePropertiesMutation();

    // Bulk Delete
    const handleBulkDelete = () => bulkDeleteProperties(selectedRows);

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

export default PropertiesToolbar;

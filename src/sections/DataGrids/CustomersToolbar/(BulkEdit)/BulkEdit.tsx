import { EditManager } from "./Edit";
import { EditLabels } from "@/sections/DataGrids/PropertiesToolbar/BulkEdit/EditLabels";
import { useMemo, useState } from "react";
import { BulkEditDrawer } from "@/sections/DataGrids/BulkEditDrawer";
import {
    BulkEditRequest,
    useBulkEditCustomersMutation,
} from "src/services/customers";

type StateType = {
    managerId: string;
    labels: number[];
};

interface BulkEditProps {
    open: boolean;
    selectedIds: number[];
    onClose: () => void;
}

const BulkEdit = ({ open, selectedIds, onClose }: BulkEditProps) => {
    const [managerId, setManagerId] = useState<StateType["managerId"]>("");
    const [labels, setLabels] = useState<StateType["labels"]>([]);

    const [bulkEdit] = useBulkEditCustomersMutation();

    const initialState: StateType = useMemo(
        () => ({
            managerId: "",
            labels: [],
        }),
        []
    );

    const currentState: StateType = useMemo(
        () => ({
            managerId,
            labels,
        }),
        [managerId, labels]
    );

    const changed: Partial<StateType> = useMemo(() => {
        return (Object.keys(currentState) as Array<keyof StateType>)
            .filter((key) => {
                if (
                    Array.isArray(currentState[key]) &&
                    Array.isArray(initialState[key])
                ) {
                    return (
                        JSON.stringify(currentState[key]) !==
                        JSON.stringify(initialState[key])
                    );
                } else {
                    return currentState[key] !== initialState[key];
                }
            })
            .reduce((acc: Partial<StateType>, key: keyof StateType) => {
                // INFO: Cast currentState[key] to `any` to avoid type errors
                if (key !== "labels" && !isNaN(Number(currentState[key]))) {
                    // every string except state is expected to be int in Backend
                    acc[key] = parseInt(currentState[key] as string, 10) as any;
                } else {
                    acc[key] = currentState[key] as any;
                }
                return acc;
            }, {});
    }, [managerId, labels]);

    const clearState = () => {
        setManagerId("");
        setLabels([]);
    };

    const handleSave = () => {
        bulkEdit({
            ...changed,
            customerIds: selectedIds,
        } as BulkEditRequest).then(() => {
            clearState();
            onClose();
        });
    };

    const handleClose = () => {
        clearState();
        onClose();
    };

    const handleClear = () => clearState();

    return (
        <BulkEditDrawer
            open={open}
            changed={changed}
            onSave={handleSave}
            onClear={handleClear}
            onClose={handleClose}
        >
            <EditManager data={managerId} setData={setManagerId} />
            <EditLabels variant="customer" data={labels} setData={setLabels} />
        </BulkEditDrawer>
    );
};

export default BulkEdit;

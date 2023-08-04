import { EditLabels, EditManager } from "./Edit";
import { useMemo, useState } from "react";
import { BulkEditDrawer } from "src/pages/components/BulkEditDrawer";
import { useBulkEditPropertiesMutation } from "src/services/properties";

interface BulkEditProps {
    open: boolean;
    selectedIds: number[];
    onClose: () => void;
}

export const BulkEdit = ({ open, selectedIds, onClose }: BulkEditProps) => {
    type StateType = {
        manager: string;
        labels: number[];
    };

    const [manager, setManager] = useState<StateType["manager"]>("");
    const [labels, setLabels] = useState<StateType["labels"]>([]);

    const [bulkEdit] = useBulkEditPropertiesMutation();

    const initialState: StateType = useMemo(
        () => ({
            manager: "",
            labels: [],
        }),
        []
    );

    const currentState: StateType = useMemo(
        () => ({
            manager,
            labels,
        }),
        [manager, labels]
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
    }, [manager, labels]);

    const handleSave = () => {
        //console.log("changed: ", changed);
        // bulkEdit({ ...changed, ids: selectedIds } as BulkEditRequest);
    };

    return (
        <BulkEditDrawer
            open={open}
            selectedIds={selectedIds}
            changed={changed}
            onSave={handleSave}
            onClose={onClose}
        >
            <EditManager data={manager} setData={setManager} />
            <EditLabels data={labels} setData={setLabels} />
        </BulkEditDrawer>
    );
};

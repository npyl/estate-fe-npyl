import { EditManager } from "./Edit";
import { EditLabels } from "@/sections/DataGrids/PropertiesToolbar/BulkEdit/EditLabels";
import { useCallback, useMemo, useState } from "react";
import { BulkEditDrawer } from "@/sections/DataGrids/BulkEditDrawer";
import { BulkEditRequest } from "src/services/customers";
import StayUpdated from "./StayUpdated";

type StateType = {
    managerId: string;
    labels: number[];
    enableEmails: boolean | "";
};

interface BulkEditProps {
    open: boolean;
    selectedIds: number[];
    onSave: (req: BulkEditRequest) => Promise<any>;
    onClose: () => void;
}

const BulkEdit = ({ open, selectedIds, onSave, onClose }: BulkEditProps) => {
    const [managerId, setManagerId] = useState<StateType["managerId"]>("");
    const [labels, setLabels] = useState<StateType["labels"]>([]);
    const [enableEmails, setEnableEmails] = useState<boolean | "">("");

    const initialState: StateType = useMemo(
        () => ({
            managerId: "",
            labels: [],
            enableEmails: "",
        }),
        []
    );

    const currentState: StateType = {
        managerId,
        labels,
        enableEmails,
    };

    const changed = useMemo(() => {
        const changedFields: Partial<StateType> = {};

        // Check managerId - convert to number if it's a valid numeric string
        if (managerId !== initialState.managerId) {
            changedFields.managerId = managerId;
        }

        // Check labels - include if array contents have changed
        if (
            labels.length > 0 ||
            (initialState.labels.length > 0 && labels.length === 0)
        ) {
            changedFields.labels = labels;
        }

        // Check enableEmails - include if it's been set to a boolean value
        if (
            enableEmails !== initialState.enableEmails &&
            typeof enableEmails === "boolean"
        ) {
            changedFields.enableEmails = enableEmails;
        }

        return changedFields;
    }, [managerId, labels, enableEmails]);

    const clearState = () => {
        setManagerId("");
        setLabels([]);
        setEnableEmails(false);
    };

    const handleSave = async () => {
        const req = {
            ...changed,
            customerIds: selectedIds,
        } as BulkEditRequest;

        await onSave(req);

        clearState();
        onClose();
    };

    const handleClose = () => {
        clearState();
        onClose();
    };

    const handleClear = () => clearState();

    const handleStayUpdatedChange = useCallback(
        (_: any, v: boolean | "") => setEnableEmails(v),
        []
    );

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
            <StayUpdated
                value={enableEmails}
                onChange={handleStayUpdatedChange}
            />
        </BulkEditDrawer>
    );
};

export default BulkEdit;

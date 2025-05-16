import EditManager from "./Edit";
import EditLabels from "@/sections/DataGrids/PropertiesToolbar/BulkEdit/EditLabels";
import BulkEditDrawer from "@/sections/DataGrids/BulkEditDrawer";
import { BulkEditRequest } from "src/services/customers";
import StayUpdated from "./StayUpdated";

type StateType = {
    managerId: string;
    labels: number[];
    enableEmails: boolean | "";
};

const initialState: StateType = {
    managerId: "",
    labels: [],
    enableEmails: "",
};

interface BulkEditProps {
    open: boolean;
    selectedIds: number[];
    onSave: (req: BulkEditRequest) => Promise<any>;
    onClose: () => void;
}

const BulkEdit = ({ selectedIds, onSave, onClose }: BulkEditProps) => (
    <BulkEditDrawer<StateType, BulkEditRequest>
        variant="customer"
        DEFAULT_VALUES={initialState}
        selectedIds={selectedIds}
        onSave={onSave}
        onClose={onClose}
    >
        <EditManager />
        <EditLabels variant="customer" />
        <StayUpdated />
    </BulkEditDrawer>
);

export default BulkEdit;

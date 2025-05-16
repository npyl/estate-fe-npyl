import {
    EditArea,
    EditBedrooms,
    EditManager,
    EditOwner,
    EditState,
    EditZipCode,
} from "./Edit";
import BulkEditDrawer from "@/sections/DataGrids/BulkEditDrawer";
import { BulkEditRequest } from "@/services/properties";
import EditLabels from "./EditLabels";
import Active from "./Active";
import Exclusive from "./Exclusive";
import { DefaultValues } from "react-hook-form";

interface BulkEditProps<State extends object> {
    DEFAULT_VALUES: DefaultValues<State>;
    selectedIds: number[];
    onSave: (req: BulkEditRequest) => Promise<any>;
    onClose: VoidFunction;
}

const BulkEdit = <State extends object>({
    DEFAULT_VALUES,
    selectedIds,
    onSave,
    onClose,
}: BulkEditProps<State>) => (
    <BulkEditDrawer<State, BulkEditRequest>
        variant="property"
        onClose={onClose}
        DEFAULT_VALUES={DEFAULT_VALUES}
        selectedIds={selectedIds}
        onSave={onSave}
    >
        <EditManager />
        <EditOwner />
        <EditZipCode />
        <EditArea />
        <EditLabels variant="property" />
        <EditBedrooms />
        <EditState />
        <Active />
        <Exclusive />
    </BulkEditDrawer>
);

export default BulkEdit;

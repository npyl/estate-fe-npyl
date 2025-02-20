import {
    EditArea,
    EditBedrooms,
    EditManager,
    EditOwner,
    EditState,
    EditZipCode,
} from "./Edit";
import { BulkEditDrawer } from "@/sections/DataGrids/BulkEditDrawer";
import { useCallback, useMemo, useState } from "react";
import { BulkEditRequest } from "@/services/properties";
import { EditLabels } from "./EditLabels";
import Active from "./Active";
import { SelectChangeEvent } from "@mui/material";

type StateType = {
    managerId: string;
    ownerId: string;
    zipCode: string;
    area: string;
    labels: number[];
    bedrooms: string;
    state: string;
    publicSites: number[];
};

const initialState: StateType = {
    managerId: "",
    ownerId: "",
    zipCode: "",
    area: "",
    labels: [],
    bedrooms: "",
    state: "",
    publicSites: [],
};

interface BulkEditProps {
    open: boolean;
    selectedIds: number[];
    onSave: (req: BulkEditRequest) => Promise<any>;
    onClose: () => void;
}

const BulkEdit = ({ open, selectedIds, onSave, onClose }: BulkEditProps) => {
    const [managerId, setManagerId] = useState<StateType["managerId"]>("");
    const [ownerId, setOwnerId] = useState<StateType["ownerId"]>("");
    const [zipCode, setZipCode] = useState<StateType["zipCode"]>("");
    const [area, setArea] = useState<StateType["area"]>("");
    const [labels, setLabels] = useState<StateType["labels"]>([]);
    const [bedrooms, setBedrooms] = useState<StateType["bedrooms"]>("");
    const [state, setState] = useState<StateType["state"]>("");

    const [publicSites, setPublicSites] = useState<number[]>([]);
    const onPublicSitesChange = useCallback(
        (e: SelectChangeEvent<number[]>) => {
            setPublicSites(e.target.value as any);
        },
        []
    );

    const currentState: StateType = {
        managerId,
        ownerId,
        zipCode,
        area,
        labels,
        bedrooms,
        state,
        publicSites,
    };

    const changed = useMemo(() => {
        const changedFields: Partial<StateType> = {};

        // Compare each field with its initial value
        if (managerId !== initialState.managerId) {
            changedFields.managerId = managerId;
        }
        if (ownerId !== initialState.ownerId) {
            changedFields.ownerId = ownerId;
        }
        if (zipCode !== initialState.zipCode) {
            changedFields.zipCode = zipCode;
        }
        if (area !== initialState.area) {
            changedFields.area = area;
        }
        if (bedrooms !== initialState.bedrooms) {
            changedFields.bedrooms = bedrooms;
        }
        if (state !== initialState.state) {
            changedFields.state = state;
        }

        // For arrays, we need to compare them with initial state
        // Only include if they're different from initial empty array
        if (
            labels.length > 0 ||
            (initialState.labels.length > 0 && labels.length === 0)
        ) {
            changedFields.labels = labels;
        }

        if (
            publicSites.length > 0 ||
            (initialState.publicSites.length > 0 && publicSites.length === 0)
        ) {
            changedFields.publicSites = publicSites;
        }

        return changedFields;
    }, [
        managerId,
        ownerId,
        zipCode,
        area,
        labels,
        bedrooms,
        state,
        publicSites,
    ]);

    const clearState = useCallback(() => {
        setManagerId("");
        setOwnerId("");
        setZipCode("");
        setArea("");
        setLabels([]);
        setBedrooms("");
        setState("");
        setPublicSites([]);
    }, []);

    const handleSave = async () => {
        const req = {
            ...changed,
            propertyIds: selectedIds,
        } as BulkEditRequest;

        await onSave(req);

        handleClose();
    };

    const handleClose = useCallback(() => {
        clearState();
        onClose();
    }, []);

    const handleClear = useCallback(clearState, []);

    return (
        <BulkEditDrawer
            open={open}
            changed={changed}
            onSave={handleSave}
            onClear={handleClear}
            onClose={handleClose}
        >
            <EditManager data={managerId} setData={setManagerId} />
            <EditOwner data={ownerId} setData={setOwnerId} />
            <EditZipCode data={zipCode} setData={setZipCode} />
            <EditArea data={area} setData={setArea} />
            <EditLabels variant="property" data={labels} setData={setLabels} />
            <EditBedrooms data={bedrooms} setData={setBedrooms} />
            <EditState data={state} setData={setState} />
            <Active value={publicSites} onChange={onPublicSitesChange} />
        </BulkEditDrawer>
    );
};

export default BulkEdit;

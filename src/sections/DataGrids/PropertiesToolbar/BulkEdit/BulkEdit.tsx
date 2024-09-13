import {
    EditArea,
    EditBedrooms,
    EditManager,
    EditOwner,
    EditState,
    EditZipCode,
} from "./Edit";
import { BulkEditDrawer } from "@/sections/DataGrids/BulkEditDrawer";
import { useMemo, useState } from "react";
import {
    BulkEditRequest,
    useBulkEditPropertiesMutation,
} from "src/services/properties";
import { EditLabels } from "./EditLabels";

type StateType = {
    managerId: string;
    ownerId: string;
    zipCode: string;
    area: string;
    labels: number[];
    bedrooms: string;
    state: string;
};

const initialState: StateType = {
    managerId: "",
    ownerId: "",
    zipCode: "",
    area: "",
    labels: [],
    bedrooms: "",
    state: "",
};

interface BulkEditProps {
    open: boolean;
    selectedIds: number[];
    onClose: () => void;
}

export const BulkEdit = ({ open, selectedIds, onClose }: BulkEditProps) => {
    const [managerId, setManagerId] = useState<StateType["managerId"]>("");
    const [ownerId, setOwnerId] = useState<StateType["ownerId"]>("");
    const [zipCode, setZipCode] = useState<StateType["zipCode"]>("");
    const [area, setArea] = useState<StateType["area"]>("");
    const [labels, setLabels] = useState<StateType["labels"]>([]);
    const [bedrooms, setBedrooms] = useState<StateType["bedrooms"]>("");
    const [state, setState] = useState<StateType["state"]>("");

    const [bulkEdit] = useBulkEditPropertiesMutation();

    const currentState: StateType = useMemo(
        () => ({
            managerId,
            ownerId,
            zipCode,
            area,
            labels,
            bedrooms,
            state,
        }),
        [managerId, ownerId, zipCode, area, labels, bedrooms, state]
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
                if (
                    key !== "state" &&
                    key !== "labels" &&
                    !isNaN(Number(currentState[key]))
                ) {
                    // every string except state is expected to be int in Backend
                    acc[key] = parseInt(currentState[key] as string, 10) as any;
                } else {
                    acc[key] = currentState[key] as any;
                }
                return acc;
            }, {});
    }, [managerId, ownerId, zipCode, area, labels, bedrooms, state]);

    const clearState = () => {
        setManagerId("");
        setOwnerId("");
        setZipCode("");
        setArea("");
        setLabels([]);
        setBedrooms("");
        setState("");
    };

    const handleSave = () => {
        bulkEdit({
            ...changed,
            propertyIds: selectedIds,
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
            <EditOwner data={ownerId} setData={setOwnerId} />
            <EditZipCode data={zipCode} setData={setZipCode} />
            <EditArea data={area} setData={setArea} />
            <EditLabels variant="property" data={labels} setData={setLabels} />
            <EditBedrooms data={bedrooms} setData={setBedrooms} />
            <EditState data={state} setData={setState} />
        </BulkEditDrawer>
    );
};

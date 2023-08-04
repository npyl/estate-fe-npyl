import { Drawer, Stack, Button, Typography } from "@mui/material";
import {
    EditArea,
    EditBedrooms,
    EditLabels,
    EditManager,
    EditOwner,
    EditState,
    EditZipCode,
} from "./Edit";
import { useMemo, useState } from "react";
import { useBulkEditPropertiesMutation } from "src/services/properties";

interface BulkEditDrawerProps {
    open: boolean;
    selectedIds: number[];
    onClose: () => void;
}

type StateType = {
    manager: string;
    owner: string;
    zipCode: string;
    area: string;
    labels: number[];
    bedrooms: string;
    state: string;
};

export const BulkEditDrawer = ({
    open,
    selectedIds,
    onClose,
}: BulkEditDrawerProps) => {
    const [manager, setManager] = useState<StateType["manager"]>("");
    const [owner, setOwner] = useState<StateType["owner"]>("");
    const [zipCode, setZipCode] = useState<StateType["zipCode"]>("");
    const [area, setArea] = useState<StateType["area"]>("");
    const [labels, setLabels] = useState<StateType["labels"]>([]);
    const [bedrooms, setBedrooms] = useState<StateType["bedrooms"]>("");
    const [state, setState] = useState<StateType["state"]>("");

    const [bulkEdit] = useBulkEditPropertiesMutation();

    const initialState: StateType = useMemo(
        () => ({
            manager: "",
            owner: "",
            zipCode: "",
            area: "",
            labels: [],
            bedrooms: "",
            state: "",
        }),
        []
    );

    const currentState: StateType = useMemo(
        () => ({
            manager,
            owner,
            zipCode,
            area,
            labels,
            bedrooms,
            state,
        }),
        [manager, owner, zipCode, area, labels, bedrooms, state]
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
                acc[key] = currentState[key] as any;
                return acc;
            }, {});
    }, [manager, owner, zipCode, area, labels, bedrooms, state]);

    const handleSave = () => {
        console.log("changed: ", changed);
        // bulkEdit({ ...changed, ids: selectedIds });
    };

    return (
        <Drawer
            open={open}
            variant="persistent"
            anchor="right"
            onClose={onClose}
            ModalProps={{ sx: { zIndex: 999999 } }}
            PaperProps={{ sx: { width: 310 } }}
            sx={{
                "& .MuiDrawer-paper": open
                    ? {
                          borderRadius: 1,
                          position: "absolute",
                      }
                    : {}, // prevent horizontal scrollbar from exceeding page-content size
            }}
        >
            <Stack textAlign={"center"} flex={1} p={1} mt={1}>
                <Typography variant="h6">Bulk Edit</Typography>

                <Stack mt={2} gap={1} spacing={1}>
                    <EditManager data={manager} setData={setManager} />
                    <EditOwner data={owner} setData={setOwner} />
                    <EditZipCode data={zipCode} setData={setZipCode} />
                    <EditArea data={area} setData={setArea} />
                    <EditLabels data={labels} setData={setLabels} />
                    <EditBedrooms data={bedrooms} setData={setBedrooms} />
                    <EditState data={state} setData={setState} />
                </Stack>

                <Stack
                    direction={"row"}
                    justifyContent={"right"}
                    spacing={1}
                    m={1}
                >
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    {Object.keys(changed).length > 0 && (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    )}
                </Stack>
            </Stack>
        </Drawer>
    );
};

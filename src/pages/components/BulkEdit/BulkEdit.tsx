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

interface BulkEditDrawerProps {
    open: boolean;
    onClose: () => void;
}

export const BulkEditDrawer = ({ open, onClose }: BulkEditDrawerProps) => {
    const [manager, setManager] = useState("");
    const [owner, setOwner] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [area, setArea] = useState("");
    const [labels, setLabels] = useState<number[]>([]);
    const [bedrooms, setBedrooms] = useState("");
    const [state, setState] = useState("");

    const initialState = useMemo(
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

    const currentState = useMemo(
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

    const changed = useMemo(
        () =>
            (
                Object.keys(currentState) as Array<keyof typeof currentState>
            ).filter((key) =>
                Array.isArray(currentState[key]) &&
                Array.isArray(initialState[key])
                    ? JSON.stringify(currentState[key]) !==
                      JSON.stringify(initialState[key])
                    : currentState[key] !== initialState[key]
            ),
        [manager, owner, zipCode, area, labels, bedrooms, state]
    );

    const handleSave = () => {
        console.log("changed: ", changed);
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

                <Stack mt={2} gap={1}>
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
                    {changed.length > 0 && (
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

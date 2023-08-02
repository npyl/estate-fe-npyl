import { Drawer, Stack, Button, Typography } from "@mui/material";
import {
    EditArea,
    EditBedrooms,
    EditLabels,
    EditManager,
    EditOwner,
    EditStatus,
    EditZipCode,
} from "./Edit";
import { useState } from "react";

interface BulkEditDrawerProps {
    open: boolean;
    onClose: () => void;
}

export const BulkEditDrawer = ({ open, onClose }: BulkEditDrawerProps) => {
    const [manager, setManager] = useState("");
    const [owner, setOwner] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [area, setArea] = useState("");
    const [labels, setLabels] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [status, setStatus] = useState("");

    const handleSave = () => {};

    return (
        <Drawer
            open={open}
            variant="persistent"
            anchor="right"
            onClose={onClose}
            ModalProps={{ sx: { zIndex: 999999 } }}
            PaperProps={{ sx: { width: 310 } }}
            sx={{
                "& .MuiDrawer-paper": {
                    borderRadius: 1,
                    position: "absolute",
                },
            }}
        >
            <Stack textAlign={"center"} flex={1} p={1}>
                <Typography variant="h6">Bulk Edit</Typography>

                <EditManager data={manager} setData={setManager} />
                <EditOwner data={owner} setData={setOwner} />
                <EditZipCode data={zipCode} setData={setZipCode} />
                <EditArea data={area} setData={setArea} />
                <EditLabels data={labels} setData={setLabels} />
                <EditBedrooms data={bedrooms} setData={setBedrooms} />
                <EditStatus data={status} setData={setStatus} />

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
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </Stack>
            </Stack>
        </Drawer>
    );
};

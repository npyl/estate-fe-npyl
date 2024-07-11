import { SoftButton } from "@/components/SoftButton";
import { Close as CloseIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Lock, LockOpen } from "@mui/icons-material";

interface ControlsProps {
    mode: "" | "multiple" | "compare";
    selectedImages: number;
    onMakePublic: VoidFunction;
    onMakePrivate: VoidFunction;
    onBulkDelete: VoidFunction;
    onToggleCompare: VoidFunction;
    onToggleMultiple: VoidFunction;
    onCompare: VoidFunction;
    onClose: VoidFunction;
}

const Controls: React.FC<ControlsProps> = ({
    mode,
    selectedImages,
    // ...
    onMakePublic,
    onMakePrivate,
    onBulkDelete,
    // ...
    onToggleCompare,
    onToggleMultiple,
    // ...
    onCompare,
    onClose,
}) => {
    return (
        <Stack direction="row" alignItems="center" gap={1}>
            {mode === "multiple" && selectedImages > 0 ? (
                <>
                    <Typography mr={1}>Make</Typography>
                    <SoftButton startIcon={<LockOpen />} onClick={onMakePublic}>
                        Public
                    </SoftButton>
                    <SoftButton startIcon={<Lock />} onClick={onMakePrivate}>
                        Private
                    </SoftButton>
                    <SoftButton
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={onBulkDelete}
                    >
                        Delete
                    </SoftButton>
                </>
            ) : null}
            {mode !== "compare" && (
                <>
                    <Divider orientation="vertical" />
                    <SoftButton
                        onClick={onToggleMultiple}
                        variant="outlined"
                        color={mode === "multiple" ? "error" : "primary"}
                    >
                        {mode === "multiple"
                            ? "Cancel Select"
                            : "Select Multiple"}
                    </SoftButton>
                </>
            )}
            {mode === "compare" && selectedImages === 2 ? (
                <SoftButton color="primary" onClick={onCompare}>
                    Compare
                </SoftButton>
            ) : null}

            {mode !== "multiple" && (
                <>
                    <Divider orientation="vertical" />
                    <SoftButton
                        onClick={onToggleCompare}
                        variant="outlined"
                        color={mode === "compare" ? "error" : "primary"}
                    >
                        {mode === "compare" ? "Close" : "Compare Mode"}
                    </SoftButton>
                </>
            )}

            <IconButton onClick={onClose}>
                <CloseIcon />
            </IconButton>
        </Stack>
    );
};

export default Controls;

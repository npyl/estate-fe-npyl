import { SoftButton } from "@/components/SoftButton";
import { Close as CloseIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Lock, LockOpen } from "@mui/icons-material";
import {
    useBulkDeletePropertyImagesMutation,
    useBulkEditPropertyImagesMutation,
} from "@/services/properties/file";
import { useRouter } from "next/router";

interface ControlsProps {
    mode: "" | "multiple" | "compare";
    selectedImages: string[];
    onToggleCompare: VoidFunction;
    onToggleMultiple: VoidFunction;
    onCompare: VoidFunction;
    onClose: VoidFunction;
}

const Controls: React.FC<ControlsProps> = ({
    mode,
    selectedImages,
    // ...
    onToggleCompare,
    onToggleMultiple,
    // ...
    onCompare,
    onClose,
}) => {
    const router = useRouter();
    const { propertyId } = router.query;

    const [bulkEditImages] = useBulkEditPropertyImagesMutation();
    const [bulkDeleteImages] = useBulkDeletePropertyImagesMutation();

    const handleBulkChangeVisibility = (hidden: boolean) =>
        bulkEditImages({
            propertyId: +propertyId!,
            body: {
                imageKeys: selectedImages,
                hidden,
            },
        });

    const handleMakePublic = () => handleBulkChangeVisibility(false);
    const handleMakePrivate = () => handleBulkChangeVisibility(true);

    const handleBulkDelete = () =>
        bulkDeleteImages({
            propertyId: +propertyId!,
            imageKeys: selectedImages,
        });

    return (
        <Stack direction="row" alignItems="center" gap={1}>
            {mode === "multiple" && selectedImages.length > 0 ? (
                <>
                    <Typography mr={1}>Make</Typography>
                    <SoftButton
                        startIcon={<LockOpen />}
                        onClick={handleMakePublic}
                    >
                        Public
                    </SoftButton>
                    <SoftButton
                        startIcon={<Lock />}
                        onClick={handleMakePrivate}
                    >
                        Private
                    </SoftButton>
                    <SoftButton
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={handleBulkDelete}
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
            {mode === "compare" && selectedImages.length === 2 ? (
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

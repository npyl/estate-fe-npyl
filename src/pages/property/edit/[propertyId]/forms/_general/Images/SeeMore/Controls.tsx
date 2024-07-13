import { SoftButton } from "@/components/SoftButton";
import { Close as CloseIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Lock, LockOpen } from "@mui/icons-material";
import { useRouter } from "next/router";
import CompareIcon from "@mui/icons-material/Compare";
import MultipleIcon from "@mui/icons-material/LibraryAdd";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { TMode } from "./types";
import { useTranslation } from "react-i18next";
import { useImageOperations } from "../context/ImageOperations";

interface ControlsProps {
    mode: TMode;
    onModeChange: (v: TMode) => void;
    selectedImages: string[];
    isAllSelected: boolean;
    // ...
    onToggleSelectAll: VoidFunction;
    onCompare: VoidFunction;
    onClose: VoidFunction;
}

const Controls: React.FC<ControlsProps> = ({
    mode,
    onModeChange,
    selectedImages,
    isAllSelected,
    // ...
    onToggleSelectAll,
    onCompare,
    onClose,
}) => {
    const { t } = useTranslation();

    const router = useRouter();
    const { propertyId } = router.query;

    const { bulkEditImages, bulkDeleteImages, isLoading } =
        useImageOperations();

    const handleBulkChangeVisibility = (hidden: boolean) =>
        bulkEditImages({
            propertyId: +propertyId!,
            body: {
                imageKeys: selectedImages,
                hidden,
            },
        });

    const handleModeChange = (_: any, v: TMode) => onModeChange(v);

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
                    <SoftButton
                        disabled={isLoading}
                        startIcon={<LockOpen />}
                        onClick={handleMakePublic}
                    >
                        {t("Public")}
                    </SoftButton>
                    <SoftButton
                        disabled={isLoading}
                        startIcon={<Lock />}
                        onClick={handleMakePrivate}
                    >
                        {t("Private")}
                    </SoftButton>
                    <SoftButton
                        disabled={isLoading}
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={handleBulkDelete}
                    >
                        {t("Delete")}
                    </SoftButton>
                </>
            ) : null}

            {mode === "multiple" ? (
                <SoftButton
                    disabled={isLoading}
                    onClick={onToggleSelectAll}
                    variant="outlined"
                    color={isAllSelected ? "error" : "primary"}
                >
                    {t(isAllSelected ? "Deselect All" : "Select All")}
                </SoftButton>
            ) : null}

            {mode === "compare" && selectedImages.length === 2 ? (
                <SoftButton
                    disabled={isLoading}
                    color="primary"
                    onClick={onCompare}
                >
                    {t("Compare")}
                </SoftButton>
            ) : null}

            <ToggleButtonGroup
                value={mode}
                size="small"
                exclusive
                disabled={isLoading}
                onChange={handleModeChange}
            >
                <ToggleButton value="multiple">
                    <MultipleIcon />
                </ToggleButton>
                <ToggleButton value="compare">
                    <CompareIcon />
                </ToggleButton>

                {mode !== "" ? (
                    <ToggleButton value="">
                        <CloseOutlinedIcon />
                    </ToggleButton>
                ) : null}
            </ToggleButtonGroup>

            <IconButton onClick={onClose}>
                <CloseIcon />
            </IconButton>
        </Stack>
    );
};

export default Controls;

import { SoftButton } from "@/components/SoftButton";
import { Close as CloseIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Lock, LockOpen } from "@mui/icons-material";
import {
    useBulkDeletePropertyImagesMutation,
    useBulkEditPropertyImagesMutation,
} from "@/services/properties/file";
import { useRouter } from "next/router";

import CompareIcon from "@mui/icons-material/Compare";
import MultipleIcon from "@mui/icons-material/LibraryAdd";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { TMode } from "./types";
import { useTranslation } from "react-i18next";

interface ControlsProps {
    mode: TMode;
    onModeChange: (v: TMode) => void;
    selectedImages: string[];
    onCompare: VoidFunction;
    onClose: VoidFunction;
}

const Controls: React.FC<ControlsProps> = ({
    mode,
    onModeChange,
    selectedImages,
    // ...
    onCompare,
    onClose,
}) => {
    const { t } = useTranslation();

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
                        startIcon={<LockOpen />}
                        onClick={handleMakePublic}
                    >
                        {t("Public")}
                    </SoftButton>
                    <SoftButton
                        startIcon={<Lock />}
                        onClick={handleMakePrivate}
                    >
                        {t("Private")}
                    </SoftButton>
                    <SoftButton
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={handleBulkDelete}
                    >
                        {t("Delete")}
                    </SoftButton>
                </>
            ) : null}

            {mode === "compare" && selectedImages.length === 2 ? (
                <SoftButton color="primary" onClick={onCompare}>
                    {t("Compare")}
                </SoftButton>
            ) : null}

            <ToggleButtonGroup
                value={mode}
                size="small"
                exclusive
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

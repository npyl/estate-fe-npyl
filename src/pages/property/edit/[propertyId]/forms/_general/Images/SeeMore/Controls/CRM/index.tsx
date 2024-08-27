import SoftButton from "@/components/SoftButton";
import {
    Stack,
    StackProps,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import CompareIcon from "@mui/icons-material/Compare";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { TMode } from "../../types";
import { useTranslation } from "react-i18next";
import { useImageOperations } from "../../../context/ImageOperations";
import { Icon } from "@iconify/react";
import AddButton from "./Buttons/Add";
import DeleteButton from "./Buttons/Delete";
import PublicButton from "./Buttons/Public";
import PrivateButton from "./Buttons/Private";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
const CompareGallery = dynamic(() => import("./CompareGallery"));

interface CRMControlsProps extends StackProps {
    mode: "" | "multiple" | "compare";
    selectedImages: string[];
    isAllSelected: boolean;
    onToggleAll: VoidFunction;
    onResetSelectedImages: VoidFunction;
    onModeChange: (_: any, m: TMode) => void;
}

const CRMControls: React.FC<CRMControlsProps> = ({
    mode,
    selectedImages,
    isAllSelected,
    onToggleAll,
    onResetSelectedImages,
    onModeChange,
    ...props
}) => {
    const { t } = useTranslation();

    const { isLoading } = useImageOperations();

    const [isCompareOpen, openCompareDialog, closeCompareDialog] = useDialog();

    const handleCloseCompareDialog = () => {
        onResetSelectedImages();
        closeCompareDialog();
    };

    return (
        <>
            <Stack direction="row" alignItems="center" gap={1} {...props}>
                {mode !== "compare" && selectedImages.length > 0 ? (
                    <>
                        <PublicButton selectedImages={selectedImages} />
                        <PrivateButton selectedImages={selectedImages} />
                        <DeleteButton selectedImages={selectedImages} />
                    </>
                ) : null}

                {mode !== "compare" ? (
                    <SoftButton
                        disabled={isLoading}
                        onClick={onToggleAll}
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
                        onClick={openCompareDialog}
                    >
                        {t("Compare")}
                    </SoftButton>
                ) : null}

                <ToggleButtonGroup
                    value={mode}
                    size="small"
                    exclusive
                    disabled={isLoading}
                    onChange={onModeChange}
                >
                    <ToggleButton value="multiple">
                        <Icon icon="carbon:select-window" width={20} />
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

                <AddButton />
            </Stack>

            {isCompareOpen ? (
                <CompareGallery
                    open={isCompareOpen}
                    image1={selectedImages[0]}
                    image2={selectedImages[1]}
                    onClose={handleCloseCompareDialog}
                />
            ) : null}
        </>
    );
};

export default CRMControls;

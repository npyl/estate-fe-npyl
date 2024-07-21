import { SoftButton } from "@/components/SoftButton";
import { Close as CloseIcon } from "@mui/icons-material";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CompareIcon from "@mui/icons-material/Compare";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { TMode } from "../types";
import { useTranslation } from "react-i18next";
import { useImageOperations } from "../../context/ImageOperations";
import { Icon } from "@iconify/react";
import AddButton from "./Add";
import DeleteButton from "./Delete";
import PublicButton from "./Public";
import PrivateButton from "./Private";
import { Dispatch, SetStateAction } from "react";
import usePropertyImages from "../../hook";
import useDialog from "@/hooks/useDialog";
import { CompareGallery } from "./CompareGallery";

interface ControlsProps {
    selectedImages: string[];
    setSelectedImages: Dispatch<SetStateAction<string[]>>;
    mode: "" | "multiple" | "compare";
    setMode: (m: "" | "multiple" | "compare") => void;
    onClose: VoidFunction;
}

const Controls: React.FC<ControlsProps> = ({
    selectedImages,
    setSelectedImages,
    mode,
    setMode,
    onClose,
}) => {
    const { t } = useTranslation();

    const { images } = usePropertyImages();
    const { isLoading } = useImageOperations();

    const [isCompareOpen, openCompareDialog, closeCompareDialog] = useDialog();

    const isAllSelected =
        selectedImages.length > 0 &&
        images.length > 0 &&
        selectedImages.length === images.length;

    const handleModeChange = (_: any, m: TMode) => {
        if (m === null) return; // Prevent unselecting an already selected button

        setSelectedImages([]);
        setMode(m);
    };

    const handleToggleAll = () =>
        setSelectedImages(isAllSelected ? [] : images.map(({ key }) => key));

    const handleCloseCompareDialog = () => {
        setSelectedImages([]);
        closeCompareDialog();
    };

    return (
        <>
            <Stack direction="row" alignItems="center" gap={1}>
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
                        onClick={handleToggleAll}
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
                    onChange={handleModeChange}
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

                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
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

export default Controls;

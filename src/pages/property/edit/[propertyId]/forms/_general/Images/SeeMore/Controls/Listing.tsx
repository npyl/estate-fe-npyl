import SoftButton from "@/components/SoftButton";
import {
    Stack,
    StackProps,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { TMode } from "../types";
import { useTranslation } from "react-i18next";
import { useImageOperations } from "../../context/ImageOperations";
import { Icon } from "@iconify/react";
import PublicButton from "./Buttons/Public";
import PrivateButton from "./Buttons/Private";

interface ListingControlsProps extends StackProps {
    mode: "" | "multiple" | "compare";
    selectedImages: string[];
    isAllSelected: boolean;
    onToggleAll: VoidFunction;
    onModeChange: (_: any, m: TMode) => void;
}

const ListingControls: React.FC<ListingControlsProps> = ({
    mode,
    selectedImages,
    isAllSelected,
    onToggleAll,
    onModeChange,
    ...props
}) => {
    const { t } = useTranslation();

    const { isLoading } = useImageOperations();

    return (
        <Stack direction="row" alignItems="center" gap={1} {...props}>
            {selectedImages.length > 0 ? (
                <>
                    <PublicButton selectedImages={selectedImages} />
                    <PrivateButton selectedImages={selectedImages} />
                </>
            ) : null}

            <SoftButton
                disabled={isLoading}
                onClick={onToggleAll}
                variant="outlined"
                color={isAllSelected ? "error" : "primary"}
            >
                {t(isAllSelected ? "Deselect All" : "Select All")}
            </SoftButton>

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

                {mode !== "" ? (
                    <ToggleButton value="">
                        <CloseOutlinedIcon />
                    </ToggleButton>
                ) : null}
            </ToggleButtonGroup>
        </Stack>
    );
};

export default ListingControls;

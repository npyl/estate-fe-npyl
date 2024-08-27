import { StackProps } from "@mui/material";
import { TListingTab, TMode } from "../types";
import { Dispatch, SetStateAction } from "react";
import usePropertyImages from "../../hook";
import CRMControls from "./CRM";
import dynamic from "next/dynamic";
const ListingControls = dynamic(() => import("./Listing"));

interface ControlsProps extends StackProps {
    tab: TListingTab;
    // ...
    selectedImages: string[];
    mode: "" | "multiple" | "compare";
    // ...
    setSelectedImages: Dispatch<SetStateAction<string[]>>;
    onResetSelectedImages: VoidFunction;
    setMode: (m: "" | "multiple" | "compare") => void;
}

const Controls: React.FC<ControlsProps> = ({
    tab,
    selectedImages,
    mode,
    // ...
    setSelectedImages,
    onResetSelectedImages,
    setMode,
    // ...
    ...props
}) => {
    const { images } = usePropertyImages();

    const isAllSelected =
        selectedImages.length > 0 &&
        images.length > 0 &&
        selectedImages.length === images.length;

    const handleModeChange = (_: any, m: TMode) => {
        if (m === null) return; // Prevent unselecting an already selected button

        onResetSelectedImages();
        setMode(m);
    };

    const handleToggleAll = () => {
        if (isAllSelected) onResetSelectedImages();
        else setSelectedImages(images.map(({ key }) => key));
    };

    if (tab === "CRM")
        return (
            <CRMControls
                mode={mode}
                selectedImages={selectedImages}
                isAllSelected={isAllSelected}
                // ...
                onToggleAll={handleToggleAll}
                onResetSelectedImages={onResetSelectedImages}
                onModeChange={handleModeChange}
                {...props}
            />
        );

    return (
        <ListingControls
            tab={tab}
            mode={mode}
            selectedImages={selectedImages}
            isAllSelected={isAllSelected}
            // ...
            onToggleAll={handleToggleAll}
            onModeChange={handleModeChange}
            {...props}
        />
    );
};

export default Controls;

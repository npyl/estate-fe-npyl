import { IPropertyImage } from "@/types/file";
import { TListingTab } from "../types";
import DropZone from "./DropZone";
import Over25ImagesPreview from "./PreviewReorder";
import useContentOperations from "./hook";
import { useCallback } from "react";
import SelectableItem from "./Selectable";
import React from "react";

const COLUMNS = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
};

interface ContentProps {
    tab: TListingTab;
    selectedImages: string[];
    onImageClick: (key: string) => void;
}

const Content: React.FC<ContentProps> = ({
    tab,
    selectedImages,
    onImageClick,
}) => {
    const createItem = useCallback(
        (f: IPropertyImage, index: number) => {
            const isSelected =
                selectedImages.findIndex((key) => key === f.key) > -1;

            return (
                <SelectableItem
                    id={index}
                    key={f.key}
                    selected={isSelected}
                    image={f}
                    onImageClick={onImageClick}
                />
            );
        },
        [selectedImages, onImageClick]
    );

    const { publicImages, privateImages, handleDragEnd, isLoading } =
        useContentOperations(tab, createItem);

    const isNotCRM = tab !== "CRM";

    return (
        <DropZone disabled={isNotCRM}>
            <Over25ImagesPreview
                publicImages={publicImages}
                privateImages={privateImages}
                columns={COLUMNS}
                preventDrag={isLoading}
                onDragEnd={handleDragEnd}
            />
        </DropZone>
    );
};

export default React.memo(Content);

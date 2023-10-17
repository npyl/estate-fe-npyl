import { UploadPropertyImageProps } from "../types";
import PreviewImage from "src/components/image/PreviewImage";
import { LabeledImage } from "src/components/image";
import { IPropertyImage } from "src/types/file";
import { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
    DroppableTypeItem,
    TwoDimentionsDnd,
    itemId,
    rowId,
} from "src/components/TwoDimentionsDnd";
import { DropResult } from "react-beautiful-dnd";
import { Check } from "@mui/icons-material";

interface ItemProps {
    image: IPropertyImage;
    index: number;
    onClick: () => void;
}

const Item = ({ image, index, onClick }: ItemProps) => {
    const { url, hidden } = useMemo(() => image, [image]);

    return url ? (
        <motion.div
            whileHover={{
                scale: 0.95,
            }}
        >
            <LabeledImage
                borderRadius={0.3}
                src={url}
                hidden={hidden}
                label={index === 0 ? "main" : ""}
                onClick={onClick}
            />
        </motion.div>
    ) : (
        <PreviewImage animate borderRadius={0.3} />
    );
};

interface SelectableItemProps extends ItemProps {
    selectMultiple: boolean;
    selected: boolean;
}

const SelectableItem = ({
    selectMultiple,
    selected,
    image,
    index,
    onClick,
}: SelectableItemProps) => {
    const checked = useMemo(
        () => selectMultiple && selected,
        [selectMultiple, selected]
    );

    return (
        <div style={{ position: "relative" }}>
            {checked && (
                <Check
                    sx={{
                        position: "absolute",
                        top: -25,
                        right: -5,
                        zIndex: 1,
                        fontSize: 50,
                        stroke: "white",
                        strokeWidth: "0.5",
                        strokeLinejoin: "round",
                        strokeLinecap: "round",
                    }}
                />
            )}
            <Item image={image} index={index} onClick={onClick} />
        </div>
    );
};

interface MultiFilePreviewReorder extends UploadPropertyImageProps {
    columns?: number;
    selectMultiple?: boolean;
    selectedImages?: string[];
}

export default function MultiFilePreviewReorder({
    files,
    columns = 3,
    selectMultiple = false,
    selectedImages = [],
    setFiles,
    onImageClick,
    onReorder,
}: MultiFilePreviewReorder) {
    if (!files || !files?.length) return null;

    const items = useMemo(
        () =>
            files.map((f, index) => ({
                id: index,
                value: (
                    <SelectableItem
                        selectMultiple={selectMultiple}
                        selected={
                            selectedImages.findIndex((key) => key === f.key) >
                            -1
                        }
                        image={f}
                        index={index}
                        onClick={() => onImageClick && onImageClick(f)}
                    />
                ),
            })),
        [files, selectMultiple, selectedImages]
    );

    const handleDragEnd = useCallback(
        ({ type, draggableId, source, destination }: DropResult) => {
            if (type === DroppableTypeItem) {
                const draggedItemId = itemId(draggableId);
                /* src */
                const srcRow = rowId(source?.droppableId);
                const srcCol = source?.index;
                /* dst */
                const dstRow = rowId(destination?.droppableId);
                const dstCol = destination?.index;

                if (draggedItemId === null) return;
                if (srcRow === null || srcCol === null || srcCol === undefined)
                    return;
                if (dstRow === null || dstCol === null || dstCol === undefined)
                    return;

                let oneDimentionArraySrcIndex = srcRow * columns + srcCol;
                let oneDimentionArrayDstIndex = dstRow * columns + dstCol;

                /* NOTE: compensate for when user moves a section at the end of the board */
                if (oneDimentionArrayDstIndex === items.length)
                    oneDimentionArrayDstIndex -= 1;

                const updatedItems = [...files];
                const [removed] = updatedItems.splice(
                    oneDimentionArraySrcIndex,
                    1
                );
                updatedItems.splice(oneDimentionArrayDstIndex, 0, removed);

                setFiles(updatedItems);

                onReorder && onReorder(updatedItems.map((i) => i.key));
            }
        },
        [files, columns]
    );

    return (
        <TwoDimentionsDnd
            gap={0.2}
            columns={columns}
            items={items}
            onDragEnd={handleDragEnd}
        />
    );
}

import { Check } from "@mui/icons-material";
import { useCallback, useMemo } from "react";
import { DropResult } from "react-beautiful-dnd";
import {
    TwoDimentionsDnd,
    parseItemId,
    parseRowId,
} from "src/components/TwoDimentionsDnd/TwoDimentionsDnd";
import { DroppableTypeItem } from "src/components/TwoDimentionsDnd/types";
import { LabeledImage } from "src/components/image";
import PreviewImage from "src/components/image/PreviewImage";
import { IPropertyImage } from "src/types/file";
import { UploadPropertyImageProps } from "../types";
import { motion } from "framer-motion";

interface ItemProps {
    image: IPropertyImage;
    index: number;
    onClick: () => void;
}

const Item = ({ image, index, onClick }: ItemProps) => {
    const { url, hidden, thumbnail } = useMemo(() => image, [image]);

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
                label={thumbnail ? "main" : ""}
                onClick={onClick}
            />
        </motion.div>
    ) : (
        <PreviewImage animate borderRadius={0.3} />
    );
};

interface SelectableItemProps extends ItemProps {
    selectMultiple: boolean;
    compare: boolean;
    selected: boolean;
}

export const SelectableItem = ({
    selectMultiple,
    compare,
    selected,
    image,
    index,
    onClick,
}: SelectableItemProps) => {
    const checked = useMemo(
        () => (compare || selectMultiple) && selected,
        [selectMultiple, selected, compare]
    );

    return (
        <div style={{ position: "relative" }}>
            {checked && (
                <Check
                    sx={{
                        position: "absolute",
                        top: 1,
                        right: 1,
                        zIndex: 1,
                        fontSize: 35,
                        color: "yellow",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
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
    compare?: boolean;
    compareImages?: string[];
}

export default function MultiFilePreviewReorder({
    files,
    columns = 3,
    selectMultiple = false,
    compare = false,
    selectedImages = [],
    compareImages = [],
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
                        compare={compare}
                        selected={
                            selectedImages.findIndex((key) => key === f.key) >
                                -1 ||
                            compareImages.findIndex((key) => key === f.key) > -1
                        }
                        image={f}
                        index={index}
                        onClick={() => onImageClick && onImageClick(f)}
                    />
                ),
            })),
        [files, selectMultiple, compare, compareImages, selectedImages]
    );

    const handleDragEnd = useCallback(
        ({ type, draggableId, source, destination }: DropResult) => {
            if (type === DroppableTypeItem) {
                const { itemId: draggedItemId } = parseItemId(draggableId);
                /* src */
                const { rowId: srcRow } = parseRowId(source?.droppableId);
                const srcCol = source?.index;
                /* dst */
                const { rowId: dstRow } = parseRowId(destination?.droppableId);
                const dstCol = destination?.index;

                if (draggedItemId === -1) return;
                if (srcRow === -1 || srcCol === null || srcCol === undefined)
                    return;
                if (dstRow === -1 || dstCol === null || dstCol === undefined)
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

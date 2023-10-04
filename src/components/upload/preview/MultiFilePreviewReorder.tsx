import { UploadPropertyImageProps } from "../types";

import { DndProvider, DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import PreviewImage from "src/components/image/PreviewImage";
import { LabeledImage } from "src/components/image";

import { IPropertyImage } from "src/types/file";
import { useCallback, useEffect, useMemo, useRef } from "react";

import React from "react";
import { Grid } from "@mui/material";

interface CardProps {
    src: string;
    label: string;
    id: string;
    index: number;
    moveImage: (dragIndex: number, hoverIndex: number) => void;
    onClick: () => void;
}

type DraggableImageItem = {
    type: string;
    index: number;
};

const DraggableImageType = "image";

const Card = ({ src, label, id, index, moveImage, onClick }: CardProps) => {
    const ref: React.RefObject<HTMLDivElement> = useRef(null);

    const [, drop] = useDrop({
        accept: DraggableImageType,
        hover: (item: DraggableImageItem, monitor: DropTargetMonitor) => {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            // Ensure clientOffset is not null before accessing its properties
            if (!clientOffset) {
                return;
            }

            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveImage(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: DraggableImageType,
        item: () => ({ id, index }),
        collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    });

    drag(drop(ref));

    return src ? (
        <div
            ref={ref}
            style={{
                position: "relative" /* INFO: Fixes image size */,
            }}
            className="card"
        >
            <LabeledImage
                src={src}
                label={label}
                sx={{
                    opacity: isDragging ? 0.5 : 1,
                }}
                onClick={onClick}
            />
        </div>
    ) : (
        <PreviewImage animate />
    );
};

export default function MultiFilePreviewReorder({
    files,
    setFiles,
    onImageClick,
    onImageDoubleClick,
    onReorder,
}: UploadPropertyImageProps) {
    if (!files || !files?.length) return null;

    const moveImage = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const clonedImages = [...files];
            const removedItem = clonedImages.splice(dragIndex, 1)[0];
            clonedImages.splice(hoverIndex, 0, removedItem);

            setFiles(clonedImages);

            onReorder && onReorder(clonedImages.map((i) => i.key));
        },
        [files]
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <Grid container spacing={0.5}>
                {files.map((image, index) => (
                    <Grid item xs={3} key={image.key}>
                        <Card
                            src={image.url}
                            label={index === 0 ? "main" : ""}
                            id={image.key}
                            index={index}
                            moveImage={moveImage}
                            onClick={() =>
                                onImageClick && onImageClick(files[index])
                            }
                        />
                    </Grid>
                ))}
            </Grid>
        </DndProvider>
    );
}

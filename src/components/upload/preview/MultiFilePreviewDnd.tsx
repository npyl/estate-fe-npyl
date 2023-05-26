import { m } from "framer-motion";
// @mui
import { IconButton, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
// utils
import { fData } from "../../../utils/formatNumber";
//
import { varFade } from "../../animate";
import FileThumbnail, { fileData } from "../../file-thumbnail";
import Iconify from "../../iconify";

import { ImageList, ImageListItem } from '@mui/material';
import Image from "src/components/image/Image";

//
import { UploadProps } from "../types";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";

import { useState, useMemo } from "react";

interface Item {
    id: string;
    content: string;
    data: string;
}

export default function MultiFilePreviewDnd({
    thumbnail,
    files,
    onRemove,
    sx,
}: UploadProps) {
    if (!files?.length) {
        return null;
    }

    const [items, setItems] = useState<Item[]>([]);

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const { source, destination } = result;
        const updatedItems = [...items];
        const [removed] = updatedItems.splice(source.index, 1);
        updatedItems.splice(destination.index, 0, removed);

        setItems(updatedItems);
    };

    useMemo(() => {
        setItems([...files.map((file, index) => {
            return {
                id: `item-${index}`,
                content: `item-${index}`,
                data: fileData(file).preview!
            }
        })])
    }, [files]);

    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <ImageList {...provided.droppableProps} ref={provided.innerRef}>
                            {items.map((item, index) => (
                                <ImageListItem>
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Image src={item.data} alt={item.content} />
                                            </div>
                                        )}
                                    </Draggable>
                                </ImageListItem>
                            ))}
                            {provided.placeholder}
                        </ImageList>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
}

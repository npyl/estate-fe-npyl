import { ImageList, ImageListItem } from "@mui/material";
import Image from "src/components/image/Image";

import { UploadPropertyImageProps } from "../types";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from "react-beautiful-dnd";

import PreviewImage from "src/components/image/PreviewImage";
import { LabeledImage } from "src/components/image";

export default function MultiFilePreviewReorder({
    files,
    setFiles,
    onImageClick,
    onReorder,
}: UploadPropertyImageProps) {
    if (!files || !files?.length) return null;

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const { source, destination } = result;
        const updatedItems = [...files];
        const [removed] = updatedItems.splice(source.index, 1);
        updatedItems.splice(destination.index, 0, removed);

        setFiles(updatedItems);

        // reorder callback
        onReorder && onReorder(updatedItems.map((i) => i.key));
    };

    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <ImageList
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            cols={4} // <- Add this line
                        >
                            {files.map((file, index) => (
                                <ImageListItem key={index}>
                                    <Draggable
                                        draggableId={index.toString()}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {file.url ? (
                                                    <LabeledImage
                                                        src={file.url}
                                                        label={
                                                            index === 0
                                                                ? "main"
                                                                : ""
                                                        }
                                                        onClick={() => {
                                                            onImageClick &&
                                                                onImageClick(
                                                                    files[index]
                                                                );
                                                        }}
                                                    />
                                                ) : (
                                                    <PreviewImage animate />
                                                )}
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

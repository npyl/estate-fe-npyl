import { Divider } from "@mui/material";
import { DragDropContext, DragDropContextProps } from "react-beautiful-dnd";
import { TwoDimentionsDndNoContext } from "@/components/TwoDimentionsDnd/TwoDimentionsDndNoContext";
import { DndItem } from "./types";

interface ImagePreviewReorderProps
    extends Omit<DragDropContextProps, "children"> {
    publicImages: DndItem[];
    privateImages: DndItem[];
    columns: number;
    loading: boolean;
}

const Over25ImagesPreview = ({
    publicImages,
    privateImages,
    columns,
    loading,
    ...props
}: ImagePreviewReorderProps) => {
    const secondDndStartIndex = publicImages.length;

    // TODO: if loading prevent drag start

    return (
        <DragDropContext {...props}>
            <TwoDimentionsDndNoContext
                dndId={1}
                startIndex={0}
                items={publicImages}
                columns={columns}
                gap={0.5}
            />
            <Divider sx={{ mt: 2, mb: 2 }} />
            <TwoDimentionsDndNoContext
                dndId={2}
                startIndex={secondDndStartIndex}
                items={privateImages}
                columns={columns}
                gap={0.5}
            />
        </DragDropContext>
    );
};

export default Over25ImagesPreview;

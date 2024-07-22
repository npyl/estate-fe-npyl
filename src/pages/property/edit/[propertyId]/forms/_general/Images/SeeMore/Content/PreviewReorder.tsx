import { Divider } from "@mui/material";
import { DragDropContext, DragDropContextProps } from "react-beautiful-dnd";
import TwoDimentionsDndNoContext from "@/components/TwoDimentionsDnd/TwoDimentionsDndNoContext";
import { TwoDimentionsDndNode } from "@/components/TwoDimentionsDnd/types";

interface ImagePreviewReorderProps
    extends Omit<DragDropContextProps, "children"> {
    publicImages: TwoDimentionsDndNode[];
    privateImages: TwoDimentionsDndNode[];
    columns: number;
    preventDrag?: boolean;
}

const Over25ImagesPreview = ({
    publicImages,
    privateImages,
    columns,
    preventDrag = false,
    ...props
}: ImagePreviewReorderProps) => {
    const secondDndStartIndex = publicImages.length;

    return (
        <DragDropContext {...props}>
            <TwoDimentionsDndNoContext
                dndId={1}
                startIndex={0}
                columns={columns}
                gap={0.5}
                preventDrag={preventDrag}
                minHeight="200px"
            >
                {publicImages}
            </TwoDimentionsDndNoContext>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <TwoDimentionsDndNoContext
                dndId={2}
                startIndex={secondDndStartIndex}
                columns={columns}
                gap={0.5}
                preventDrag={preventDrag}
                minHeight="200px"
            >
                {privateImages}
            </TwoDimentionsDndNoContext>
        </DragDropContext>
    );
};

export default Over25ImagesPreview;

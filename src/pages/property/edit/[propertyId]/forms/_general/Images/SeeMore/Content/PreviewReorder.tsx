import {
    DragDropContext,
    DragDropContextProps,
    OnDragEndResponder,
} from "react-beautiful-dnd";
import TwoDimentionsDndNoContext from "@/components/TwoDimentionsDnd/TwoDimentionsDndNoContext";
import { TwoDimentionsDndNode } from "@/components/TwoDimentionsDnd/types";
import useResponsiveColumns, {
    ResponsiveColumns,
} from "./useResponsiveColumns";
import { useCallback } from "react";
import { ExtendedDropResult } from "./hook/type";
import Separator from "./Separator";

interface ImagePreviewReorderProps
    extends Omit<DragDropContextProps, "onDragEnd" | "children"> {
    publicImages: TwoDimentionsDndNode[];
    privateImages: TwoDimentionsDndNode[];
    columns: ResponsiveColumns;
    preventDrag?: boolean;
    onDragEnd: (r: ExtendedDropResult) => void;
}

const Over25ImagesPreview = ({
    publicImages,
    privateImages,
    columns,
    preventDrag = false,
    onDragEnd,
    ...props
}: ImagePreviewReorderProps) => {
    const secondDndStartIndex = publicImages.length;

    const responsiveColumns = useResponsiveColumns(columns);

    const handleDragEnd: OnDragEndResponder = useCallback(
        (args) => onDragEnd({ ...args, columns: responsiveColumns }),
        [onDragEnd, responsiveColumns]
    );

    return (
        <DragDropContext onDragEnd={handleDragEnd} {...props}>
            <TwoDimentionsDndNoContext
                dndId={1}
                startIndex={0}
                columns={responsiveColumns}
                gap={0.5}
                preventDrag={preventDrag}
                minHeight="200px"
            >
                {publicImages}
            </TwoDimentionsDndNoContext>
            <Separator />
            <TwoDimentionsDndNoContext
                dndId={2}
                startIndex={secondDndStartIndex}
                columns={responsiveColumns}
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

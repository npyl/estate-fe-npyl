import { FC } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { TwoDimentionsDndNoContextProps } from "./types";
import TwoDimentionsDndNoContext from "./TwoDimentionsDndNoContext";
import { SxProps, Theme } from "@mui/material";

interface TwoDimentionsDndProps
    extends Omit<TwoDimentionsDndNoContextProps, "onDragEnd"> {
    onDragEnd: (results: DropResult) => void;
    draggableSx?: SxProps<Theme>;
}

export const TwoDimentionsDnd: FC<TwoDimentionsDndProps> = ({
    columns = 1,
    gap = 3,
    onDragEnd,
    children,
    draggableSx,
}) => (
    <DragDropContext onDragEnd={onDragEnd}>
        <TwoDimentionsDndNoContext
            columns={columns}
            gap={gap}
            draggableSx={draggableSx}
        >
            {children}
        </TwoDimentionsDndNoContext>
    </DragDropContext>
);

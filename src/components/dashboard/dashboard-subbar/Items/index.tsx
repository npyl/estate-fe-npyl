import { StackProps } from "@mui/material";
import { forwardRef, useImperativeHandle } from "react";
import { SubbarRef } from "@/contexts/tabs";
import useTabState from "./useTabState";
import { DragDropContext } from "@hello-pangea/dnd";
import useTabPusher from "./useTabPusher";
import DroppableContainer from "./DnD/Droppable";
import getTab from "./DnD/Draggable";
import ClearButton from "./ClearButton";

const SubbarItems = forwardRef<SubbarRef, StackProps>((props, ref) => {
    const [tabs, methods] = useTabState();

    useImperativeHandle(ref, () => methods, [methods]);

    useTabPusher(methods.pushTab, methods.setTabPath);

    const onDragEnd = (result: any) => {
        if (!result.destination) return; // If dropped outside of the d&d container, do nothing

        const reorderedTabs = Array.from(tabs); //create a new array from tabs
        const [movedTab] = reorderedTabs.splice(result.source.index, 1);
        reorderedTabs.splice(result.destination.index, 0, movedTab);

        methods.setTabs(reorderedTabs); //  Update state with new order
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <DroppableContainer {...props}>
                {tabs.map(getTab)}
                {tabs.length > 0 ? <ClearButton /> : null}
            </DroppableContainer>
        </DragDropContext>
    );
});

SubbarItems.displayName = "SubbarItems";

export default SubbarItems;

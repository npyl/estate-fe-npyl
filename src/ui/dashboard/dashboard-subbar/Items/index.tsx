import { StackProps } from "@mui/material";
import { forwardRef, useImperativeHandle } from "react";
import { SubbarRef } from "@/contexts/tabs";
import useTabState from "./useTabState";
import { DragDropContext } from "@hello-pangea/dnd";
import useTabPusher from "./useTabPusher";
import DroppableContainer from "./DnD/Droppable";
import getTab from "./DnD/Draggable";
import ClearButton from "./ClearButton";
import { SpaceBetween } from "@/components/styled";

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

    // INFO: prevent gap={1} from adding an extra spacing
    if (tabs.length === 0) return null;

    return (
        <SpaceBetween
            direction="row"
            alignItems="center"
            spacing={1}
            {...props}
        >
            <DragDropContext onDragEnd={onDragEnd}>
                <DroppableContainer>{tabs.map(getTab)}</DroppableContainer>
            </DragDropContext>

            <ClearButton />
        </SpaceBetween>
    );
});

SubbarItems.displayName = "SubbarItems";

export default SubbarItems;

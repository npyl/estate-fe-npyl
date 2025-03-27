import { Stack, StackProps, SxProps, Theme } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import dynamic from "next/dynamic";
import { SubbarRef } from "@/contexts/tabs";
import useTabState from "./useTabState";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import useTabPusher from "./useTabPusher";
const TabItem = dynamic(() => import("./Item"));

// ----------------------------------------------------------------------

const subbarContainerStyles: SxProps<Theme> = {
    overflowX: "auto",
    flexWrap: "nowrap",
    whiteSpace: "nowrap",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": { height: "6px" },
    "&::-webkit-scrollbar-thumb": {
        background: "#ccc",
        borderRadius: "3px",
    },
};

// ----------------------------------------------------------------------

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
            <Droppable droppableId="subbar-tabs" direction="horizontal">
                {(provided) => (
                    <Stack
                        ref={provided.innerRef}
                        direction="row"
                        spacing={0.5}
                        sx={subbarContainerStyles}
                        {...provided.droppableProps}
                        {...props}
                    >
                        {tabs.map((t, index) => (
                            <Draggable
                                key={t.path}
                                draggableId={t.path}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                            ...provided.draggableProps.style,
                                            opacity: snapshot.isDragging
                                                ? 0.8
                                                : 1,
                                            cursor: "grab",
                                        }}
                                    >
                                        <TabItem t={t} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </Stack>
                )}
            </Droppable>
        </DragDropContext>
    );
});

SubbarItems.displayName = "SubbarItems";

export default SubbarItems;

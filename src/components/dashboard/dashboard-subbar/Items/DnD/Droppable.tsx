import { Stack, StackProps, SxProps, Theme } from "@mui/material";
import { FC } from "react";
import { Droppable } from "@hello-pangea/dnd";

const subbarContainerStyles: SxProps<Theme> = {
    overflow: "auto hidden",
    flexWrap: "nowrap",
    whiteSpace: "nowrap",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": { height: "6px" },
    "&::-webkit-scrollbar-thumb": {
        background: "#ccc",
        borderRadius: "3px",
    },
};

const DroppableContainer: FC<StackProps> = ({ children, sx, ...props }) => (
    <Droppable droppableId="subbar-tabs" direction="horizontal">
        {(provided) => (
            <Stack
                ref={provided.innerRef}
                direction="row"
                spacing={0.5}
                sx={{ ...subbarContainerStyles, ...sx }}
                {...provided.droppableProps}
                {...props}
            >
                {children}
                {provided.placeholder}
            </Stack>
        )}
    </Droppable>
);

export default DroppableContainer;

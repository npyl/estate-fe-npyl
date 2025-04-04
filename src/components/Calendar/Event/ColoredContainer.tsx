import { forwardRef } from "react";
import { Stack } from "@mui/material";
import DraggableStack, { DraggableStackProps } from "./DraggableStack";
import { alpha } from "@mui/material/styles";

interface ColoredContainerProps extends Omit<DraggableStackProps, "bgcolor"> {
    bgcolor: string;
}

const ColoredContainer = forwardRef<HTMLDivElement, ColoredContainerProps>(
    ({ bgcolor, children, ...props }, ref) => (
        <DraggableStack ref={ref} {...props}>
            <Stack bgcolor={alpha(bgcolor, 0.4)} height={1} borderRadius={1}>
                {children}
            </Stack>
        </DraggableStack>
    )
);

ColoredContainer.displayName = "ColoredContainer";

export type { ColoredContainerProps };
export default ColoredContainer;

import Stack, { StackProps } from "@mui/material/Stack";
import { forwardRef } from "react";
import RoundIconButton from "@/components/RoundIconButton";
import { ChevronRight } from "@/assets/icons/chevron-right";

const CONTROLS_CLASSNAME = "PPHorizontalScrollbar-Controls";

interface ControlsProps extends StackProps {
    onScrollLeft: VoidFunction;
    onScrollRight: VoidFunction;
}

const Controls = forwardRef<HTMLDivElement, ControlsProps>(
    ({ onScrollLeft, onScrollRight, ...props }, ref) => (
        <Stack
            ref={ref}
            className={CONTROLS_CLASSNAME}
            direction="row"
            alignItems="center"
            width="fit-content"
            visibility="hidden"
            {...props}
        >
            <RoundIconButton size="small" onClick={onScrollLeft}>
                <ChevronRight sx={{ transform: "rotate(180deg)" }} />
            </RoundIconButton>
            <RoundIconButton size="small" onClick={onScrollRight}>
                <ChevronRight />
            </RoundIconButton>
        </Stack>
    )
);

export { CONTROLS_CLASSNAME };
export default Controls;

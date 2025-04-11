import { Box } from "@mui/material";
import { FC, RefObject, useRef } from "react";
import useStickyPoint from "./useStickyPoint";
import dynamic from "next/dynamic";
const SimpleCalendar = dynamic(() => import("./SimpleCalendar"));

const MD_WIDTH = "530px";

interface StickyCalendarProps {
    startRef: RefObject<HTMLDivElement>;
}

const StickyCalendar: FC<StickyCalendarProps> = ({ startRef }) => {
    const targetRef = useRef<HTMLDivElement>(null);
    useStickyPoint(startRef, targetRef);

    return (
        <Box
            width={{ xs: "100%", md: MD_WIDTH }}
            height="max-content"
            position={{ xs: "initial", md: "sticky" }}
            left="80%"
            zIndex={1}
            ref={targetRef}
        >
            <SimpleCalendar />
        </Box>
    );
};

export { MD_WIDTH };
export default StickyCalendar;

import { Box } from "@mui/material";
import { FC, RefObject, useRef } from "react";
import useStickyPoint from "./useStickyPoint";
import dynamic from "next/dynamic";
const SimpleCalendar = dynamic(() => import("./SimpleCalendar"));

interface StickyCalendarProps {
    startRef: RefObject<HTMLDivElement>;
}

const StickyCalendar: FC<StickyCalendarProps> = ({ startRef }) => {
    const targetRef = useRef<HTMLDivElement>(null);
    useStickyPoint(startRef, targetRef);

    return (
        <Box
            width={{ xs: "100%", md: "40%" }}
            height="max-content"
            position={{ xs: "initial", md: "sticky" }}
            left="70%"
            zIndex={1}
            ref={targetRef}
        >
            <SimpleCalendar />
        </Box>
    );
};

export default StickyCalendar;

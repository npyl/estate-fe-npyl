import { FC, useRef } from "react";
import useAvailableHeight from "@/hooks/useAvailableHeight";
import Stack, { StackProps } from "@mui/material/Stack";

const FullStack: FC<StackProps> = (props) => {
    const ref = useRef<HTMLDivElement>(null);
    useAvailableHeight(ref);
    return <Stack ref={ref} {...props} />;
};

export default FullStack;

import { FC, useRef } from "react";
import useAvailableHeight from "@/hooks/useAvailableHeight";
import Paper, { PaperProps } from "@mui/material/Paper";

const FullPaper: FC<PaperProps> = (props) => {
    const ref = useRef<HTMLDivElement>(null);
    useAvailableHeight(ref);
    return <Paper ref={ref} {...props} />;
};

export default FullPaper;

import Typography from "@mui/material/Typography";
import { FC, useMemo } from "react";

const DATE_WIDTH = "80px";

interface ThreadDateProps {
    date: string;
}

const ThreadDate: FC<ThreadDateProps> = ({ date }) => {
    const DATE = useMemo(
        () =>
            new Date(date).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            }),
        [date]
    );

    return (
        <Typography
            fontWeight="500"
            noWrap
            whiteSpace="nowrap"
            width={DATE_WIDTH}
            overflow="visible"
        >
            {DATE}
        </Typography>
    );
};

export { DATE_WIDTH };
export default ThreadDate;

import { CSSProperties, FC, HTMLAttributes } from "react";
import { START_HOUR, TOTAL_HOURS } from "./constant";
import Typography from "@mui/material/Typography";
import { DAY_CELL_HEIGHT } from "./constant";

const hours = Array.from({ length: TOTAL_HOURS }, (_, i) => i + START_HOUR);

// ------------------------------------------------------------------------------------------

interface NumberItemProps {
    hour: number;
}

const NumberItem: FC<NumberItemProps> = ({ hour }) => (
    <Typography
        variant="caption"
        width={50}
        textAlign="right"
        pr={1}
        color="text.secondary"
        minHeight={DAY_CELL_HEIGHT}
        borderBottom="1px solid"
        borderColor="divider"
    >
        {`${hour % 12 === 0 ? 12 : hour % 12} ${hour < 12 ? "AM" : "PM"}`}
    </Typography>
);

// ------------------------------------------------------------------------------------------

const getRow = (hour: number) => <NumberItem key={hour} hour={hour} />;

// ------------------------------------------------------------------------------------------

const columnStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
};

const Numbering: FC<HTMLAttributes<HTMLDivElement>> = ({ style, ...props }) => (
    <div style={{ ...columnStyle, ...style }} {...props}>
        {/* Rows */}
        {hours.map(getRow)}
    </div>
);

export default Numbering;

import { CSSProperties, FC } from "react";
import { START_HOUR, TOTAL_HOURS } from "../constant";
import Typography from "@mui/material/Typography";
import { DAY_CELL_HEIGHT } from "../constant";
import { CalendarNumberingProps } from "../types";
import Divider from "@mui/material/Divider";

const hours = Array.from({ length: TOTAL_HOURS }, (_, i) => i + START_HOUR);

// ------------------------------------------------------------------------------------------

const DividerSx: CSSProperties = {
    display: "inline-block",
    position: "absolute",
    width: "100%",
    left: 0,
};

interface NumberItemProps {
    hour: number;
}

const NumberItem: FC<NumberItemProps> = ({ hour }) => (
    <>
        <Typography
            variant="caption"
            width={50}
            minHeight={DAY_CELL_HEIGHT}
            textAlign="right"
            pr={1}
            color="text.secondary"
        >
            {`${hour % 12 === 0 ? 12 : hour % 12} ${hour < 12 ? "AM" : "PM"}`}

            {/* Row divider */}
            <Divider sx={DividerSx} />
        </Typography>
    </>
);

// ------------------------------------------------------------------------------------------

const getRow = (hour: number) => <NumberItem key={hour} hour={hour} />;

// ------------------------------------------------------------------------------------------

const columnStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "max-content", // INFO: this is important!
};

const Numbering: FC<CalendarNumberingProps> = ({ style, ...props }) => (
    <div style={{ ...columnStyle, ...style }} {...props}>
        {/* Rows */}
        {hours.map(getRow)}
    </div>
);

export default Numbering;

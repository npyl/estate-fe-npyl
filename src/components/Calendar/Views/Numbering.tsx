import { CSSProperties, FC } from "react";
import {
    START_HOUR,
    TOTAL_HOURS,
    Z_INDEX,
    DAY_CELL_HEIGHT,
} from "@/constants/calendar";
import Typography from "@mui/material/Typography";
import { CalendarNumberingProps } from "../types";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

const hours = Array.from({ length: TOTAL_HOURS }, (_, i) => i + START_HOUR);

// ------------------------------------------------------------------------------------------

const DividerSx: CSSProperties = {
    position: "absolute",
    width: "100%",
    zIndex: Z_INDEX.DIVIDER,
    left: 0,
    right: 0,
};

interface NumberItemProps {
    hour: number;
}

const NumberItem: FC<NumberItemProps> = ({ hour }) => (
    <Box width={50} height={DAY_CELL_HEIGHT}>
        <Typography
            variant="caption"
            textAlign="right"
            px={1}
            color="text.secondary"
            bgcolor={(theme) =>
                theme.palette.mode === "light" ? "neutral.300" : "neutral.700"
            }
            position="absolute"
            mt={-1}
            zIndex={Z_INDEX.NUMBERING}
            borderRadius="20px"
        >
            {`${hour % 12 === 0 ? 12 : hour % 12} ${hour < 12 ? "AM" : "PM"}`}
        </Typography>

        {/* Row divider */}
        <Divider sx={DividerSx} />
    </Box>
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

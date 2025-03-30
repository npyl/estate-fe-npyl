import { CSSProperties, FC } from "react";
import { Box, Divider } from "@mui/material";
import { gridStyle } from "./styled";
import { Z_INDEX } from "@/constants/calendar";
import { MODE_TOGGLE_WIDTH } from "./constants";

const getDivider = (date: Date) => (
    <Box key={date.toDateString()}>
        <Divider
            orientation="vertical"
            sx={{
                position: "absolute",
                height: "100vh",
                zIndex: Z_INDEX.DIVIDER,
            }}
        />
    </Box>
);

const verticalDividersStyle: CSSProperties = {
    marginLeft: MODE_TOGGLE_WIDTH,
    ...gridStyle,
};

interface VerticalDividersProps {
    weekDays: Date[];
}

const VerticalDividers: FC<VerticalDividersProps> = ({ weekDays }) => (
    <div style={verticalDividersStyle}>{weekDays.map(getDivider)}</div>
);

export default VerticalDividers;

import { Z_INDEX } from "@/constants/calendar";
import { SxProps, Theme } from "@mui/material";
import Divider from "@mui/material/Divider";

const DividerSx: SxProps<Theme> = {
    top: 0,
    height: "100vh",
    position: "absolute",
    zIndex: Z_INDEX.DIVIDER,
};

const VerticalDivider = () => (
    <Divider
        className="PPCalendar-VerticalDivider"
        orientation="vertical"
        sx={DividerSx}
    />
);

export default VerticalDivider;

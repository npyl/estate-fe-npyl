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
import { useTranslation } from "react-i18next";

const hours = Array.from({ length: TOTAL_HOURS }, (_, i) => i + START_HOUR);

// ------------------------------------------------------------------------------------------

const DividerSx: CSSProperties = {
    position: "absolute",
    width: "100%",
    left: 0,
    right: 0,
    zIndex: Z_INDEX.DIVIDER,
};

interface NumberItemProps {
    hour: number;
}

const getTranslatedAbrev = (beforeTwelve: boolean, lang: string) =>
    lang === "en" ? (beforeTwelve ? "AM" : "PM") : beforeTwelve ? "ΠΜ" : "ΜΜ";

const NumberItem: FC<NumberItemProps> = ({ hour }) => {
    const { i18n } = useTranslation();
    const lang = i18n.language;

    return (
        <Box width={50} height={DAY_CELL_HEIGHT}>
            <Typography
                variant="caption"
                textAlign="right"
                px={1}
                color="text.secondary"
                bgcolor={(theme) =>
                    theme.palette.mode === "light" ? "grey.200" : "neutral.700"
                }
                position="absolute"
                mt={-1}
                zIndex={Z_INDEX.NUMBERING}
                borderRadius="20px"
            >
                {`${hour % 12 === 0 ? 12 : hour % 12} ${getTranslatedAbrev(
                    hour < 12,
                    lang
                )}`}
            </Typography>

            {/* Row divider */}
            <Divider sx={DividerSx} />
        </Box>
    );
};

// ------------------------------------------------------------------------------------------

const getRow = (hour: number) => <NumberItem key={hour} hour={hour} />;

// ------------------------------------------------------------------------------------------

const columnStyle: CSSProperties = {
    height: "max-content", // INFO: this is important!
};

const Numbering: FC<CalendarNumberingProps> = ({ style, ...props }) => (
    <div
        className="PPCalendar-Numbering"
        style={{ ...columnStyle, ...style }}
        {...props}
    >
        {/* Rows */}
        {hours.map(getRow)}
    </div>
);

export default Numbering;

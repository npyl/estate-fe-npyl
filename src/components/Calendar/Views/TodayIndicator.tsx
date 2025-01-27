import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import calculateTimePosition from "../calculateTimePosition";
import { Z_INDEX } from "@/constants/calendar";

// INFO: small offset to not drop on the divider
const LINE_WIDTH = "calc(100% - 8px)";

const TodayIndicator = () => {
    const { top } = calculateTimePosition(new Date().toISOString(), "");

    return (
        <>
            <Stack
                direction="row"
                spacing={1}
                position="absolute"
                top={top}
                width={LINE_WIDTH}
                height={0}
                borderTop="5px solid red"
                borderRadius={1}
                zIndex={Z_INDEX.CURRENT_TIME_INDICATOR}
            />

            <Box
                top={top - 7}
                position="absolute"
                width="20px"
                height="20px"
                bgcolor="red"
                borderRadius="100%"
                zIndex={Z_INDEX.CURRENT_TIME_INDICATOR}
            />
        </>
    );
};

export default TodayIndicator;

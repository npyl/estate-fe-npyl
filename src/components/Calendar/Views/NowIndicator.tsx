import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import calculateTimePosition from "../calculateTimePosition";
import { Z_INDEX } from "@/constants/calendar";

const NowIndicator = () => {
    const { top } = calculateTimePosition(new Date().toISOString(), "");

    return (
        <>
            <Stack
                direction="row"
                spacing={1}
                position="absolute"
                top={top - 3}
                width={1}
                height={0}
                borderTop="2px solid red"
                borderRadius={1}
                zIndex={Z_INDEX.CURRENT_TIME_INDICATOR}
            />

            <Box
                top={top - 7}
                position="absolute"
                left={-5}
                width="10px"
                height="10px"
                bgcolor="red"
                borderRadius="100%"
                zIndex={Z_INDEX.CURRENT_TIME_INDICATOR}
            />
        </>
    );
};

export default NowIndicator;

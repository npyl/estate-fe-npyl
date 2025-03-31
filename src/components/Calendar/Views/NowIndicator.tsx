import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import calculateTimePosition from "../calculateTimePosition";
import { Z_INDEX } from "@/constants/calendar";
import { Theme } from "@mui/material";
import { useCallback, useLayoutEffect, useState } from "react";

const getWidth = ({ spacing }: Theme) => `calc(100% + ${spacing(2)})`;

const useEvery5Minutes = (cb: VoidFunction) => {
    useLayoutEffect(() => {
        cb();

        const intervalId = setInterval(cb, 5 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, [cb]);
};

const NowIndicator = () => {
    const [top, setTop] = useState(0);

    const updatePosition = useCallback(() => {
        const { top } = calculateTimePosition(new Date().toISOString(), "");
        setTop(top);
    }, []);

    useEvery5Minutes(updatePosition);

    return (
        <Stack
            direction="row"
            alignItems="center"
            position="absolute"
            top={top}
            left={2}
            right={0}
            zIndex={Z_INDEX.CURRENT_TIME_INDICATOR}
            width={getWidth}
            spacing={-0.1}
        >
            <Box width="12px" height="12px" bgcolor="red" borderRadius="100%" />

            <Stack
                width={1}
                height={0}
                border="1px solid red"
                borderRadius={5}
            />
        </Stack>
    );
};

export default NowIndicator;

import Stack from "@mui/material/Stack";
import ReplyButton from "./ReplyButton";
import { FC, PropsWithChildren, useRef } from "react";
import Title from "./Title";
import IsAuthenticatedGuard from "@/sections/Google/IsAuthenticatedGuard";
import BackButton from "./BackButton";
import Paper from "@mui/material/Paper";
import { SxProps, Theme } from "@mui/material";
import getBorderColor from "@/theme/borderColor";
import useAvailableHeight from "@/hooks/useAvailableHeight";

const PaperSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    border: "1px solid",
    borderColor: getBorderColor,
};

interface ContainerProps extends PropsWithChildren {
    threadId: string;
}

const Container: FC<ContainerProps> = ({ threadId, children }) => {
    const rootRef = useRef<HTMLElement>(document.body);
    const boxRef = useRef<HTMLDivElement>(null);
    useAvailableHeight(boxRef, rootRef);

    return (
        <Paper ref={boxRef} elevation={5} sx={PaperSx}>
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                p={1}
                boxShadow={5}
            >
                <BackButton />
                <Title threadId={threadId} />
            </Stack>

            <Stack spacing={1} height={1} overflow="hidden auto">
                {children}
            </Stack>

            <IsAuthenticatedGuard>
                <Stack boxShadow={5} p={1}>
                    <ReplyButton threadId={threadId} />
                </Stack>
            </IsAuthenticatedGuard>
        </Paper>
    );
};

export default Container;

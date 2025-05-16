import IsAuthenticatedIndicator from "@/sections/Google/WorkspaceIndicator/IsAuthenticatedIndicator";
import Stack from "@mui/material/Stack";
import ReplyButton from "./ReplyButton";
import { FC, PropsWithChildren } from "react";
import { SpaceBetween } from "@/components/styled";
import Title from "./Title";
import IsAuthenticatedGuard from "@/sections/Google/IsAuthenticatedGuard";
import BackButton from "./BackButton";
import Paper from "@mui/material/Paper";
import { SxProps, Theme } from "@mui/material";
import getBorderColor from "@/theme/borderColor";

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

const Container: FC<ContainerProps> = ({ threadId, children }) => (
    <Paper elevation={5} sx={PaperSx}>
        <SpaceBetween alignItems="center" p={1} boxShadow={5}>
            <Stack direction="row" spacing={1} alignItems="center">
                <BackButton />
                <Title threadId={threadId} />
            </Stack>

            <IsAuthenticatedIndicator />
        </SpaceBetween>

        {children}

        <IsAuthenticatedGuard>
            <Stack boxShadow={5} p={1}>
                <ReplyButton />
            </Stack>
        </IsAuthenticatedGuard>
    </Paper>
);

export default Container;

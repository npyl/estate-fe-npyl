import { SpaceBetween } from "@/components/styled";
import { Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import TasksCount from "./TasksCount";
const Controls = dynamic(() => import("./Controls"));
const DoneIndicator = dynamic(() => import("./DoneIndicator"));

type Props = {
    columnId: number;
    name: string;
    done: boolean;
};

export default function Header({ name, done, columnId }: Props) {
    return (
        <SpaceBetween
            alignItems="center"
            spacing={1}
            px={1}
            // ...
            position="sticky"
            top={0}
            bgcolor="background.default"
            zIndex={10}
            // ...
            boxShadow={5}
        >
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                overflow="hidden"
                width={1}
                height="48px"
            >
                <Typography
                    variant="h6"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    maxWidth="80%"
                    noWrap
                >
                    {name}
                </Typography>

                <TasksCount columnId={columnId} />

                {done ? <DoneIndicator /> : null}
            </Stack>

            <Controls columnId={columnId} makeDone={!done} />
        </SpaceBetween>
    );
}

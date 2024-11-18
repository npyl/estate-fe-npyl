import { SpaceBetween } from "@/components/styled";
import { Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
const Controls = dynamic(() => import("./Controls"));
const DoneIndicator = dynamic(() => import("./DoneIndicator"));

type Props = {
    columnId: number;
    name: string;
    count: number;
    done: boolean;
};

export default function Header({ name, count, done, columnId }: Props) {
    return (
        <SpaceBetween alignItems="center" spacing={1}>
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                overflow="hidden"
                width={1}
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
                <Typography variant="h6" noWrap>
                    ({count})
                </Typography>
                {done ? <DoneIndicator /> : null}
            </Stack>

            <Controls columnId={columnId} makeDone={!done} />
        </SpaceBetween>
    );
}

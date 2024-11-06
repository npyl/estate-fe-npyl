import { SpaceBetween } from "@/components/styled";
import { Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
const Controls = dynamic(() => import("./Controls"));

type Props = {
    columnId: number;
    name: string;
    count: number;
};

export default function Header({ name, count, columnId }: Props) {
    return (
        <SpaceBetween alignItems="center" spacing={1}>
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                overflow="hidden"
            >
                <Typography
                    variant="h6"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    maxWidth="80%"
                >
                    {name}
                </Typography>
                <Typography variant="h6" noWrap>
                    ({count})
                </Typography>
            </Stack>

            <Controls columnId={columnId} />
        </SpaceBetween>
    );
}

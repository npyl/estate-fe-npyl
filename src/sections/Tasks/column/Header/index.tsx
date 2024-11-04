import { SpaceBetween } from "@/components/styled";
import { Typography } from "@mui/material";
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
            <Typography variant="h6">
                {name} ({count})
            </Typography>

            <Controls columnId={columnId} />
        </SpaceBetween>
    );
}

// @mui
import { SpaceBetween } from "@/components/styled";
import { Typography } from "@mui/material";
import Controls from "./Controls";

type Props = {
    name: string;
    count: number;
};

export default function Header({ name, count }: Props) {
    return (
        <SpaceBetween alignItems="center" spacing={1}>
            <Typography variant="h6">
                {name} ({count})
            </Typography>

            <Controls />
        </SpaceBetween>
    );
}

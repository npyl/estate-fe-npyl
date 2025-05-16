import { SpaceBetween } from "@/components/styled";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";

interface HeaderProps {
    from: string;
    date: string;
}

const Header: FC<HeaderProps> = ({ from, date }) => (
    <SpaceBetween direction="row" alignItems="center">
        <Stack direction="row" spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
                {from || ""}
            </Typography>
        </Stack>

        <Typography variant="caption" color="text.secondary">
            {new Date(date).toLocaleString()}
        </Typography>
    </SpaceBetween>
);

export default Header;

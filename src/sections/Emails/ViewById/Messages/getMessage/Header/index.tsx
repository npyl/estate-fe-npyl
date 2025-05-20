import { SpaceBetween } from "@/components/styled";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import Sender from "./Sender";

interface HeaderProps {
    from: string;
    date: string;
}

const Header: FC<HeaderProps> = ({ from, date }) => (
    <SpaceBetween direction="row" alignItems="center">
        <Sender from={from} />

        <Typography variant="caption" color="text.secondary">
            {new Date(date).toLocaleString()}
        </Typography>
    </SpaceBetween>
);

export default Header;

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import PriorityLabel from "./PriorityLabel";

// ------------------------------------------------------------------

const EllipsisSx = {
    overflow: "hidden",
    textOverflow: "ellipsis",
};

interface ContentProps {
    name: string;
    priority: number;
}

const Content: FC<ContentProps> = ({ name, priority }) => (
    <Stack direction="row" spacing={1}>
        <Typography sx={EllipsisSx} variant="body2">
            {name}
        </Typography>
        <PriorityLabel priority={priority} />
    </Stack>
);

export default Content;

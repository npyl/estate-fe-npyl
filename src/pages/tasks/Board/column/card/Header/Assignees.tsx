import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { FC } from "react";

const AvatarSx = {
    height: "35px",
    width: "35px",
};

const getAvatar = (name: string) => (
    <Avatar key={name} sx={AvatarSx}>
        {name}
    </Avatar>
);

interface Props {
    names: string[];
}

const Assignees: FC<Props> = ({ names }) => (
    <AvatarGroup max={4}>{names.map(getAvatar)}</AvatarGroup>
);

export default Assignees;

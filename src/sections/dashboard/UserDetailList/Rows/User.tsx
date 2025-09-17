import { IUserDetails } from "@/types/dashboard";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import Avatar from "@/components/Avatar";

interface UserProps {
    u: IUserDetails;
}

const User: FC<UserProps> = ({ u }) => {
    const fullname = `${u?.firstName || ""} ${u?.lastName || ""}`;

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
                src={u?.avatar}
                firstName={u?.firstName}
                lastName={u?.lastName}
                sx={{ width: 34, height: 34 }}
            />

            <Typography
                fontWeight="bold"
                variant="body2"
                width="fit-content"
                noWrap
                textOverflow="ellipsis"
            >
                {fullname}
            </Typography>
        </Stack>
    );
};

export default User;

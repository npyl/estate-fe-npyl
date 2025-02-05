import { Stack, Typography } from "@mui/material";
import { useAuth } from "@/hooks/use-auth";

import Avatar from "@/components/Avatar";

const Header = () => {
    const { user } = useAuth();
    const { avatar, firstName, lastName } = user || {};
    const fullname = `${firstName || ""} ${lastName || ""}`;

    return (
        <Stack
            direction="row"
            width="fit-content"
            justifyContent="center"
            spacing={3}
            alignItems="center"
        >
            <Avatar src={avatar} firstName={firstName} lastName={lastName} />
            <Stack width="fit-content" spacing={-0.5}>
                <Typography variant="subtitle1">{fullname}</Typography>

                <Typography variant="subtitle2" color="text.secondary">
                    {user?.username}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default Header;

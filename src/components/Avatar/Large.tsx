import Stack from "@mui/material/Stack";
import Avatar, { AvatarProps } from ".";
import Typography from "@mui/material/Typography";
import { forwardRef } from "react";

interface AvatarLargeProps extends AvatarProps {
    email: string;
}

const AvatarLarge = forwardRef<HTMLDivElement, AvatarLargeProps>(
    (props, ref) => {
        const { firstName, lastName, email } = props || {};
        const fullname = `${firstName || ""} ${lastName || ""}`.trim();
        return (
            <Stack direction="row" spacing={1} alignItems="center">
                <Avatar ref={ref} {...props} />
                <Stack spacing={-0.5}>
                    <Typography variant="body1" fontWeight="bold">
                        {fullname}
                    </Typography>
                    <Typography color="text.secondary">{email}</Typography>
                </Stack>
            </Stack>
        );
    }
);

AvatarLarge.displayName = "AvatarLarge";

export type { AvatarLargeProps };
export default AvatarLarge;

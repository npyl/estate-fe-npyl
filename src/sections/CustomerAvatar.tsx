import Stack from "@mui/material/Stack";
import Avatar, { AvatarProps } from "@/components/Avatar";
import Typography from "@mui/material/Typography";
import { forwardRef } from "react";
import { SxProps, Theme } from "@mui/material";

const AvatarSx: SxProps<Theme> = {
    width: 24,
    height: 24,
    bgcolor: "primary.main",
    color: "white !important",
};

interface CustomerAvatarProps extends Omit<AvatarProps, "src"> {
    email?: string;
}

const CustomerAvatar = forwardRef<HTMLDivElement, CustomerAvatarProps>(
    ({ firstName, lastName, email, sx, ...props }, ref) => {
        const fullname = `${firstName || ""} ${lastName || ""}`.trim();
        return (
            <Stack direction="row" spacing={1} alignItems="center">
                <Avatar ref={ref} sx={{ ...AvatarSx, ...sx }} {...props} />
                <Stack spacing={-0.5}>
                    <Typography variant="body2">{fullname}</Typography>
                    {email ? (
                        <Typography color="text.secondary">{email}</Typography>
                    ) : null}
                </Stack>
            </Stack>
        );
    }
);

CustomerAvatar.displayName = "AvatarLarge";

export type { CustomerAvatarProps };
export default CustomerAvatar;

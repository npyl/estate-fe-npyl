import Stack, { StackProps } from "@mui/material/Stack";
import Avatar, { AvatarProps } from ".";
import Typography from "@mui/material/Typography";
import { forwardRef } from "react";

const PPAvatarLargeContentRightCN = "PPAvatarLargeContentRightCN";

interface AvatarLargeProps extends AvatarProps {
    email: string;
    containerProps?: StackProps;
}

const AvatarLarge = forwardRef<HTMLDivElement, AvatarLargeProps>(
    ({ containerProps, ...props }, ref) => {
        const { firstName, lastName, email } = props || {};
        const fullname = `${firstName || ""} ${lastName || ""}`.trim();
        return (
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                {...containerProps}
            >
                <Avatar ref={ref} {...props} />
                <Stack className={PPAvatarLargeContentRightCN} spacing={-0.5}>
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

export { PPAvatarLargeContentRightCN };
export type { AvatarLargeProps };
export default AvatarLarge;

import { forwardRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import Avatar, { AvatarProps } from "@/components/Avatar";

const AvatarButton = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
    const { user } = useAuth();

    return (
        <Avatar
            ref={ref}
            firstName={user?.firstName}
            lastName={user?.lastName}
            src={user?.avatar}
            sx={{
                height: 40,
                width: 40,
            }}
            {...props}
        />
    );
});

export default AvatarButton;

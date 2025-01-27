import { forwardRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import GrowingPopover from "@/components/GrowingPopover";
import Avatar, { AvatarProps } from "@/components/Avatar";
import Header from "./Header";
import Content from "./Content";

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

const AccountPopover = () => (
    <GrowingPopover HeadContentLeft={Header} Opener={AvatarButton}>
        <Content />
    </GrowingPopover>
);

export default AccountPopover;

import { Box, BoxProps, ButtonBase } from "@mui/material";
import { FC, useRef } from "react";
import Avatar from "@/components/Avatar";
import { useAuth } from "@/hooks/use-auth";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
const AccountPopover = dynamic(() => import("./account-popover"));

const AccountButton: FC<BoxProps> = ({ sx, ...props }) => {
    const { user } = useAuth();

    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const [isOpen, openPopover, closePopover] = useDialog();

    return (
        <>
            <Box
                component={ButtonBase}
                onClick={openPopover}
                ref={anchorRef}
                sx={{
                    position: "relative",
                    alignItems: "center",
                    display: "flex",
                    ml: 1,
                    ...sx,
                }}
                {...props}
            >
                <Avatar
                    firstName={user?.firstName}
                    lastName={user?.lastName}
                    src={user?.avatar}
                    sx={{
                        height: 40,
                        width: 40,
                        zIndex: 10000,
                    }}
                />
            </Box>

            {isOpen ? <AccountPopover /> : null}
        </>
    );
};

export default AccountButton;

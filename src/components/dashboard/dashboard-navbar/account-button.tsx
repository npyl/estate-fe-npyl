import { Box, ButtonBase } from "@mui/material";
import { useRef } from "react";
import { AccountPopover } from "./account-popover";
import Avatar from "@/components/Avatar";
import { useAuth } from "@/hooks/use-auth";
import useDialog from "@/hooks/useDialog";

const AccountButton = () => {
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
                    alignItems: "center",
                    display: "flex",
                    ml: 2,
                }}
            >
                <Avatar
                    firstName={user?.firstName}
                    lastName={user?.lastName}
                    src={user?.avatar}
                    sx={{
                        height: 40,
                        width: 40,
                    }}
                />
            </Box>

            {isOpen ? (
                <AccountPopover
                    anchorEl={anchorRef.current}
                    onClose={closePopover}
                    open
                />
            ) : null}
        </>
    );
};

export default AccountButton;

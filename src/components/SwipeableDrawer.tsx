import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Dispatch, ReactNode } from "react";

type Props = {
    content: ReactNode;
    open: boolean;
    setOpen: Dispatch<React.SetStateAction<boolean>>;
};

export default function SwipeableTemporaryDrawer({
    content,
    open,
    setOpen,
}: Props) {
    const toggleDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }

            setOpen(open);
        };

    return (
        <SwipeableDrawer
            anchor={"bottom"}
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            <Box
                width="auto"
                // onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                {content}
            </Box>
        </SwipeableDrawer>
    );
}

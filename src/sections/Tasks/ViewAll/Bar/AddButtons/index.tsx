import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FC, useRef } from "react";
import CreateFab from "@/ui/CreateFab";
const CardDialog = dynamic(() => import("@/sections/Tasks/card/CardDialog"));
const Menu = dynamic(() => import("./Menu"));

interface AddButtonsProps {
    create?: boolean;
}

const AddButtons: FC<AddButtonsProps> = ({ create = false }) => {
    const anchorRef = useRef(null);

    const [isMenuOpen, openMenu, closeMenu] = useDialog();
    const [isDialogOpen, openDialog, closeDialog] = useDialog(create);

    return (
        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
            <CreateFab onClick={openDialog} />

            <IconButton ref={anchorRef} onClick={openMenu}>
                <MenuIcon />
            </IconButton>

            {isMenuOpen && anchorRef.current ? (
                <Menu anchorEl={anchorRef.current} onClose={closeMenu} />
            ) : null}

            {isDialogOpen ? <CardDialog onClose={closeDialog} /> : null}
        </Stack>
    );
};

export default AddButtons;

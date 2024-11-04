import AddIcon from "@mui/icons-material/Add";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRef } from "react";
const CardDialog = dynamic(() => import("@/sections/Tasks/card/CardDialog"));
const Menu = dynamic(() => import("./Menu"));

const AddButtons = () => {
    const { t } = useTranslation();

    const anchorRef = useRef(null);

    const [isMenuOpen, openMenu, closeMenu] = useDialog();
    const [isDialogOpen, openDialog, closeDialog] = useDialog();

    return (
        <Stack direction="row" spacing={1}>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={openDialog}
            >
                {t("Add Task")}
            </Button>

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

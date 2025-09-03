import AddIcon from "@mui/icons-material/Add";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FC, useRef } from "react";
import { HideText } from "@/components/styled";
import { TASK } from "@/constants/tests";
const CardDialog = dynamic(() => import("@/sections/Tasks/card/CardDialog"));
const Menu = dynamic(() => import("./Menu"));

interface AddButtonsProps {
    create?: boolean;
}

const AddButtons: FC<AddButtonsProps> = ({ create = false }) => {
    const { t } = useTranslation();

    const anchorRef = useRef(null);

    const [isMenuOpen, openMenu, closeMenu] = useDialog();
    const [isDialogOpen, openDialog, closeDialog] = useDialog(create);

    return (
        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
            <Button
                data-testid={TASK.CREATE_ID}
                variant="contained"
                startIcon={<AddIcon />}
                onClick={openDialog}
                sx={{
                    textWrap: "nowrap",
                    ...HideText,
                }}
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

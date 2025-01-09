import { useTranslation } from "react-i18next";
import { useRef } from "react";
import Button from "@mui/material/Button";
import useDialog from "@/hooks/useDialog";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import dynamic from "next/dynamic";
import { SxProps, Theme } from "@mui/material";
const Menu = dynamic(() => import("./Menu"));

const ButtonSx: SxProps<Theme> = {
    color: "white",
    fontSize: "16px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
};

const CreateButton = () => {
    const { t } = useTranslation();

    const anchorRef = useRef<HTMLButtonElement>(null);
    const [isOpen, openMenu, closeMenu] = useDialog();

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleOutlineIcon />}
                onClick={openMenu}
                sx={ButtonSx}
                ref={anchorRef}
            >
                {t("Create")}
            </Button>

            {isOpen && anchorRef.current ? (
                <Menu anchorEl={anchorRef.current} onClose={closeMenu} />
            ) : null}
        </>
    );
};

export default CreateButton;

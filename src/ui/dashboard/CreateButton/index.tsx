import { useTranslation } from "react-i18next";
import { FC, useRef } from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import useDialog from "@/hooks/useDialog";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import dynamic from "next/dynamic";
import { SxProps, Theme } from "@mui/material";
const Menu = dynamic(() => import("./Menu"));

const ButtonSx: SxProps<Theme> = {
    color: "white",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
    "&:hover": {
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
    },
};

const CreateButton: FC<ButtonProps> = ({ sx, ...props }) => {
    const { t } = useTranslation();

    const anchorRef = useRef<HTMLButtonElement>(null);
    const [isOpen, openMenu, closeMenu] = useDialog();

    return (
        <>
            <Button
                ref={anchorRef}
                variant="contained"
                color="primary"
                startIcon={<AddCircleOutlineIcon />}
                onClick={openMenu}
                sx={{ ...ButtonSx, ...sx }}
                {...props}
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

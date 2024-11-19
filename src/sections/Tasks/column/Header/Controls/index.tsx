import useDialog from "@/hooks/useDialog";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import { FC, useRef } from "react";
const MakeDoneButton = dynamic(() => import("./MakeDoneButton"));
const Menu = dynamic(() => import("./Menu"));

interface Props {
    columnId: number;
    makeDone: boolean;
}

const Controls: FC<Props> = ({ columnId, makeDone }) => {
    const anchorRef = useRef(null);
    const [isOpen, openMenu, closeMenu] = useDialog();

    return (
        <>
            <Stack className="Controls" direction="row" spacing={1}>
                {makeDone ? <MakeDoneButton columnId={columnId} /> : null}

                <IconButton ref={anchorRef} size="small" onClick={openMenu}>
                    <MenuIcon />
                </IconButton>
            </Stack>

            {isOpen && anchorRef.current ? (
                <Menu
                    columnId={columnId}
                    anchorEl={anchorRef.current}
                    onClose={closeMenu}
                />
            ) : null}
        </>
    );
};

export default Controls;

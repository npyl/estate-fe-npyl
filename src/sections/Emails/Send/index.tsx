import useDialog from "@/hooks/useDialog";
import AddIcon from "@mui/icons-material/Add";
import { SxProps, Theme } from "@mui/material";
import Fab from "@mui/material/Fab";
import dynamic from "next/dynamic";
import { FC } from "react";
const MessageBox = dynamic(() => import("./MessageBox"));

const FabSx: SxProps<Theme> = {
    position: "absolute",
    bottom: 30,
    right: 30,
    zIndex: 1,
};

interface Props {}

const Send: FC<Props> = ({}) => {
    const [isOpen, openBox, closeBox] = useDialog();

    return (
        <>
            <Fab sx={FabSx} color="primary" onClick={openBox}>
                <AddIcon />
            </Fab>
            {isOpen ? <MessageBox onClose={closeBox} /> : null}
        </>
    );
};

export default Send;

import useDialog from "@/hooks/useDialog";
import AddIcon from "@mui/icons-material/Add";
import { SxProps, Theme } from "@mui/material";
import Fab from "@mui/material/Fab";
import dynamic from "next/dynamic";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
const MessageBox = dynamic(() => import("./MessageBox"));

const FabSx: SxProps<Theme> = {
    position: "absolute",
    bottom: 30,
    right: 30,
    zIndex: 1,
};

const Send = () => {
    const [isOpen, openBox, closeBox] = useDialog();
    const { filters } = useFiltersContext();
    const { to, propertyIds } = filters || {};

    return (
        <>
            <Fab sx={FabSx} color="primary" onClick={openBox}>
                <AddIcon />
            </Fab>
            {isOpen ? (
                <MessageBox
                    to={to}
                    propertyIds={propertyIds}
                    onClose={closeBox}
                />
            ) : null}
        </>
    );
};

export default Send;

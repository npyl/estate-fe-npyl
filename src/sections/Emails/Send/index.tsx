import useDialog from "@/hooks/useDialog";
import AddIcon from "@mui/icons-material/Add";
import { SxProps, Theme } from "@mui/material";
import Fab from "@mui/material/Fab";
import dynamic from "next/dynamic";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import { LAYOUT } from "@/constants/config";
const MessageBox = dynamic(() => import("./MessageBox"));

const FabSx: SxProps<Theme> = {
    position: "fixed",
    bottom: LAYOUT.FAB_OFFSET_BOTTOM,
    right: 30,
    zIndex: 1,
};

const Send = () => {
    const [isOpen, openBox, closeBox] = useDialog();
    const {
        to,
        toFreeSoloed,
        filters: { propertyIds },
    } = useFiltersContext();

    return (
        <>
            <Fab sx={FabSx} color="primary" onClick={openBox}>
                <AddIcon />
            </Fab>
            {isOpen ? (
                <MessageBox
                    to={to}
                    toFreeSoloed={toFreeSoloed}
                    propertyIds={propertyIds}
                    onClose={closeBox}
                />
            ) : null}
        </>
    );
};

export default Send;

import Drawer from "@mui/material/Drawer";
import { FC } from "react";
import Content from "./Content";

interface DemandDrawerProps {
    onClose: VoidFunction;
}

const DemandDrawer: FC<DemandDrawerProps> = ({ onClose }) => (
    <Drawer
        open
        anchor="right"
        keepMounted // INFO: this is important; It is a big component, therefore, once we load it, keep it loaded on the DOM
        PaperProps={{
            sx: {
                position: "absolute",
                zIndex: 3,
                p: 2,
                width: {
                    xs: "100vw",
                    lg: "50vw",
                },
            },
        }}
        onClose={onClose}
    >
        <Content onClose={onClose} />
    </Drawer>
);

export default DemandDrawer;

import Drawer from "@mui/material/Drawer";
import { FC } from "react";
import Content from "./Content";
import { FieldArrayProvider } from "@/components/hook-form/FieldArrayContext";
import { ICustomerYup } from "../types";

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
        <FieldArrayProvider<ICustomerYup> name="demands">
            <Content onClose={onClose} />
        </FieldArrayProvider>
    </Drawer>
);

export default DemandDrawer;

import Drawer from "@mui/material/Drawer";
import { FC, useCallback, useRef } from "react";
import Content from "./Content";
import Form, { FormRef, IDemandForms } from "./Form";

interface DemandDrawerProps {
    onClose: (v: IDemandForms) => void;
}

const DemandDrawer: FC<DemandDrawerProps> = ({ onClose }) => {
    const formRef = useRef<FormRef>(null);

    const handleClose = useCallback(() => {
        const values = formRef.current?.getValues();
        if (!values) return;
        onClose(values);
    }, []);

    return (
        <Drawer
            open
            anchor="right"
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
            onClose={handleClose}
        >
            <Form ref={formRef}>
                <Content onClose={handleClose} />
            </Form>
        </Drawer>
    );
};

export default DemandDrawer;

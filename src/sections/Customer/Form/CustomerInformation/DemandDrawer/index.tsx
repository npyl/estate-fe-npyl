import Drawer from "@mui/material/Drawer";
import { FC, useCallback, useRef } from "react";
import Content from "./Content";
import Form, { FormRef, IDemandForms } from "./Form";
import Controls from "./Controls";

interface DemandDrawerProps {
    onClose: VoidFunction;
    onSave: (v: IDemandForms) => void;
}

const DemandDrawer: FC<DemandDrawerProps> = ({ onSave, onClose }) => {
    const formRef = useRef<FormRef>(null);

    const handleSave = useCallback(() => {
        const values = formRef.current?.getValues();
        if (!values) return;
        onSave(values);
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
            onClose={onClose}
        >
            <Form ref={formRef}>
                <Content onClose={onClose} />
                <Controls onSave={handleSave} />
            </Form>
        </Drawer>
    );
};

export default DemandDrawer;

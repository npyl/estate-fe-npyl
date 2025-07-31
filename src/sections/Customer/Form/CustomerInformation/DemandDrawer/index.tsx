import Drawer from "@mui/material/Drawer";
import { FC, useCallback, useRef } from "react";
import Content from "./Content";
import Form, { FormRef, IDemandForms } from "./Form";
import Controls from "./Controls";
import { DEMAND_FORM_ID } from "@/sections/Customer/Form/constants";

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
            <Form ref={formRef} data-testid={DEMAND_FORM_ID}>
                <Content onClose={onClose} />
                <Controls onSave={handleSave} />
            </Form>
        </Drawer>
    );
};

export { DEMAND_FORM_ID };
export default DemandDrawer;

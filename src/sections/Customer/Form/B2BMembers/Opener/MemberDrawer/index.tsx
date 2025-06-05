import { FC } from "react";
import { Drawer, DrawerProps } from "@mui/material";
import { makeStickyBottom } from "@/ui/FormBottomBar";
import Title from "./Title";
import Form from "./Form";
import Actions from "./Actions";
import Content from "./Content";
import { B2BMemberReq } from "@/types/customer";

const PaperProps: DrawerProps["PaperProps"] = {
    sx: {
        p: 1,

        width: {
            xs: "100vw",
            lg: "30vw",
        },

        ...makeStickyBottom,
    },
};

interface ModalProps {
    onSave: (d: B2BMemberReq) => void;
    onClose: () => void;
}

const MemberDrawer: FC<ModalProps> = ({ onSave, onClose }) => (
    <Drawer open anchor="right" PaperProps={PaperProps} onClose={onClose}>
        <Form>
            <Title />
            <Content />
            <Actions onSave={onSave} />
        </Form>
    </Drawer>
);

export default MemberDrawer;

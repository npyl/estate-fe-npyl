import { FC, useCallback } from "react";
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

interface MemberDrawerProps {
    member?: B2BMemberReq;
    onAdd: (d: B2BMemberReq) => void;
    onClose: () => void;
}

const MemberDrawer: FC<MemberDrawerProps> = ({
    member,
    onAdd: _onAdd,
    onClose,
}) => {
    const onAdd = useCallback(
        (d: B2BMemberReq) => {
            _onAdd(d);
            onClose();
        },
        [_onAdd, onClose]
    );

    return (
        <Drawer open anchor="right" PaperProps={PaperProps} onClose={onClose}>
            <Form member={member}>
                <Title member={member} />
                <Content />
                <Actions onSave={onAdd} onCancel={onClose} />
            </Form>
        </Drawer>
    );
};

export type { MemberDrawerProps };
export default MemberDrawer;

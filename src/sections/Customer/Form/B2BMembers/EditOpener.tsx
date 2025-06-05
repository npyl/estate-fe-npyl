import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { FC, useCallback } from "react";
import MemberDrawer from "./Opener/MemberDrawer";
import PPOpener, { useOpener } from "@/components/Opener";
import { B2BMemberReq } from "@/types/customer";
import EditIcon from "@mui/icons-material/Edit";

type ClickerProps = Omit<IconButtonProps, "onClick"> & {
    onClick: VoidFunction;
};

const Clicker: FC<ClickerProps> = (props) => (
    <IconButton {...props}>
        <EditIcon />
    </IconButton>
);

interface EditOpenerProps {
    index: number;
    member: B2BMemberReq;
    onEdit: (index: number, m: B2BMemberReq) => void;
}

const EditOpener: FC<EditOpenerProps> = ({ member, index, onEdit }) => {
    const [openerRef, onClick] = useOpener();

    const onAdd = useCallback(
        (m: B2BMemberReq) => onEdit(index, m),
        [onEdit, index]
    );

    return (
        <PPOpener
            ref={openerRef}
            Clicker={Clicker}
            Component={MemberDrawer}
            ComponentProps={{
                member,
                onAdd,
            }}
            onClick={onClick}
        />
    );
};

export default EditOpener;

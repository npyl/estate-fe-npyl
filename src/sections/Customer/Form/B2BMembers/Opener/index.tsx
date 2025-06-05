import { IconButton, IconButtonProps } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { FC, useCallback, useRef } from "react";
import { ICustomerYup } from "../../types";
import PPOpener, { OpenerRef } from "@/components/Opener";
import dynamic from "next/dynamic";
const MemberDrawer = dynamic(() => import("./MemberDrawer"));

type ClickerProps = Omit<IconButtonProps, "onClick"> & {
    onClick: VoidFunction;
};

const Clicker: FC<ClickerProps> = (props) => (
    <IconButton {...props}>
        <AddCircle />
    </IconButton>
);

interface OpenerProps {
    onAdd: (b: ICustomerYup) => void;
}

const Opener: FC<OpenerProps> = ({ onAdd }) => {
    const openerRef = useRef<OpenerRef>(null);
    const onOpen = useCallback(() => openerRef.current?.open(), []);

    return (
        <PPOpener
            ref={openerRef}
            Clicker={Clicker}
            Component={MemberDrawer}
            ComponentProps={{
                onAdd,
            }}
            onClick={onOpen}
        />
    );
};

export default Opener;

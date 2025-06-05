import { FC } from "react";
import { ICustomerYup } from "../../types";
import PPOpener, { useOpener } from "@/components/Opener";
import dynamic from "next/dynamic";
import Clicker from "./Clicker";
const MemberDrawer = dynamic(() => import("./MemberDrawer"));

interface OpenerProps {
    onAdd: (b: ICustomerYup) => void;
}

const Opener: FC<OpenerProps> = ({ onAdd }) => {
    const [openerRef, onClick] = useOpener();

    return (
        <PPOpener
            ref={openerRef}
            Clicker={Clicker}
            Component={MemberDrawer}
            ComponentProps={{
                onAdd,
            }}
            onClick={onClick}
        />
    );
};

export default Opener;

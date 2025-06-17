import PPOpener, { useOpener } from "@/components/Opener";
import dynamic from "next/dynamic";
import RemoveButton from "./RemoveButton";
import { FC } from "react";
const ConfirmDialog = dynamic(() => import("./ConfirmDialog"));

interface Props {
    siteId: number;
}

const RemoveOpener: FC<Props> = ({ siteId }) => {
    const [openerRef, onClick] = useOpener();

    return (
        <PPOpener
            ref={openerRef}
            Clicker={RemoveButton}
            Component={ConfirmDialog}
            ComponentProps={{ siteId }}
            onClick={onClick}
        />
    );
};

export default RemoveOpener;

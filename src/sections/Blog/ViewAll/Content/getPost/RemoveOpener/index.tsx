import { useOpener } from "@/components/Opener";
import dynamic from "next/dynamic";
import { FC } from "react";
import PPOpener from "@/components/Opener";
import RemoveButton from "./RemoveButton";
const ConfirmDialog = dynamic(() => import("./ConfirmDialog"));

interface Props {
    siteId: number;
    postId: number;
}

const RemoveOpener: FC<Props> = (props) => {
    const [openerRef, onClick] = useOpener();

    return (
        <PPOpener
            ref={openerRef}
            Clicker={RemoveButton}
            Component={ConfirmDialog}
            ComponentProps={props}
            onClick={onClick}
        />
    );
};

export default RemoveOpener;

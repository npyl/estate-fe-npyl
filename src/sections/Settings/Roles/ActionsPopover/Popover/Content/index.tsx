import { FC } from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

interface ContentProps {
    roleId: number;
    onClose: VoidFunction;
}

const Content: FC<ContentProps> = ({ roleId, onClose }) => (
    <>
        <EditButton roleId={roleId} onClose={onClose} />
        <DeleteButton roleId={roleId} onClose={onClose} />
    </>
);

export default Content;

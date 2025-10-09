import { FC } from "react";
import DeleteButton from "./DeleteButton";
import { LabelResourceType } from "@/types/label";
import EditButton from "./EditButton";

interface ContentProps {
    resource: LabelResourceType;
    labelId: number;
    onClose: VoidFunction;
}

const Content: FC<ContentProps> = ({ resource, labelId, onClose }) => (
    <>
        <EditButton resource={resource} labelId={labelId} onClose={onClose} />
        <DeleteButton resource={resource} labelId={labelId} onClose={onClose} />
    </>
);

export default Content;

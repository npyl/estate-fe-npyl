import { FC } from "react";
import DeleteButton from "./DeleteButton";
import { LabelResourceType } from "@/types/label";
import EditButton from "./EditButton";

interface ContentProps {
    resource: LabelResourceType;
    labelId: number;
}

const Content: FC<ContentProps> = ({ resource, labelId }) => (
    <>
        <EditButton resource={resource} labelId={labelId} />
        <DeleteButton resource={resource} labelId={labelId} />
    </>
);

export default Content;

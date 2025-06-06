import { useGetCardQuery } from "@/services/tasks";
import { ITabRendererProps } from "../types";
import { FC } from "react";

const getLabel = (taskCode?: string) => {
    let label = "";

    try {
        const part = taskCode?.split(" - ")?.[1];
        label += part ? part : "";
    } catch (ex) {}

    return label;
};

const Task: FC<ITabRendererProps> = ({ resourceId = -1 }) => {
    const { data } = useGetCardQuery(resourceId, { skip: resourceId === -1 });
    return getLabel(data?.uniqueCode);
};

export default Task;

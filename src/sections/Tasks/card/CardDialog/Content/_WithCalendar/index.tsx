import { useWatch } from "react-hook-form";
import dynamic from "next/dynamic";
import { ICreateOrUpdateTaskReq } from "@/types/tasks";
const Section = dynamic(() => import("./Section"));

const useIsAssigneeSelected = () => {
    const userIds = useWatch<ICreateOrUpdateTaskReq>({ name: "userIds" });
    const userId = Array.isArray(userIds) ? (userIds[0] as number) : -1;
    return Boolean(userId);
};

const WithCalendar = () => {
    const isAssigneeSelected = useIsAssigneeSelected();
    if (!isAssigneeSelected) return null;
    return <Section />;
};

export default WithCalendar;

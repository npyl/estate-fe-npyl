import { useWatch } from "react-hook-form";
import dynamic from "next/dynamic";
import { ICreateOrUpdateTaskReq } from "@/types/tasks";
import toNumberSafe from "@/utils/toNumberSafe";
const Section = dynamic(() => import("./Section"));

const useIsAssigneeSelected = () => {
    const userIds = useWatch<ICreateOrUpdateTaskReq>({ name: "userIds" });
    const userId = Array.isArray(userIds) ? toNumberSafe(userIds?.[0]) : -1;
    return userId > -1;
};

const WithCalendar = () => {
    const isAssigneeSelected = useIsAssigneeSelected();
    if (!isAssigneeSelected) return null;
    return <Section />;
};

export default WithCalendar;

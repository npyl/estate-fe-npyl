import useIsOfficeAdmin from "@/sections/Google/useIsOfficeAdmin";
import dynamic from "next/dynamic";
import Loader from "./Loader";
import { FC } from "react";
const SelfAssign = dynamic(() => import("./SelfAssign"));
const AdminOnly = dynamic(() => import("./AdminOnly"));

interface AssigneeProps {
    edit: boolean;
}

const Assignee: FC<AssigneeProps> = ({ edit }) => {
    const { gwIsAdmin, gwUser, isChecking } = useIsOfficeAdmin();

    if (isChecking) return <Loader />;

    // non-admin
    if (!gwIsAdmin) return <SelfAssign userKey={gwUser?.id} />;

    // admin
    if (edit) return null; // INFO: edit is not allowed
    return <AdminOnly />; // INFO: but create is!
};

export default Assignee;

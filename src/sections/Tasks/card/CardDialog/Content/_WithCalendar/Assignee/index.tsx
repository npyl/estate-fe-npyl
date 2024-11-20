import useIsOfficeAdmin from "@/sections/Google/useIsOfficeAdmin";
import dynamic from "next/dynamic";
import Loader from "./Loader";
const SelfAssign = dynamic(() => import("./SelfAssign"));
const AdminOnly = dynamic(() => import("./AdminOnly"));

const Assignee = () => {
    const { gwIsAdmin, gwUser, isChecking } = useIsOfficeAdmin();

    if (isChecking) return <Loader />;
    if (!gwIsAdmin) return <SelfAssign userKey={gwUser?.id} />;

    return <AdminOnly />;
};

export default Assignee;

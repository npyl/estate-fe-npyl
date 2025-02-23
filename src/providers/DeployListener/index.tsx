import { useGetVersionQuery } from "@/services/server";
import { useEffect } from "react";
import toast from "./Toast";
import debugLog from "@/_private/debugLog";

const localBuildId = process.env.NEXT_PUBLIC_BUILD_ID || "";

const DeployListener = () => {
    const { data } = useGetVersionQuery();
    const { buildId } = data || {};

    useEffect(() => {
        debugLog("BUILD_ID: ", buildId, " LOCAL_BUILD_ID: ", localBuildId);

        if (!buildId || !localBuildId) return;

        const mismatch = localBuildId !== buildId;
        if (!mismatch) return;

        toast();
    }, [buildId]);

    return null;
};

export default DeployListener;

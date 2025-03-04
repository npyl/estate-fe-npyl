import { useGetVersionQuery } from "@/services/server";
import { useEffect } from "react";
import { TVersionCb } from "./types";

const useVersion = (handler: TVersionCb) => {
    const { data } = useGetVersionQuery();
    const { buildId } = data || {};
    useEffect(() => {
        handler(buildId);
    }, [buildId]);
};

export default useVersion;

import { useEffect } from "react";
import { TVersionCb } from "./types";
import debugLog from "@/_private/debugLog";
import { IVersionRes } from "@/types/server";

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || "";
const sseUrl = `/api/server/sse/${clientId}`;

const useVersionLive = (handler: TVersionCb) => {
    useEffect(() => {
        const src = new EventSource(sseUrl, { withCredentials: false });

        src.onopen = debugLog;
        src.onerror = debugLog;

        src.onmessage = (ev: MessageEvent) => {
            const data = JSON.parseSafe<IVersionRes>(ev.data);
            if (!data) return;
            const { buildId } = data;
            handler(buildId);
        };

        return () => {
            src.close();
        };
    }, []);
};

export default useVersionLive;

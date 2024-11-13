import useDialog from "@/hooks/useDialog";
import { useCallback, useLayoutEffect, useState } from "react";

const baseUrl = `${process.env.NEXT_PUBLIC_PROXY_API}/integrations/google-workspace`;

interface IIsIntegratedRes {
    isIntegrated: boolean;
}

export interface IGoogleWorkspaceIntegrationReq {
    clientId: string;
    clientSecret: string;
    domain: string;
}

const useIsGoogleWorkspaceIntegrated = () => {
    const [isIntegrated, setIntegrated] = useState(false);

    const [isLoading, startLoading, stopLoading] = useDialog();

    const getData = useCallback(async () => {
        startLoading();

        const res = await fetch(baseUrl);

        stopLoading();

        if (!res.ok) return false;

        const response = (await res.json()) as IIsIntegratedRes;

        return response?.isIntegrated;
    }, []);

    useLayoutEffect(() => {
        getData().then(setIntegrated);
    }, []);

    return { isIntegrated, isLoading };
};

const useUpdateGoogleWorkspaceIntegration = () => {
    const [isLoading, startLoading, stopLoading] = useDialog();

    const cb = useCallback(async (d: IGoogleWorkspaceIntegrationReq) => {
        startLoading();

        const res = await fetch(baseUrl, {
            method: "PUT",
            body: JSON.stringify(d),
        });

        stopLoading();

        if (!res.ok) return;

        // TODO: revalidate...
    }, []);

    return [cb, { isLoading }] as const;
};

export { useIsGoogleWorkspaceIntegrated, useUpdateGoogleWorkspaceIntegration };

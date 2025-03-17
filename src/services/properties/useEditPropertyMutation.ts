import errorToast from "@/components/Toaster/error";
import { IPropertyReq } from "@/types/properties";
import { useCallback } from "react";

const baseUrl = `/api/properties`;

const useEditPropertyMutation = () => {
    const edit = useCallback(async (body: IPropertyReq) => {
        try {
            const res = await fetch(baseUrl, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            });

            if (!res.ok) throw await res.json();

            return { data: {} };
        } catch (ex) {
            errorToast("_ERROR_");
            return { error: ex };
        }
    }, []);

    return [edit] as const;
};

export default useEditPropertyMutation;

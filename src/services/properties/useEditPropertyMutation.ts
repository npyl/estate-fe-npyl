import { errorToast } from "@/components/Toaster";
import { IPropertyReq } from "@/types/properties";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { properties } from "./properties";

const baseUrl = `/api/properties`;

const useEditPropertyMutation = () => {
    const dispatch = useDispatch();

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

            const didGenerate = body.generate;

            dispatch(
                properties.util.invalidateTags(
                    didGenerate
                        ? ["Properties", "PropertyById", "PDF"]
                        : ["Properties", "PropertyById"]
                )
            );

            return { data: {} };
        } catch (ex) {
            errorToast("_ERROR_");
            return { error: ex };
        }
    }, []);

    return [edit] as const;
};

export default useEditPropertyMutation;

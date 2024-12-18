import { useCallback } from "react";
import {
    useCreateAssignLabelForResourceIdMutation,
    useCreateLabelForResourceMutation,
} from "@/services/labels";
import successToast from "@/components/Toaster/success";
import { ILabelForm } from "./types";

const useCreateLabel = () => {
    const [createAssignLabel] = useCreateAssignLabelForResourceIdMutation();
    const [createLabelForResource] = useCreateLabelForResourceMutation();

    const createLabel = useCallback(
        async ({ name, color, resource, resourceId }: ILabelForm) => {
            const body = { color, name };

            let res;

            if (!resourceId) {
                // create without assign!
                res = await createLabelForResource({
                    resource,
                    body,
                });
            } else {
                res = await createAssignLabel({
                    resource,
                    resourceId,
                    body,
                });
            }

            if (res && !("error" in res)) {
                successToast("Success");
            }
        },
        []
    );

    return { createLabel };
};

export default useCreateLabel;

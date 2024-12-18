import { useCallback } from "react";

import {
    useAssignLabelToResourceIdMutation,
    useCreateLabelForResourceMutation,
} from "@/services/labels";
import successToast from "@/components/Toaster/success";
import { LabelResourceType } from "@/types/label";

const useCreateLabel = () => {
    const [createAssignLabel] = useAssignLabelToResourceIdMutation();
    const [createLabelForResource] = useCreateLabelForResourceMutation();

    const createLabel = useCallback(
        async (
            labelName: string,
            resourceId: number | undefined,
            pickerColor: string,
            resource: LabelResourceType
        ) => {
            const body = { color: pickerColor, name: labelName };

            if (!resourceId) {
                // create without assign!
                return createLabelForResource({ resource, body });
            } else {
                await createAssignLabel({
                    resource,
                    resourceId,
                    body,
                });

                successToast("Success");
            }
        },
        []
    );

    return { createLabel };
};

export default useCreateLabel;

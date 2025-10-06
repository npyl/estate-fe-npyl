import { useCallback } from "react";
import useInvalidateTags from "../../../../services/labels/useInvalidateTags";
import {
    useCreateAssignLabelForResourceIdMutation,
    useCreateLabelForResourceMutation,
} from "@/services/labels";
import { ILabelForm } from "../types";
import isFalsy from "@/utils/isFalsy";

const useSubmit = (onSuccess?: (id: number) => void) => {
    const { invalidateTags } = useInvalidateTags();

    const [createLabel] = useCreateLabelForResourceMutation();
    const [createAssignLabel] = useCreateAssignLabelForResourceIdMutation();

    return useCallback(
        async ({ resource, resourceId, ...body }: ILabelForm) => {
            const cb = isFalsy(resourceId) ? createLabel : createAssignLabel;
            const data = isFalsy(resourceId)
                ? { body, resource }
                : { body, resource, resourceId: resourceId! };

            const res = await cb(data as any);

            if (res && "error" in res) return;

            invalidateTags(resource);

            onSuccess?.(res.data?.id);
        },
        [onSuccess]
    );
};

export default useSubmit;

import { useCallback } from "react";
import { useSettings } from "@/ui/Note/Section/Context";

import {
    useAddNoteToCustomerWithIdMutation,
    useAddNoteToPropertyWithIdMutation,
} from "src/services/note";
import { LabelResourceType } from "@/types/label";

const useUncontrolledAdd = (resource: LabelResourceType) => {
    const [addPropertyNote] = useAddNoteToPropertyWithIdMutation();
    const [addCustomerNote] = useAddNoteToCustomerWithIdMutation();
    switch (resource) {
        case "property":
            return addPropertyNote;
        case "customer":
            return addCustomerNote;
    }
};

interface Config {
    resource: LabelResourceType;
    resourceId?: number;
}

const useOnAdd = ({ resource, resourceId }: Config) => {
    const { isControlled, onAdd } = useSettings();
    const onUncontrolledAdd = useUncontrolledAdd(resource);
    return useCallback(
        (content: string) => {
            if (isControlled) {
                onAdd?.(content);
            } else {
                onUncontrolledAdd?.({
                    id: resourceId!,
                    dataToSend: { content },
                });
            }
        },
        [isControlled, onAdd, onUncontrolledAdd, resourceId]
    );
};

export type { Config };
export default useOnAdd;

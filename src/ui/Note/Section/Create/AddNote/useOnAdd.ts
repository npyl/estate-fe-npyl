import { useCallback } from "react";
import { useSettings } from "@/ui/Note/Section/Context";

import {
    useAddNoteToCustomerWithIdMutation,
    useAddNoteToPropertyWithIdMutation,
} from "src/services/note";
import { LabelResourceType } from "@/types/label";
import { useCreateCommentMutation } from "@/services/tasks";
import { AddNoteReq } from "@/types/note";

const useUncontrolledAdd = (resource: LabelResourceType) => {
    const [addPropertyNote] = useAddNoteToPropertyWithIdMutation();
    const [addCustomerNote] = useAddNoteToCustomerWithIdMutation();

    const [_addTaskComment] = useCreateCommentMutation();
    const addTaskComment = useCallback(
        ({ id: cardId, body: { content: message } }: AddNoteReq) =>
            _addTaskComment({ cardId, body: { message } }),
        []
    );

    switch (resource) {
        case "property":
            return addPropertyNote;
        case "customer":
            return addCustomerNote;
        case "ticket":
            return addTaskComment;
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
                    body: { content },
                });
            }
        },
        [isControlled, onAdd, onUncontrolledAdd, resourceId]
    );
};

export type { Config };
export default useOnAdd;

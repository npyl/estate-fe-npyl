import { useDeleteWithIdMutation } from "@/services/note";
import { useRemoveCommentMutation } from "@/services/tasks";
import { LabelResourceType } from "@/types/label";
import { useSettings } from "@/ui/Note/Section/Context";
import { useCallback } from "react";

const useUncontrolledRemove = (resource: LabelResourceType) => {
    const [deleteNote] = useDeleteWithIdMutation();
    const [deleteComment] = useRemoveCommentMutation();
    if (resource === "ticket") {
        return deleteComment;
    } else {
        return deleteNote;
    }
};

const useOnRemove = (resource: LabelResourceType) => {
    const { isControlled, onRemove } = useSettings();
    const uncontrolledRemove = useUncontrolledRemove(resource);
    return useCallback(
        (id: number) => {
            if (isControlled) {
                onRemove?.(id);
            } else {
                uncontrolledRemove(id);
            }
        },
        [isControlled, uncontrolledRemove]
    );
};

export default useOnRemove;

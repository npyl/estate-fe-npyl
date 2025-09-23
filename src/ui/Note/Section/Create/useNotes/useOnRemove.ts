import { useDeleteWithIdMutation } from "@/services/note";
import { useSettings } from "@/ui/Note/Section/Context";
import { useCallback } from "react";

const useOnRemove = () => {
    const { isControlled, onRemove } = useSettings();
    const [deleteNote] = useDeleteWithIdMutation();
    return useCallback(
        (id: number) => {
            if (isControlled) {
                onRemove?.(id);
            } else {
                deleteNote(id);
            }
        },
        [isControlled, onRemove]
    );
};

export default useOnRemove;

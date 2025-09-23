import { useCallback } from "react";
import { useSettings } from "@/ui/Note/Section/Context";

const useOnRemove = () => {
    const { isControlled, onRemove } = useSettings();
    return useCallback(
        (id: number) => {
            if (isControlled) {
                onRemove?.(id);
            } else {
            }
        },
        [isControlled, onRemove]
    );
};

export default useOnRemove;

import { useCallback } from "react";
import { useSettings } from "@/ui/Note/Section/Context";

const useOnAdd = () => {
    const { isControlled, onAdd } = useSettings();
    return useCallback(
        (s: string) => {
            if (isControlled) {
                onAdd?.(s);
            } else {
            }
        },
        [isControlled, onAdd]
    );
};

export default useOnAdd;

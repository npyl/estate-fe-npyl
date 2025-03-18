import { useCallback } from "react";
import { useEditorContext } from "../../context";

const useCurrentValue = () => {
    const { editor } = useEditorContext();

    const getCurrentValue = useCallback(() => {
        if (editor?.isActive("blockquote")) return 7;

        for (let level = 1; level <= 6; level++) {
            if (editor?.isActive("heading", { level })) {
                return level;
            }
        }

        return 0; // Normal text
    }, [editor?.isActive]);

    return getCurrentValue();
};

export default useCurrentValue;

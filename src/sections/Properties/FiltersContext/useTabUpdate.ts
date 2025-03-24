import { useTabsContext } from "@/contexts/tabs";
import { useCallback } from "react";
import { IFilterProps } from "./types";

const useTabUpdate = () => {
    const { pushTab } = useTabsContext();

    const onUpdate = useCallback(({ filters }: IFilterProps) => {
        pushTab({
            path: "/property",
            renderer: "PROPERTY_CREATE",
        });
    }, []);

    return onUpdate;
};

export default useTabUpdate;

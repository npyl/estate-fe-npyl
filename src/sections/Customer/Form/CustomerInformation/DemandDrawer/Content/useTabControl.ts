import { useCallback, useRef, useState } from "react";
import { TabsRef } from "./types";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ICustomerYup } from "../../../types";
import { EMTPY_DEMAND } from "./constant";

const useTabControl = () => {
    const { control } = useFormContext<ICustomerYup>();
    const { fields, append, remove } = useFieldArray({
        name: "demands",
        control,
    });

    const lastIndex = Math.max(fields.length - 1, 0);

    const [index, setIndex] = useState(0);
    const changeTab = useCallback((_: any, v: number) => setIndex(v), []);

    const addTab = useCallback(() => {
        append(EMTPY_DEMAND);

        // INFO: Normalise a negative value
        setIndex((old) => Math.max(old, 0));
    }, []);

    const removeTab = (removeIndex: number) => {
        if (removeIndex < index) {
            setIndex((old) => Math.max(old - 1, 0));
        } else if (removeIndex === index) {
            if (index === 0) {
                // first (including first & last); do nothing
            } else if (index !== lastIndex) {
                // in-between; do nothing
            } else {
                // last
                setIndex((old) => old - 1);
            }
        } else {
            // do-nothing
        }

        remove(removeIndex);
    };

    const tabsRef = useRef<TabsRef>({
        add: addTab,
    });

    const isIndexSafe =
        index > -1 && index < fields.length && fields.length > 0;

    return {
        tabsRef,
        index,
        isIndexSafe,
        // ...
        changeTab,
        removeTab,
        // ...
        fields,
    };
};

export default useTabControl;

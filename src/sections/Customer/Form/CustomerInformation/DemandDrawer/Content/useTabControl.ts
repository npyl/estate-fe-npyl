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

    const tabCount = fields.length;

    const [index, setIndex] = useState(0);
    const changeTab = useCallback((_: any, v: number) => setIndex(v), []);

    const handleAdd = useCallback(() => {
        append(EMTPY_DEMAND);

        // INFO: Normalise a negative value
        setIndex((old) => Math.max(old, 0));
    }, []);

    const handleRemove = (removeIndex: number) => {
        if (index === removeIndex) setIndex((old) => Math.max(old - 1, 0));
        if (index >= tabCount - 1) setIndex((old) => Math.max(old - 1, 0));
        remove(removeIndex);
    };

    const tabsRef = useRef<TabsRef>({
        add: handleAdd,
        remove: handleRemove,
    });

    const isIndexSafe =
        index > -1 && index < fields.length && fields.length > 0;

    return { tabsRef, index, isIndexSafe, changeTab, fields };
};

export default useTabControl;

import { useCallback } from "react";
import { properties } from "src/services/properties";
import { customers } from "src/services/customers";
import { tasks } from "@/services/tasks";
import { useDispatch } from "react-redux";
import { LabelResourceType } from "@/types/label";

const useInvalidateTags = (variant: LabelResourceType) => {
    const dispatch = useDispatch();

    const invalidateTags = useCallback(() => {
        if (variant === "property")
            dispatch(properties.util.invalidateTags(["PropertyByIdLabels"]));
        else if (variant === "document")
            dispatch(properties.util.invalidateTags(["PropertyByIdDocuments"]));
        else if (variant === "customer")
            dispatch(customers.util.invalidateTags(["CustomerByIdLabels"]));
        else if (variant === "ticket")
            dispatch(tasks.util.invalidateTags(["Labels"]));
    }, [variant]);

    return { invalidateTags };
};

export default useInvalidateTags;

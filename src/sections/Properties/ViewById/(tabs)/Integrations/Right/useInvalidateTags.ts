import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { properties } from "src/services/properties";

const useInvalidateTags = () => {
    const dispatch = useDispatch();
    const invalidateTags = useCallback(() => {
        dispatch(
            properties.util.invalidateTags(["Properties", "PropertyById"])
        );
    }, []);
    return { invalidateTags };
};

export default useInvalidateTags;

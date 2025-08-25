import { blog } from "@/services/blog";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const useInvalidateTags = () => {
    const dispatch = useDispatch();
    return useCallback(() => {
        dispatch(blog.util.invalidateTags(["BlogPostByIdImages"]));
    }, []);
};

export default useInvalidateTags;

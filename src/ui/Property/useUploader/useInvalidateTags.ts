import { filesApiSlice } from "@/services/properties";
import { TFileVariant } from "@/types/file";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

const getTag = (variant: TFileVariant) =>
    variant === "image"
        ? "PropertyByIdImages"
        : variant === "blueprint"
          ? "PropertyByIdBlueprints"
          : variant === "document"
            ? "PropertyByIdDocuments"
            : variant === "google-earth"
              ? "PropertyByIdGoogleEarth"
              : null;

const useInvalidateTags = (variant: TFileVariant) => {
    const dispatch = useDispatch();
    return useCallback(() => {
        const tag = getTag(variant);
        if (!tag) return;
        dispatch(filesApiSlice.util.invalidateTags([tag]));
    }, []);
};

export default useInvalidateTags;

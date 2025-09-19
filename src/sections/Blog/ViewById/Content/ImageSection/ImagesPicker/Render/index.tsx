import { FC, useCallback } from "react";
import { ControllerProps } from "react-hook-form";
import Picker from "./Picker";
import useInitialise from "./useInitialise";
import { BlogPostReq } from "@/types/company";

//
// INFO:
//
// 1. During create/edit I am storing the images as File[] using react-hook-form
// 2. Upon successful POST, these will be pushed using a different backend api call
// 3. The files in the `value` field always take precedence on what is viewed!
//

type TRender = ControllerProps<BlogPostReq, "images">["render"];

type TRenderProps = Parameters<TRender>[0] & {
    postId?: number;
    onSet: (f: File[]) => void;
};

const Render: FC<TRenderProps> = ({
    postId,
    field: { value, onChange },
    onSet,
}) => {
    /**
     * Remove 1st element (used as thumbnail); the rest are middlepage images
     * Call onSet which directly talks to the editor to add images to container after removing any existing ones
     */
    const setImages = useCallback(
        (f: File[]) => {
            // update hook-form
            onChange(f);

            // set editor's (middlepage) images
            const newF = f.slice(1);
            onSet(newF);
        },
        [onChange, onSet]
    );

    const { isLoading } = useInitialise(postId, setImages);

    return <Picker loading={isLoading} files={value} onSetImages={setImages} />;
};

export default Render;

import { FC, useCallback } from "react";
import { ControllerProps } from "react-hook-form";
import { CreateOrUpdateBlogPostReq } from "@/services/blog";
import Picker from "./Picker";
import useInitialise from "./useInitialise";
import { errorToast } from "@/components/Toaster";

const FULL_LITERAL = "BLOG_MIDDLE_IMAGES_FULL";

//
// INFO:
//
// 1. During create/edit I am storing the images as File[] using react-hook-form
// 2. Upon successful POST, these will be converted to whatever the BE wants them to be (TODO: To be decided)
// 3. The files in the `value` field always take precedence on what is viewed!
//

type TRender = ControllerProps<CreateOrUpdateBlogPostReq, "images">["render"];

type TRenderProps = Parameters<TRender>[0] & {
    postId?: number;
    onAdd: (f: File[]) => void;
    onRemove: () => void;
};

const Render: FC<TRenderProps> = ({
    postId,
    field: { value, onChange: _onChange },
    onAdd,
}) => {
    const { isLoading } = useInitialise(postId, _onChange);

    const handleChange = useCallback(
        (f: File[]) => {
            // INFO: prevent from adding more than 3 images
            if (value.length + f.length > 3) {
                errorToast(FULL_LITERAL);
                return;
            }

            const all = [...value, ...f];

            // INFO: update hook-form
            _onChange(all);

            // for external use
            onAdd(f);
        },
        [value, _onChange]
    );

    return <Picker loading={isLoading} files={value} onChange={handleChange} />;
};

export default Render;

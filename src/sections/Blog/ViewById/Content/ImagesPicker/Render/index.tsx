import { FC, RefObject, useCallback } from "react";
import { ControllerProps } from "react-hook-form";
import { CreateOrUpdateBlogPostReq } from "@/services/blog";
import { Editor } from "@tiptap/react";
import Picker from "./Picker";
import useInitialise from "./useInitialise";

//
// INFO:
//
// 1. During create/edit I am storing the images as File[] using react-hook-form
// 2. Upon successful POST, these will be converted to whatever the BE wants them to be (TODO: To be decided)
// 3. The files in the `value` field always take precedence on what is viewed!
//

const IMAGE_HEIGHT = "600px";

type TRender = ControllerProps<CreateOrUpdateBlogPostReq, "images">["render"];

type TRenderProps = Parameters<TRender>[0] & {
    editorRef: RefObject<Editor>;
    postId?: number;
};

const Render: FC<TRenderProps> = ({
    editorRef,
    postId,
    field: { value, onChange: _onChange },
}) => {
    const { isLoading } = useInitialise(postId, _onChange);

    const onChange = useCallback(
        (f?: File[]) => {
            // TODO: editorRef
            _onChange(f);
        },
        [_onChange]
    );

    return <Picker loading={isLoading} files={value} onChange={onChange} />;
};

export default Render;

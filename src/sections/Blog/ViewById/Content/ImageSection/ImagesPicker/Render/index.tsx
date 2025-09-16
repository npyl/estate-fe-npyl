import { FC } from "react";
import { ControllerProps } from "react-hook-form";
import { CreateOrUpdateBlogPostReq } from "@/services/blog";
import Picker from "./Picker";
import useInitialise from "./useInitialise";

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
    onSet: (f: File[]) => void;
};

const Render: FC<TRenderProps> = ({
    postId,
    field: { value, onChange },
    onSet,
}) => {
    const { isLoading } = useInitialise(postId, onChange);

    return (
        <Picker
            loading={isLoading}
            files={value}
            onChange={onChange}
            onSet={onSet}
        />
    );
};

export default Render;

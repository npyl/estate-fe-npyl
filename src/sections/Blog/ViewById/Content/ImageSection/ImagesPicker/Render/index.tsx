import { FC } from "react";
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

import { FC, RefObject } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CreateOrUpdateBlogPostReq } from "@/services/blog";
import { Editor } from "@tiptap/react";
import Render from "./Render";

interface ImagePickerProps {
    postId?: number;
    editorRef: RefObject<Editor>;
}

const ImagePicker: FC<ImagePickerProps> = ({ editorRef, postId }) => {
    const { control } = useFormContext<CreateOrUpdateBlogPostReq>();
    return (
        <Controller
            name="images"
            control={control}
            render={(props) => (
                <Render editorRef={editorRef} postId={postId} {...props} />
            )}
        />
    );
};

export default ImagePicker;

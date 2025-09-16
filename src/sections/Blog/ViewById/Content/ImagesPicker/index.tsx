import { FC, RefObject } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CreateOrUpdateBlogPostReq } from "@/services/blog";
import { Editor } from "@tiptap/react";
import Render from "./Render";
import useEditorControl from "./useEditorControl";

interface ImagePickerProps {
    postId?: number;
    editorRef: RefObject<Editor>;
}

const ImagePicker: FC<ImagePickerProps> = ({ editorRef, postId }) => {
    const { control } = useFormContext<CreateOrUpdateBlogPostReq>();

    const { addImages, removeImage } = useEditorControl(editorRef);

    return (
        <Controller
            name="images"
            control={control}
            render={(props) => (
                <Render
                    postId={postId}
                    onAdd={addImages}
                    onRemove={removeImage}
                    {...props}
                />
            )}
        />
    );
};

export default ImagePicker;

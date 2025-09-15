import { FC, RefObject, useCallback, useEffect, useMemo } from "react";
import BaseImagePicker from "@/ui/ImagePicker";
import { Controller, ControllerProps, useFormContext } from "react-hook-form";
import {
    CreateOrUpdateBlogPostReq,
    useGetBlogPostByIdQuery,
} from "@/services/blog";
import { Editor } from "@tiptap/react";
import useDialog from "@/hooks/useDialog";
import isFalsy from "@/utils/isFalsy";
import uuidv4 from "@/utils/uuidv4";

// -----------------------------------------------------------------------------------------

const urlToFile = async (url: string) => {
    const filename = uuidv4();

    const response = await fetch(url);
    const blob = await response.blob();

    // Create a File object from the blob
    return new File([blob], filename, { type: blob.type });
};

const useInitialise = (
    postId: number | undefined,
    onChange: (f: File[]) => void
) => {
    const { data, isLoading: isLoading0 } = useGetBlogPostByIdQuery(postId!, {
        skip: isFalsy(postId),
    });
    const [isLoading1, startLoading, stopLoading] = useDialog();
    const getFiles = useCallback(async () => {
        const i = data?.images ?? [];
        if (i.length === 0) return;

        startLoading();
        const all = await Promise.all(i.map(urlToFile));
        onChange(all);
        stopLoading();
    }, []);
    useEffect(() => {
        if (isFalsy(postId)) return;
        getFiles();
    }, [postId]);
    const isLoading = isLoading0 || isLoading1;
    return { isLoading };
};

// -----------------------------------------------------------------------------------------

//
// INFO:
//
// 1. During create/edit I am storing the images as File[] using react-hook-form
// 2. Upon successful POST, these will be converted to whatever the BE wants them to be (TODO: To be decided)
// 3. The files in the `value` field always take precedence on what is viewed!
//

// -----------------------------------------------------------------------------------------

const getSrc = (f: File) => URL.createObjectURL(f);
const useSrc = (f: File[]) => useMemo(() => f.map(getSrc), [f.length]);

// -----------------------------------------------------------------------------------------

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

    const src = useSrc(value);

    const onChange = useCallback((f?: File[]) => {
        _onChange(f);
    }, []);

    return (
        <BaseImagePicker
            src={src}
            isLoading={isLoading}
            multiple
            onSelect={onChange}
            onDelete={onChange}
            ContainerProps={{ height: IMAGE_HEIGHT }}
            style={{ maxHeight: IMAGE_HEIGHT, objectFit: "contain" }}
        />
    );
};

// -----------------------------------------------------------------------------------------

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

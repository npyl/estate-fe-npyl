import Stack from "@mui/material/Stack";
import { FC, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import TitleDescriptionEditor, {
    TitleDescriptionEditorRef,
} from "@/ui/DescriptionEditor";
import CategorySelect from "./CategorySelect";
const ImagePicker = dynamic(() => import("./ImagePicker"));

interface ContentProps {
    postId?: number;
    image?: string;
}

const Content: FC<ContentProps> = ({ postId, image }) => {
    const editorRef = useRef<TitleDescriptionEditorRef>(null);

    useEffect(() => {
        if (!image) return;
        if (!editorRef.current) return;
        editorRef.current?.setImage(image);
    }, [image]);

    return (
        <Stack spacing={1}>
            {Boolean(postId) ? (
                <ImagePicker postId={postId!} image={image} />
            ) : null}

            <TitleDescriptionEditor
                ref={editorRef}
                endNode={<CategorySelect />}
            />
        </Stack>
    );
};

export default Content;

import Stack from "@mui/material/Stack";
import { FC, useRef } from "react";
import TitleDescriptionEditor, {
    TitleDescriptionEditorRef,
} from "@/ui/DescriptionEditor";
import CategorySelect from "./CategorySelect";
import dynamic from "next/dynamic";
const ImagesPickers = dynamic(() => import("./ImagesPickers"));

interface ContentProps {
    postId?: number;
    image?: string;
}

const Content: FC<ContentProps> = ({ postId, image }) => {
    const editorRef = useRef<TitleDescriptionEditorRef>(null);

    return (
        <Stack spacing={1}>
            {Boolean(postId) ? (
                <ImagesPickers
                    editorRef={editorRef}
                    postId={postId!}
                    image={image}
                />
            ) : null}

            <TitleDescriptionEditor
                ref={editorRef}
                endNode={<CategorySelect />}
            />
        </Stack>
    );
};

export default Content;

import Stack from "@mui/material/Stack";
import { FC, useRef } from "react";
import TitleDescriptionEditor from "@/ui/DescriptionEditor";
import CategorySelect from "./CategorySelect";
import { Editor } from "@tiptap/react";
import ImagesPickers from "./ImagesPickers";

interface ContentProps {
    postId?: number;
    image?: string;
}

const Content: FC<ContentProps> = ({ postId, image }) => {
    const editorRef = useRef<Editor>(null);

    return (
        <Stack spacing={1}>
            <ImagesPickers
                editorRef={editorRef}
                postId={postId}
                image={image}
            />

            <TitleDescriptionEditor
                ref={editorRef}
                endNode={<CategorySelect />}
            />
        </Stack>
    );
};

export default Content;

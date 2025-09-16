import Stack from "@mui/material/Stack";
import TitleDescriptionEditor from "@/ui/DescriptionEditor";
import CategorySelect from "./CategorySelect";
import { Editor } from "@tiptap/react";
import ImageSection from "./ImageSection";
import Thumbnail from "./Thumbnail";
import { FC, useRef } from "react";

interface ContentProps {
    postId?: number;
}

const Content: FC<ContentProps> = ({ postId }) => {
    const editorRef = useRef<Editor>(null);

    return (
        <Stack spacing={1}>
            <Thumbnail />

            <ImageSection postId={postId} editorRef={editorRef} />

            <TitleDescriptionEditor
                ref={editorRef}
                endNode={<CategorySelect />}
            />
        </Stack>
    );
};

export default Content;

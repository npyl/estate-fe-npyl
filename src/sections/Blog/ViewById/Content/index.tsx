import Stack from "@mui/material/Stack";
import { FC, useRef } from "react";
import TitleDescriptionEditor from "@/ui/DescriptionEditor";
import CategorySelect from "./CategorySelect";
import { Editor } from "@tiptap/react";
import ImagesPicker from "./ImagesPicker";
import Thumbnail from "./Thumbnail";

interface ContentProps {
    postId?: number;
}

const Content: FC<ContentProps> = ({ postId }) => {
    const editorRef = useRef<Editor>(null);

    return (
        <Stack spacing={1}>
            <ImagesPicker editorRef={editorRef} postId={postId} />

            <Thumbnail />

            <TitleDescriptionEditor
                ref={editorRef}
                endNode={<CategorySelect />}
            />
        </Stack>
    );
};

export default Content;

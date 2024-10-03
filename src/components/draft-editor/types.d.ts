import "react-draft-wysiwyg"; // Import the module you want to augment

declare module "react-draft-wysiwyg" {
    import { EditorProps as DefaultProps } from "@/types/react-draft-wysiwyg";
    import { EditorProps as DraftEditorProps } from "@/types/draft-js";

    interface EditorProps extends DefaultProps {
        blockStyleFn?: DraftEditorProps["blockStyleFn"];
    }
}

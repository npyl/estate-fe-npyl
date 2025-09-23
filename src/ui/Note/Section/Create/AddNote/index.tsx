import { FC, useCallback, useRef } from "react";
import useOnAdd, { Config } from "./useOnAdd";
import { EditorRef } from "@/components/Editor";
import Input from "./Input";

interface AddNoteProps extends Config {}

const AddNote: FC<AddNoteProps> = (config) => {
    const editorRef = useRef<EditorRef>(null);

    const _onAdd = useOnAdd(config);
    const onAdd = useCallback(() => {
        const content = JSON.stringify(editorRef.current?.getJSON());
        if (!content) return;
        _onAdd(content);
        editorRef.current?.commands?.clearContent();
    }, [_onAdd]);

    return <Input ref={editorRef} onAdd={onAdd} />;
};

export default AddNote;

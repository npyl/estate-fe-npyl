import { Level } from "@tiptap/extension-heading";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { useEditorContext } from "../context";

const TextFormatSelect = () => {
    const { editor } = useEditorContext();

    const getCurrentValue = () => {
        if (editor?.isActive("blockquote")) return 7;

        for (let level = 1; level <= 6; level++) {
            if (editor?.isActive("heading", { level })) {
                return level;
            }
        }

        return 0; // Normal text
    };

    const handleChange = (event: SelectChangeEvent<number>) => {
        if (!editor) return;

        const value = Number(event.target.value);

        switch (value) {
            case 0:
                editor.chain().focus().setParagraph().run();
                break;
            case 7:
                editor.chain().focus().toggleBlockquote().run();
                break;
            default:
                editor
                    .chain()
                    .focus()
                    .setHeading({ level: value as Level })
                    .run();
                break;
        }
    };

    return (
        <Select size="small" value={getCurrentValue()} onChange={handleChange}>
            <MenuItem value={0}>Normal</MenuItem>
            <MenuItem value={1}>H1</MenuItem>
            <MenuItem value={2}>H2</MenuItem>
            <MenuItem value={3}>H3</MenuItem>
            <MenuItem value={4}>H4</MenuItem>
            <MenuItem value={5}>H5</MenuItem>
            <MenuItem value={6}>H6</MenuItem>
            <MenuItem value={7}>
                <FormatQuoteIcon />
                BlockQuote
            </MenuItem>
        </Select>
    );
};

export default TextFormatSelect;

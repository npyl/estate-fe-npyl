import { Level } from "@tiptap/extension-heading";
import {
    Typography,
    MenuItem,
    Select,
    SelectChangeEvent,
    SxProps,
    Theme,
} from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { useEditorContext } from "../context";
import { FC } from "react";

// ----------------------------------------------------------------------------

const SelectSx: SxProps<Theme> = {
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
};

// ----------------------------------------------------------------------------

interface RendeValueProps {
    v: number;
}

const RenderValue: FC<RendeValueProps> = ({ v }) => {
    const label = v === 0 ? "normal" : v === 7 ? "BlockQuote" : `H${v}`;
    return <Typography>{label}</Typography>;
};

// ----------------------------------------------------------------------------

const renderValue = (v: number) => <RenderValue v={v} />;

// ----------------------------------------------------------------------------

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
        <Select
            sx={SelectSx}
            size="small"
            renderValue={renderValue}
            value={getCurrentValue()}
            onChange={handleChange}
        >
            <MenuItem value={0}>Normal</MenuItem>
            <MenuItem value={1}>
                <Typography variant="h1">H1</Typography>
            </MenuItem>
            <MenuItem value={2}>
                <Typography variant="h2">H2</Typography>
            </MenuItem>
            <MenuItem value={3}>
                <Typography variant="h3">H3</Typography>
            </MenuItem>
            <MenuItem value={4}>
                <Typography variant="h4">H4</Typography>
            </MenuItem>
            <MenuItem value={5}>
                <Typography variant="h5">H5</Typography>
            </MenuItem>
            <MenuItem value={6}>
                <Typography variant="h6">H6</Typography>
            </MenuItem>
            <MenuItem value={7}>
                <FormatQuoteIcon />
                BlockQuote
            </MenuItem>
        </Select>
    );
};

export default TextFormatSelect;

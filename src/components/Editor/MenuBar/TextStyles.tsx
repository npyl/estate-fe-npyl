import Stack from "@mui/material/Stack";
import { useEditorContext } from "../context";
import useCallbacks from "./useCallbacks";
import MenuBarButton from "./MenuBarButton";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import UnderlineIcon from "@mui/icons-material/FormatUnderlined";

const TextStyles = () => {
    const { editor } = useEditorContext();

    const { toggleBold, toggleItalic, toggleStrike, toggleUnderline } =
        useCallbacks();

    if (!editor) return null;

    const boldDisabled = !editor.can().chain().focus().toggleBold().run();

    const italicDisabled = !editor.can().chain().focus().toggleItalic().run();

    const underlineDisabled = !editor
        .can()
        .chain()
        .focus()
        .toggleUnderline()
        .run();

    const strikeDisabled = !editor.can().chain().focus().toggleStrike().run();

    return (
        <Stack direction="row" alignItems="center">
            <MenuBarButton
                name="bold"
                disabled={boldDisabled}
                icon={<FormatBoldIcon />}
                onClick={toggleBold}
            />

            <MenuBarButton
                name="italic"
                disabled={italicDisabled}
                icon={<FormatItalicIcon />}
                onClick={toggleItalic}
            />

            <MenuBarButton
                name="underline"
                disabled={underlineDisabled}
                icon={<UnderlineIcon />}
                onClick={toggleUnderline}
            />

            <MenuBarButton
                name="strike"
                disabled={strikeDisabled}
                icon={<StrikethroughSIcon />}
                onClick={toggleStrike}
            />
        </Stack>
    );
};

export default TextStyles;

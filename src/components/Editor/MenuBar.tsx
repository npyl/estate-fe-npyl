import { FC, useCallback, useMemo } from "react";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import UnderlineIcon from "@mui/icons-material/FormatUnderlined";

import TextFormatSelect from "./TextFormatSelect";
import MenuBarButton from "./MenuBarButton";
import TextAlignButton from "./TextAlignButton";
import Stack, { StackProps } from "@mui/material/Stack";
import { IconButton } from "@mui/material";

import AddIndentIcon from "@mui/icons-material/FormatIndentIncrease";
import RemoveIndentIcon from "@mui/icons-material/FormatIndentDecrease";
import { useEditorContext } from "./context";

const IndentButton = () => {
    const { editor } = useEditorContext();

    const handleClick = useCallback(
        () => editor!.chain().focus().indent().run(),
        []
    );

    return (
        <IconButton onClick={handleClick}>
            <AddIndentIcon />
        </IconButton>
    );
};

const OutdentButton = () => {
    const { editor } = useEditorContext();

    const handleClick = useCallback(
        () => editor!.chain().focus().outdent().run(),
        []
    );

    return (
        <IconButton onClick={handleClick}>
            <RemoveIndentIcon />
        </IconButton>
    );
};

const useCallbacks = () => {
    const { editor } = useEditorContext();

    return useMemo(
        () => ({
            toggleBold: () => editor!.chain().focus().toggleBold().run(),
            toggleItalic: () => editor!.chain().focus().toggleItalic().run(),
            toggleUnderline: () =>
                editor!.chain().focus().toggleUnderline().run(),
            toggleStrike: () => editor!.chain().focus().toggleStrike().run(),
            toggleBulletList: () =>
                editor!.chain().focus().toggleBulletList().run(),
            toggleOrderedList: () =>
                editor!.chain().focus().toggleOrderedList().run(),
        }),
        []
    );
};

const MenuBar: FC<StackProps> = (props) => {
    const { editor } = useEditorContext();
    const {
        toggleBold,
        toggleItalic,
        toggleStrike,
        toggleUnderline,
        toggleBulletList,
        toggleOrderedList,
    } = useCallbacks();

    if (!editor) {
        return null;
    }

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
        <Stack alignItems="center" direction="row" {...props}>
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

            <TextFormatSelect />

            <MenuBarButton
                name="bulletList"
                onClick={toggleBulletList}
                icon={<FormatListBulletedIcon />}
            />

            <MenuBarButton
                name="orderedList"
                onClick={toggleOrderedList}
                icon={<FormatListNumberedIcon />}
            />

            <TextAlignButton textAlign="left" />
            <TextAlignButton textAlign="center" />
            <TextAlignButton textAlign="right" />
            <TextAlignButton textAlign="justify" />

            <IndentButton />
            <OutdentButton />
        </Stack>
    );
};

export default MenuBar;

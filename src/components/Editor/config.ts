import Blockquote from "@tiptap/extension-blockquote";
import Paragraph from "@tiptap/extension-paragraph";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import HardBreak from "@tiptap/extension-hard-break";
import OrderedList from "@tiptap/extension-ordered-list";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Indent from "./extensions/Indent";
import Link, { LinkOptions } from "@tiptap/extension-link";

import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import History from "@tiptap/extension-history";
import errorToast from "../Toaster/error";

const isAllowedUri: LinkOptions["isAllowedUri"] = (url, ctx) => {
    try {
        // INFO: allow only https
        const parsedUrl = url.startsWith("https://")
            ? new URL(url)
            : new URL(`${ctx.defaultProtocol}://${url}`);

        // use default validation
        if (!ctx.defaultValidate(parsedUrl.href))
            throw new Error("Base validation failed");

        // all checks have passed
        return true;
    } catch {
        errorToast("_PPEDITOR_LINK_INVALID0_", "_PPEDITOR_LINK_INVALID1_");
        return false;
    }
};

const TEXT_TYPES = ["heading", "paragraph", "listItem"];

const extensions = [
    Document,
    Paragraph,
    Text,
    Heading,
    ListItem,
    BulletList,
    Blockquote.configure({
        HTMLAttributes: {
            class: "PPEditor-BlockQuote",
        },
    }),
    HardBreak,
    OrderedList,
    Bold,
    Italic,
    Strike,
    Underline,
    TextAlign.configure({
        alignments: ["left", "center", "right", "justify"],
        types: TEXT_TYPES,
        defaultAlignment: "left",
    }),
    Indent.configure({
        types: TEXT_TYPES,
        minLevel: 0,
        maxLevel: 8,
    }),
    Link.configure({
        defaultProtocol: "https",
        openOnClick: false,
        isAllowedUri,
    }),
    // ...
    TextStyle,
    Color,
    Highlight.configure({
        multicolor: true,
    }),
    // ...
    History,
];

export { extensions };

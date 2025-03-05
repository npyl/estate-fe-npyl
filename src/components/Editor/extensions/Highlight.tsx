import { Mark } from "@tiptap/core";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        highlight: {
            setHighlight: (attributes?: { color: string }) => ReturnType;
            toggleHighlight: (attributes?: { color: string }) => ReturnType;
            unsetHighlight: () => ReturnType;
        };
    }
}

export const Highlight = Mark.create({
    name: "highlight",

    addAttributes() {
        return {
            color: {
                default: null,
                parseHTML: () => null,
                renderHTML: () => ({}),
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: "span",
            },
        ];
    },

    renderHTML() {
        // Just wrap in a span with no attributes
        return ["span", 0];
    },
});

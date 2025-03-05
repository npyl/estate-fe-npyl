import { Mark, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        textStyle: {
            /**
             * Set the text style
             */
            setTextStyle: (attributes?: { fontFamily?: string }) => ReturnType;
            /**
             * Unset the text style
             */
            unsetTextStyle: () => ReturnType;
        };
    }
}

export interface TextStyleOptions {
    HTMLAttributes: Record<string, any>;
}

export const TextStyle = Mark.create<TextStyleOptions>({
    name: "textStyle",

    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },

    addAttributes() {
        return {
            fontFamily: {
                default: null,
                parseHTML: (element) => element.style.fontFamily,
                renderHTML: (attributes) => {
                    if (!attributes.fontFamily) {
                        return {};
                    }

                    return {
                        style: `font-family: ${attributes.fontFamily}`,
                    };
                },
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'span[style*="font-family"]',
                getAttrs: (element) => {
                    if (typeof element === "string") {
                        return false;
                    }
                    return {
                        fontFamily: element.style.fontFamily,
                    };
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            "span",
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
            0,
        ];
    },

    addCommands() {
        return {
            setTextStyle:
                (attributes) =>
                ({ commands }) => {
                    return commands.setMark(this.name, attributes);
                },
            unsetTextStyle:
                () =>
                ({ commands }) => {
                    return commands.unsetMark(this.name);
                },
        };
    },
});

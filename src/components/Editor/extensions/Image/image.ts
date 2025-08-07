import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core";

export interface ImageOptions {
    /**
     * HTML attributes to add to the image element.
     * @default {}
     * @example { class: 'foo' }
     */
    HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        image: {
            /**
             * Add an image
             * @param options The image attributes
             * @example
             * editor
             *   .commands
             *   .addImage({ src: 'https://tiptap.dev/logo.png', alt: 'tiptap', title: 'tiptap logo', style: 'width: 100px;' })
             */
            addImage: (options: {
                src: string;
                alt?: string;
                title?: string;
                style?: string;
            }) => ReturnType;
        };
    }
}

/**
 * Matches an image to a ![image](src "title") on input.
 */
export const inputRegex =
    /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

/**
 * This extension allows you to insert images.
 * @see https://www.tiptap.dev/api/nodes/image
 */
export const Image = Node.create<ImageOptions>({
    name: "image",

    addOptions() {
        return {
            inline: false,
            HTMLAttributes: {},
        };
    },

    group() {
        return "block";
    },

    addAttributes() {
        return {
            src: {
                default: null,
            },
            alt: {
                default: null,
            },
            title: {
                default: null,
            },
            style: {
                default: null,
            },
        };
    },

    parseHTML() {
        return [
            {
                // INFO: not accepting base64
                tag: 'img[src]:not([src^="data:"])',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            "img",
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        ];
    },

    addCommands() {
        return {
            addImage:
                (options) =>
                ({ state, tr, dispatch }) => {
                    // Alternative approach: Insert at current position without replacing selection
                    const { selection } = state;

                    // Create the image node
                    const imageNode =
                        state.schema.nodes[this.name].create(options);

                    // Insert after current selection
                    const insertPos = selection.$to.pos;

                    if (dispatch) {
                        tr.insert(insertPos, imageNode);
                        dispatch(tr);
                    }

                    return true;
                },
        };
    },

    addInputRules() {
        return [
            nodeInputRule({
                find: inputRegex,
                type: this.type,
                getAttributes: (match) => {
                    const [, , alt, src, title] = match;

                    return { src, alt, title };
                },
            }),
        ];
    },
});

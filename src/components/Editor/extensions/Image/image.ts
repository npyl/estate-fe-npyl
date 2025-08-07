import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core";

export interface ImageOptions {
    /**
     * HTML attributes to add to the image element.
     * @default {}
     * @example { class: 'foo' }
     */
    HTMLAttributes: Record<string, any>;
}

export interface ImageContainerOptions {
    /**
     * HTML attributes to add to the container element.
     * @default {}
     * @example { class: 'image-gallery', style: 'display: flex; gap: 10px;' }
     */
    HTMLAttributes?: Record<string, any>;
    /**
     * Custom container tag name
     * @default 'div'
     */
    tag?: string;
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
            /**
             * Create a new image container
             * @param options The container options
             * @example
             * const container = editor.commands.createContainer({ HTMLAttributes: { class: 'gallery' } })
             */
            createContainer: (options?: ImageContainerOptions) => ReturnType;
            /**
             * Add an image to a specific container
             * @param containerPos Position of the container node
             * @param options The image attributes
             * @example
             * editor.commands.addImageToContainer(containerPos, { src: 'image.jpg' })
             */
            addImageToContainer: (
                containerPos: number,
                options: {
                    src: string;
                    alt?: string;
                    title?: string;
                    style?: string;
                }
            ) => ReturnType;
        };
    }
}

/**
 * Matches an image to a ![image](src "title") on input.
 */
export const inputRegex =
    /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

/**
 * Image Container Node
 */
export const ImageContainer = Node.create<ImageContainerOptions>({
    name: "imageContainer",

    addOptions() {
        return {
            HTMLAttributes: {},
            tag: "div",
        };
    },

    group() {
        return "block";
    },

    content() {
        return "image*";
    },

    addAttributes() {
        return {
            containerTag: {
                default: "div",
            },
            // Store HTML attributes as node attributes
            containerStyle: {
                default: null,
            },
            containerClass: {
                default: null,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: "div[data-image-container]",
                getAttrs: (element) => {
                    const el = element as HTMLElement;
                    return {
                        containerTag: el.tagName.toLowerCase(),
                        containerStyle: el.getAttribute("style"),
                        containerClass: el.getAttribute("class"),
                    };
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes, node }) {
        const tag = node.attrs.containerTag || "div";

        // Merge the node's stored attributes with any additional HTMLAttributes
        const attrs = mergeAttributes(
            this.options.HTMLAttributes ?? {},
            HTMLAttributes,
            {
                "data-image-container": "",
                style: node.attrs.containerStyle,
                class: node.attrs.containerClass,
            }
        );

        return [tag, attrs, 0]; // 0 is the content slot
    },
});

/**
 * This extension allows you to insert images and create image containers.
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
                    const { selection } = state;
                    const imageNode =
                        state.schema.nodes[this.name].create(options);
                    const insertPos = selection.$to.pos;

                    if (dispatch) {
                        tr.insert(insertPos, imageNode);
                        dispatch(tr);
                    }

                    return true;
                },

            createContainer:
                (options = {}) =>
                ({ state, tr, dispatch }) => {
                    const { selection } = state;
                    const { HTMLAttributes = {}, tag = "div" } = options;

                    // Check if imageContainer node type exists
                    const containerNodeType = state.schema.nodes.imageContainer;
                    if (!containerNodeType) {
                        console.warn(
                            "imageContainer node type not found. Make sure to include ImageContainer in your editor extensions."
                        );
                        return false;
                    }

                    // Extract style and class from HTMLAttributes to store as node attributes
                    const nodeAttrs: any = {
                        containerTag: tag,
                    };

                    if (HTMLAttributes.style) {
                        nodeAttrs.containerStyle = HTMLAttributes.style;
                    }
                    if (HTMLAttributes.class) {
                        nodeAttrs.containerClass = HTMLAttributes.class;
                    }

                    const containerNode = containerNodeType.create(
                        nodeAttrs,
                        [] // Empty content initially
                    );

                    const insertPos = selection.$to.pos;

                    if (dispatch) {
                        const transaction = tr.insert(insertPos, containerNode);
                        dispatch(transaction);

                        // Return the position of the inserted container for later use
                        transaction.setMeta("containerPos", insertPos);
                    }

                    return true;
                },

            addImageToContainer:
                (containerPos, imageOptions) =>
                ({ state, tr, dispatch }) => {
                    try {
                        const containerNode = state.doc.nodeAt(containerPos);

                        if (
                            !containerNode ||
                            containerNode.type.name !== "imageContainer"
                        ) {
                            console.warn(
                                "No container found at the specified position"
                            );
                            return false;
                        }

                        const imageNode =
                            state.schema.nodes.image.create(imageOptions);

                        // Find the end position inside the container
                        const containerEnd =
                            containerPos + containerNode.nodeSize - 1;

                        if (dispatch) {
                            tr.insert(containerEnd, imageNode);
                            dispatch(tr);
                        }

                        return true;
                    } catch (error) {
                        console.error(
                            "Error adding image to container:",
                            error
                        );
                        return false;
                    }
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

// Utility function to get all containers in the document
export const getAllContainers = (state: any) => {
    const containers: { pos: number; node: any }[] = [];

    state.doc.descendants((node: any, pos: number) => {
        if (node.type.name === "imageContainer") {
            containers.push({ pos, node });
        }
    });

    return containers;
};

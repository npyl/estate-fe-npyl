import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core";
import { TextSelection } from "@tiptap/pm/state";
import ensureParagraphAfterContainerPlugin from "./ResidualParagraph";

const CONTAINER_NAME = "imageContainer";

type TImage = { id: number; url: string };

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
             * Create a new image container
             * @param options The container options
             * @example
             * const container = editor.commands.createContainer({ HTMLAttributes: { class: 'gallery' } })
             */
            createContainer: (options?: ImageContainerOptions) => ReturnType;
            /**
             * Add multiple images to a specific container
             * @param containerPos Position of the container node
             * @param images Array of image source URLs
             * @param options The shared image options
             * @example
             * editor.commands.addImageToContainer(containerPos, ['image1.jpg', 'image2.jpg'], { style: 'width: 50%;' })
             */
            addImageToContainer: (
                containerPos: number,
                images: TImage[],
                options?: {
                    style?: string;
                    alt?: string;
                    title?: string;
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
    name: CONTAINER_NAME,

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

    addProseMirrorPlugins() {
        return [ensureParagraphAfterContainerPlugin()];
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

                    if (!dispatch) return false;

                    const transaction = tr.insert(insertPos, containerNode);

                    // Add a paragraph after the container for continued editing
                    const afterContainerPos =
                        insertPos + containerNode.nodeSize;
                    const paragraphNode = state.schema.nodes.paragraph.create();
                    transaction.insert(afterContainerPos, paragraphNode);

                    // Set cursor to the new paragraph
                    const resolvedPos = transaction.doc.resolve(
                        afterContainerPos + 1
                    );
                    transaction.setSelection(TextSelection.near(resolvedPos));

                    dispatch(transaction);

                    // Return the position of the inserted container for later use
                    transaction.setMeta("containerPos", insertPos);

                    return true;
                },

            addImageToContainer:
                (containerPos, images, options = {}) =>
                ({ state, tr, dispatch }) => {
                    try {
                        const containerNode = state.doc.nodeAt(containerPos);

                        if (
                            !containerNode ||
                            containerNode.type.name !== CONTAINER_NAME
                        ) {
                            console.warn(
                                "No container found at the specified position"
                            );
                            return false;
                        }

                        // Validate that images is an array
                        if (!Array.isArray(images) || images.length === 0) {
                            console.warn(
                                "Images parameter must be a non-empty array"
                            );
                            return false;
                        }

                        // Find the end position inside the container
                        let insertPos =
                            containerPos + containerNode.nodeSize - 1;

                        if (!dispatch) return false;

                        // Create and insert all image nodes
                        images.forEach(({ id, url }) => {
                            const imageOptions = {
                                id,
                                src: url,
                                alt: options.alt,
                                title: options.title,
                                style: options.style,
                            };

                            const imageNode =
                                state.schema.nodes.image.create(imageOptions);
                            tr.insert(insertPos, imageNode);

                            // Update insert position for the next image
                            insertPos += imageNode.nodeSize;
                        });

                        dispatch(tr);

                        return true;
                    } catch (error) {
                        console.error(error);
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
        if (node.type.name === CONTAINER_NAME) {
            containers.push({ pos, node });
        }
    });

    return containers;
};

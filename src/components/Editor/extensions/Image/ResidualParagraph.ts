import { Plugin, PluginKey } from "@tiptap/pm/state";

// Plugin to ensure paragraph after image containers
const ensureParagraphAfterContainerKey = new PluginKey(
    "ensureParagraphAfterContainer"
);

const ensureParagraphAfterContainerPlugin = () => {
    return new Plugin({
        key: ensureParagraphAfterContainerKey,
        appendTransaction(transactions, oldState, newState) {
            const tr = newState.tr;
            let modified = false;

            // Check each image container in the document
            newState.doc.descendants((node, pos) => {
                if (node.type.name === "imageContainer") {
                    const afterPos = pos + node.nodeSize;

                    // Check if we're at the end of the document
                    const isAtEnd = afterPos >= newState.doc.content.size;

                    // Check if the next node exists and is a paragraph
                    const nextNode = isAtEnd
                        ? null
                        : newState.doc.nodeAt(afterPos);
                    const needsParagraph =
                        isAtEnd ||
                        !nextNode ||
                        nextNode.type.name !== "paragraph";

                    if (needsParagraph) {
                        const paragraphNode =
                            newState.schema.nodes.paragraph.create();
                        tr.insert(afterPos, paragraphNode);
                        modified = true;
                    }
                }
            });

            return modified ? tr : null;
        },
    });
};

export default ensureParagraphAfterContainerPlugin;

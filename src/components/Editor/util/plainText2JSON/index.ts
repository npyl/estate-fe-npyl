const plainTextToJSON = (text: string): string => {
    // Split the text by double newlines to separate paragraphs
    const paragraphs = text.split(/\n\n+/);

    // Create content array with paragraph nodes
    const content = paragraphs.map((paragraph) => {
        // For paragraphs with single newlines, we need to handle them as line breaks
        if (paragraph.includes("\n")) {
            const lines = paragraph.split("\n");

            // Create inline content with hard breaks
            const inlineContent = lines.flatMap((line, index) => {
                // For each line except the last one, add a hard break after it
                const lineContent = [];

                // Add the text
                if (line.trim()) {
                    lineContent.push({
                        type: "text",
                        text: line,
                    });
                }

                // Add a hard break if not the last line
                if (index < lines.length - 1) {
                    lineContent.push({
                        type: "hardBreak",
                    });
                }

                return lineContent;
            });

            return {
                type: "paragraph",
                content: inlineContent,
            };
        }

        // Simple paragraph with just text
        return {
            type: "paragraph",
            content: paragraph.trim()
                ? [{ type: "text", text: paragraph }]
                : [],
        };
    });

    // Create the final document structure
    return JSON.stringify({
        type: "doc",
        content,
    });
};

export default plainTextToJSON;

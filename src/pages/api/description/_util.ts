/**
 * Extracts RTF content from a string that contains RTF markup within backticks
 * @param {string} text - Input text containing RTF content within backticks
 * @returns {string} - The extracted RTF content, or empty string if no match found
 */
function extractRTFContent(text: string): string {
    // Match content between backticks that starts with "rtf"
    const rtfRegex = /`rtf\s*([\s\S]*?)`/;
    const match = text.match(rtfRegex);

    // Return the captured RTF content or empty string if no match
    return match ? match[1].trim() : "";
}

export { extractRTFContent };

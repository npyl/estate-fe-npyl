// Helper function to convert base64url to standard base64
const convertBase64UrlToBase64 = (base64url: string) =>
    base64url.replace(/-/g, "+").replace(/_/g, "/");

const attachmentData2Url = (base64: string, mimeType: string) => {
    // Convert base64url format (used by Gmail API) to standard base64
    const standardBase64 = convertBase64UrlToBase64(base64);

    // Create the appropriate data URL with the correct MIME type
    const url = `data:${mimeType};base64,${standardBase64}`;

    return url;
};

export { attachmentData2Url };

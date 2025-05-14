import { IAttachment } from "@/types/email";

/**
 * Converts a File object to base64 on the client side
 * @param file - The File object from input[type="file"]
 * @returns Promise that resolves to an IAttachment object
 */
const fileToBase64 = (file: File): Promise<IAttachment> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === "string") {
                // Remove the data:type;base64, prefix
                const base64 = reader.result.split(",")[1];
                resolve({
                    base64,
                    name: file.name,
                    type: file.type || "application/octet-stream",
                });
            } else {
                reject(new Error("Failed to read file as string"));
            }
        };

        reader.onerror = () => {
            reject(new Error("Error reading file"));
        };

        reader.readAsDataURL(file);
    });
};

/**
 * Converts multiple files to base64
 * @param files - Array of File objects or FileList
 * @returns Promise that resolves to an array of IAttachment objects
 */
const filesToBase64 = async (
    files: File[] | FileList
): Promise<IAttachment[]> => {
    const fileArray = Array.from(files);
    const attachmentPromises = fileArray.map(fileToBase64);
    return Promise.all(attachmentPromises);
};

export default filesToBase64;

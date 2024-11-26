/**
 * Used when uploading to Amazon (supports upload progress %)
 * @param url amazon url to upload to
 * @param file -
 * @param onProgressUpdate
 * @returns
 */
async function uploadWithProgress(
    url: string,
    file: Blob | File,
    onProgressUpdate?: (p: number) => void
): Promise<Response> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = ({ loaded, total, lengthComputable }) => {
            if (!lengthComputable) return;
            const progress = Math.min(Math.round((loaded / total) * 100), 100);
            onProgressUpdate?.(progress);
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(
                    new Response(xhr.response, {
                        status: xhr.status,
                        statusText: xhr.statusText,
                    })
                );
            } else {
                reject(xhr.statusText || "");
            }
        };

        xhr.onerror = () => reject("Network error occurred");
        xhr.ontimeout = () => reject("Request timed out");

        xhr.open("PUT", url, true);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
    });
}

export { uploadWithProgress };

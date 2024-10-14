const removeMetadata = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error("Failed to convert image to Blob."));
                }
            }, file.type);
        };
        img.onerror = () => {
            reject(new Error("Failed to load image for processing."));
        };

        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            img.src = e.target?.result as string;
        };
        reader.onerror = () => {
            reject(new Error("Failed to read file."));
        };
        reader.readAsDataURL(file);
    });
};

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

export { removeMetadata, uploadWithProgress };

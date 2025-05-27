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

export { removeMetadata };

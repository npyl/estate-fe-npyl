const fileToBase64 = (file: Blob): Promise<ArrayBuffer | string | null> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("ERROR"));
    });

export default fileToBase64;

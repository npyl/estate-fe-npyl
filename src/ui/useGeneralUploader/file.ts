type TUploadError = "RESPONSE_ERROR";

const ERROR0 = "RESPONSE_ERROR";

interface IUploadRes {
    success: boolean;
    response?: any;
    error?: ProgressEvent<EventTarget> | TUploadError;
}

/**
 * Upload file to Amazon w/  promise
 * @param url amazon url to upload to
 * @param file the Blob or File object to upload
 * @param onProgressUpdate (%) upload progress
 * @returns promise; on error or timeout rejects with the actual error
 */
const uploadWithProgress = async (
    url: string,
    file: Blob | File,
    onProgressUpdate?: (p: number) => void
): Promise<IUploadRes> =>
    new Promise((resolve) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = ({ loaded, total, lengthComputable }) => {
            if (!lengthComputable) return;
            const progress = Math.min(Math.round((loaded / total) * 100), 100);
            onProgressUpdate?.(progress);
        };

        xhr.onload = () => {
            const res =
                xhr.status === 200
                    ? { success: true, data: xhr.response }
                    : ({ success: false, error: ERROR0 } as const);

            resolve(res);
        };

        xhr.onerror = (error) => resolve({ success: false, error });
        xhr.ontimeout = (error) => resolve({ success: false, error });

        xhr.open("PUT", url, true);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
    });

export { uploadWithProgress };

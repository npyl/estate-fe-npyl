const ERROR0 = "RESPONSE_ERROR";
const ERROR1 = "GENERAL_ERROR";
const ERROR_TIMEOUT = "TIMEOUT_ERROR";

type TUploadError = typeof ERROR0 | typeof ERROR1 | typeof ERROR_TIMEOUT;

interface IUploadRes {
    success: boolean;
    response?: any;

    error?: TUploadError;
    errorDescription?: string;
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

        xhr.onerror = () => {
            let errorMessage = "Network error during upload";

            // Try to get more specific error info
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 0) {
                    errorMessage =
                        "Network error: No response from server (possibly CORS, network, or firewall issue)";
                } else {
                    errorMessage = `HTTP error: ${xhr.status}`;
                }
            } else {
                errorMessage = `Connection error at state ${xhr.readyState}`;
            }

            resolve({
                success: false,
                error: ERROR1,
                errorDescription: errorMessage,
            });
        };
        xhr.ontimeout = () => resolve({ success: false, error: ERROR_TIMEOUT });

        xhr.open("PUT", url, true);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
    });

export { uploadWithProgress };

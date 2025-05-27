import useNetworkAccess from "@/_private/useNetworkAccess";
import { useCallback, useRef } from "react";

const ERROR_RESPONSE = "RESPONSE_ERROR";
const ERROR_GENERAL = "GENERAL_ERROR";
const ERROR_TIMEOUT = "TIMEOUT_ERROR";
const ERROR_ABORT = "ABORT_ERROR";

type TUploadError =
    | typeof ERROR_RESPONSE
    | typeof ERROR_GENERAL
    | typeof ERROR_TIMEOUT
    | typeof ERROR_ABORT;

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
const uploadWithProgress = (
    url: string,
    file: Blob | File,
    onProgressUpdate?: (p: number) => void
): [XMLHttpRequest, Promise<IUploadRes>] => {
    const xhr = new XMLHttpRequest();

    const p = new Promise<IUploadRes>(async (resolve) => {
        xhr.upload.onprogress = ({ loaded, total, lengthComputable }) => {
            if (!lengthComputable) return;
            const progress = Math.min(Math.round((loaded / total) * 100), 100);
            onProgressUpdate?.(progress);
        };

        xhr.onload = () => {
            const res =
                xhr.status === 200
                    ? { success: true, data: xhr.response }
                    : ({ success: false, error: ERROR_RESPONSE } as const);

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
                error: ERROR_GENERAL,
                errorDescription: errorMessage,
            });
        };
        xhr.ontimeout = () => resolve({ success: false, error: ERROR_TIMEOUT });
        xhr.onabort = () => resolve({ success: false, error: ERROR_ABORT });

        xhr.open("PUT", url, true);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
    });

    return [xhr, p] as const;
};

// ---------------------------------------------------------------------------------------

const DONT_CHECK = {
    checkInterval: 0,
};

type TCb = (
    url: string,
    file: Blob | File,
    onProgressUpdate?: (p: number) => void
) => Promise<IUploadRes>;

const useUploadWithProgress = () => {
    const request = useRef<XMLHttpRequest>();

    const onChange = useCallback((c: boolean) => {
        if (c) return;
        request.current?.abort();
    }, []);
    const [isConnected, resetInterval] = useNetworkAccess(onChange, DONT_CHECK);

    const upload: TCb = useCallback(async (...args) => {
        const [xhr, req] = uploadWithProgress(...args);
        request.current = xhr;
        return req;
    }, []);

    return [upload, isConnected, resetInterval] as const;
};

export { ERROR_RESPONSE, ERROR_GENERAL, ERROR_TIMEOUT, ERROR_ABORT };
export default useUploadWithProgress;

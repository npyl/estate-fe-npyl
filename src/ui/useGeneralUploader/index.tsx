import executeSequentially from "@/utils/executeSequentially";
import { useCallback } from "react";
import { uploadWithProgress } from "./file";

// ----------------------------------------------------------------------------------------------------------------------

interface AddFileRes {
    key: string;
    url: string; // amazon to PUT image
    cdnUrl: string; // where image **WILL** be downloadable from when PUT finishes
}
interface UploadResponse {
    key: string;
    cdnUrl: string;
}

type WithError<T> = { data: T } | { error: any };
type OrUndefined<T> = T | undefined;

type TStep0Cb = (f: File) => Promise<OrUndefined<AddFileRes>>;
type TStep1Cb = (
    f: OrUndefined<File>,
    res: AddFileRes
) => Promise<OrUndefined<UploadResponse>>;

// ---------------------------------------------------------------------------------------------------------------------------

type TUpload = (f: File[]) => Promise<void>;

interface IUploadProgress {
    key: string;
    p: number;
}

// ---------------------------------------------------------------------------------------------------------------------------

/**
 * addFile:     tells BE to allocate space for this and returns cdnUrl to upload to
 * removeFile:  tells BE to de-allocate space (e.g. on unsuccessful update)
 */
interface UseGeneralUploaderMethods {
    addFile: (f: File) => Promise<WithError<AddFileRes>>;
    removeFile: (key: string) => void;
}

/**
 * onFinish:        called when everything is done; called even if there were failures (a.k.a. finish doesn't equal 100% success)
 *
 * onAddFail:       `addFile` failed for one file
 * onUploadFail:    `uploadFile` failed for one file
 */
interface UseGeneralUploaderHandlers {
    onFinish: VoidFunction;
    onAddFail?: VoidFunction;
    onUploadFail?: VoidFunction;
    onProgressUpdate?: (p: IUploadProgress) => void;
}

// ---------------------------------------------------------------------------------------------------------------------------

/**
 *  useGeneralUploader
 *
 *  step0: "AddFile(s)"
 *  step1  "UploadFile(s)"
 *
 */
const useGeneralUploader = (
    METHODS: UseGeneralUploaderMethods,
    HANDLERS: UseGeneralUploaderHandlers
) => {
    const step0: TStep0Cb = useCallback(
        async (f) => {
            const res = await METHODS.addFile(f);
            if ("error" in res) {
                HANDLERS.onAddFail?.();
                return;
            }

            return res.data;
        },
        [METHODS.addFile, HANDLERS.onAddFail]
    );
    const step1: TStep1Cb = useCallback(
        async (f, addRes) => {
            const { type } = f || {};
            const { key, url, cdnUrl } = addRes;

            // Sanity Checks
            if (!f || !type) {
                METHODS.removeFile(key);
                HANDLERS.onUploadFail?.();
                return;
            }
            if (!key || !url || !cdnUrl) {
                METHODS.removeFile(key);
                HANDLERS.onUploadFail?.();
                return;
            }

            // PUT to amazon url
            const res = await uploadWithProgress(url, f, (p) =>
                HANDLERS.onProgressUpdate?.({ key, p })
            );

            if (!res.success) {
                HANDLERS.onUploadFail?.();
                return;
            }

            return { key, cdnUrl };
        },
        [HANDLERS.onProgressUpdate, HANDLERS.onUploadFail]
    );

    // ------------------------------------------------------------------------

    const reduceAddFileRes = useCallback(
        async (
            acc: Promise<AddFileRes[]>,
            file: File
        ): Promise<AddFileRes[]> => {
            const accumulator = await acc;
            const res = await step0(file);
            if (res) accumulator.push(res);
            return accumulator;
        },
        [step0]
    );

    const createUploadPromisesReducer = useCallback(
        (files: File[]) =>
            (
                acc: Array<() => Promise<OrUndefined<UploadResponse>>>,
                addFileResult: AddFileRes,
                index: number
            ) => {
                const p = () => step1(files.at(index), addFileResult);
                if (p) acc.push(p);
                return acc;
            },
        [step1]
    );

    // -------------------------------------------------------------------------------

    const upload: TUpload = useCallback(
        async (files) => {
            // INFO: call step0 (add file) in-parallel
            const r = await files.reduce(reduceAddFileRes, Promise.resolve([]));

            // INFO: call step1 (upload) sequentially
            const p = r.reduce(createUploadPromisesReducer(files), []);
            await executeSequentially(p);

            HANDLERS.onFinish();
        },
        [reduceAddFileRes, createUploadPromisesReducer, HANDLERS.onFinish]
    );

    return upload;
};

export type { TUpload, UseGeneralUploaderMethods, UseGeneralUploaderHandlers };
export default useGeneralUploader;

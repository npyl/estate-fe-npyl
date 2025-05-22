import useDialog from "@/hooks/useDialog";
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

type WithError<T> = T | { error: string };
type OrUndefined<T> = T | undefined;

type TStep0Cb = (f: File) => Promise<OrUndefined<AddFileRes>>;
type TStep1Cb = (
    f: OrUndefined<File>,
    res: AddFileRes
) => Promise<OrUndefined<UploadResponse>>;

// ---------------------------------------------------------------------------------------------------------------------------

interface IUploadProgress {
    key: string;
    p: number;
}

interface UseGeneralUploaderMethods {
    addFile: (f: File) => Promise<WithError<AddFileRes>>; // tells BE to allocate space for this and returns cdnUrl to upload to
    removeFile: () => void; // tells BE to de-allocate space (e.g. on unsuccessful update)
}

/**
 *  useGeneralUploader
 *
 *  step0: "AddFile(s)"
 *  step1  "UploadFile(s)"
 *
 */
const useGeneralUploader = (
    METHODS: UseGeneralUploaderMethods,
    // ...
    onFinish: VoidFunction,
    onAddFail: VoidFunction,
    onUploadFail: VoidFunction,
    onProgressUpdate?: (p: IUploadProgress) => void
) => {
    const [isUploading, startUploading, stopUploading] = useDialog();

    const step0: TStep0Cb = useCallback(
        async (f) => {
            const res = await METHODS.addFile(f);
            if ("error" in res) {
                onAddFail();
                return;
            }

            return res;
        },
        [METHODS.addFile, onAddFail]
    );
    const step1: TStep1Cb = useCallback(
        async (f, addRes) => {
            const { type } = f || {};
            const { key, url, cdnUrl } = addRes;

            if (!type) {
                onUploadFail();
                return;
            }
            if (!key || !url || !cdnUrl) {
                onUploadFail();
                return;
            }

            // PUT to amazon url
            // await uploadWithProgress({
            //     url,
            //     f,
            //     onProgressUpdate: (p) => onProgressUpdate?.({ key, p }),
            // });

            return { key, cdnUrl };
        },
        [onProgressUpdate, onUploadFail]
    );

    // ------------------------------------------------------------------------

    const getUploadPromise = useCallback(
        (files: File[]) => (r: AddFileRes, i: number) => () =>
            step1(files.at(i), r),
        [step1]
    );

    const reduceAddFileResults = useCallback(
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
                const p = getUploadPromise(files)(addFileResult, index);
                if (p) acc.push(p);
                return acc;
            },
        [getUploadPromise]
    );

    // -------------------------------------------------------------------------------

    const upload = useCallback(
        async (files: File[]) => {
            // INFO: call step0 (add file) in-parallel
            const r = await files.reduce(
                reduceAddFileResults,
                Promise.resolve([])
            );

            // INFO: call step1 (upload) sequentially
            const p = r.reduce(createUploadPromisesReducer(files), []);
            await executeSequentially(p);

            onFinish();
        },
        [reduceAddFileResults, createUploadPromisesReducer, onFinish]
    );

    return { upload };
};

export default useGeneralUploader;

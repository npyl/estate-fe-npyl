import executeSequentially from "@/utils/executeSequentially";
import { useCallback } from "react";
import { uploadWithProgress } from "./file";
import {
    AddFileRes,
    OrUndefined,
    TStep0Cb,
    TStep1Cb,
    TUpload,
    UploadResponse,
    // ...
    UseGeneralUploaderHandlers,
    UseGeneralUploaderMethods,
} from "./types";
import useReport from "./useReport";

type UploadPromise = () => Promise<OrUndefined<UploadResponse>>;

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
    const { onAddFail, onUploadFail, onFinish } = useReport(HANDLERS);

    // ------------------------------------------------------------------------

    const step0: TStep0Cb = useCallback(
        async (f) => {
            const res = await METHODS.addFile(f);
            if ("error" in res) {
                onAddFail(f);
                return;
            }

            return res.data as any;
        },
        [METHODS.addFile, onAddFail]
    );
    const step1: TStep1Cb = useCallback(
        async (f, addRes) => {
            const { type } = f || {};
            const { key, url, cdnUrl } = addRes;

            // Sanity Checks
            if (!f || !type) {
                METHODS.removeFile(key);
                onUploadFail(key);
                return;
            }
            if (!key || !url || !cdnUrl) {
                METHODS.removeFile(key);
                onUploadFail(key);
                return;
            }

            // PUT to amazon url
            const res = await uploadWithProgress(url, f, (p) =>
                HANDLERS.onProgressUpdate?.({ key, p })
            );

            if (!res.success) {
                onUploadFail(key);
                return;
            }

            return { key, cdnUrl };
        },
        [HANDLERS.onProgressUpdate, onUploadFail]
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
                acc: UploadPromise[],
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

            return onFinish(r);
        },
        [reduceAddFileRes, createUploadPromisesReducer]
    );

    return upload;
};

export type { TUpload, UseGeneralUploaderMethods, UseGeneralUploaderHandlers };
export default useGeneralUploader;

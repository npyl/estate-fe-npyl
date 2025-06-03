import executeSequentially from "@/utils/executeSequentially";
import { useCallback, useRef } from "react";
import {
    AddFileRes,
    UploadFileRes,
    OrUndefined,
    TStep0Cb,
    TStep1Cb,
    TUpload,
    // ...
    UseGeneralUploaderHandlers,
    UseGeneralUploaderMethods,
    IUploadFail,
} from "./types";
import useReport from "./useReport";
import { removeMetadata } from "./util";
import useUploadWithProgress from "./useUploadWithProgress";

const ONE_SECOND = 1000; // 1sec (in ms)

type UploadPromise = () => Promise<OrUndefined<UploadFileRes>>;

/**
 *  useGeneralUploader
 *
 *  step0: "AddFile(s)"
 *  step1  "UploadFile(s)"
 *
 */
const useGeneralUploader = (
    METHODS: UseGeneralUploaderMethods,
    HANDLERS: UseGeneralUploaderHandlers,
    stripMetadata?: boolean
) => {
    const { onReset, onAddFail, onUploadFail, onFinish } = useReport(HANDLERS);

    const onProgressUpdate = useCallback(
        (key: string) => (p: number) => HANDLERS.onProgressUpdate?.({ key, p }),
        [HANDLERS.onProgressUpdate]
    );

    const failedPendingRemoval = useRef<IUploadFail[]>([]);
    const removePendingKeys = useCallback(
        () =>
            Promise.all(
                failedPendingRemoval.current.map(({ key }) =>
                    METHODS.removeFile(key)
                )
            ),
        []
    );

    const [
        uploadWithProgress,
        // ...
        isConnected,
        resetInterval,
    ] = useUploadWithProgress(removePendingKeys);

    // ------------------------------------------------------------------------

    const step0: TStep0Cb = useCallback(
        async (f) => {
            if (!isConnected.current) {
                onAddFail(f);
                return;
            }

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
            const { type, name } = f || {};
            const { key, url, cdnUrl } = addRes;

            if (!name) return;

            const fail: IUploadFail = { key, name };

            if (!isConnected.current) {
                onUploadFail(fail);
                return;
            }

            // Sanity Checks
            if (!f || !type) {
                onUploadFail(fail);
                return;
            }
            if (!key || !url || !cdnUrl) {
                onUploadFail(fail);
                return;
            }

            const stripped = stripMetadata ? await removeMetadata(f) : f;

            // PUT to amazon url
            const res = await uploadWithProgress(
                url,
                stripped,
                onProgressUpdate(key)
            );

            if (!res.success) {
                onUploadFail(fail);
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

    const reduceUploadFileRes = useCallback(
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
            onReset();

            resetInterval(ONE_SECOND);

            // INFO: call step0 (add file) in-parallel
            const r = await files.reduce(reduceAddFileRes, Promise.resolve([]));

            // INFO: call step1 (upload) sequentially
            const p = r.reduce(reduceUploadFileRes(files), []);
            const res = await executeSequentially(p);

            // Filter-out failed
            const final = res.filter(Boolean) as UploadFileRes[];

            // Generate Report
            const report = onFinish(final);

            //
            // Remove Failed files
            //
            failedPendingRemoval.current = report.report.uploadFails;

            if (isConnected.current) {
                removePendingKeys();
            } else {
                // do nothing; wait for reconnect
            }

            // Return report
            return report;
        },
        [reduceAddFileRes, reduceUploadFileRes]
    );

    return upload;
};

export type { TUpload, UseGeneralUploaderMethods, UseGeneralUploaderHandlers };
export default useGeneralUploader;

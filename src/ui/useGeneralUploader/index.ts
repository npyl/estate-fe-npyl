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
import useUploadWithProgress, { POLLING } from "./useUploadWithProgress";

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
        _resetInterval,
    ] = useUploadWithProgress(removePendingKeys);

    const resetInterval = useCallback(
        (i?: number) => {
            const actualI = _resetInterval(i);
            HANDLERS.onIntervalChange?.(actualI);
        },
        [_resetInterval, HANDLERS.onIntervalChange]
    );

    const NETWORK_CRITICAL = useCallback(async function <T>(
        cb: () => Promise<T>
    ): Promise<T> {
        // Enable rapid-polling
        resetInterval(POLLING.RAPID);

        // Perform logic
        const result = await cb();

        // Disable rapid-polling or make it slower
        if (isConnected.current) {
            resetInterval();
        } else {
            resetInterval(POLLING.DEFAULT);
        }

        // return result
        return result;
    }, []);

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

    const doUploadLogic = useCallback(
        (files: File[]) => async () => {
            // INFO: call step0 (add file) in-parallel
            const r = await files.reduce(reduceAddFileRes, Promise.resolve([]));

            // INFO: call step1 (upload) sequentially
            const p = r.reduce(reduceUploadFileRes(files), []);
            const res = await executeSequentially(p);

            // Filter-out failed
            const final = res.filter(Boolean) as UploadFileRes[];

            // Generate Report
            return onFinish(final);
        },
        [reduceAddFileRes, reduceUploadFileRes]
    );

    const upload: TUpload = useCallback(
        async (files) => {
            onReset();

            const report = await NETWORK_CRITICAL(doUploadLogic(files));

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
        [doUploadLogic]
    );

    return upload;
};

export type { TUpload, UseGeneralUploaderMethods, UseGeneralUploaderHandlers };
export default useGeneralUploader;

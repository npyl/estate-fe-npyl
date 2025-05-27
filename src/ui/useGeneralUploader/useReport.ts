import { useCallback, useRef } from "react";
import {
    IUploadResult,
    UploadFileRes,
    UseGeneralUploaderHandlers,
} from "./types";

// ------------------------------------------------------------------------

const INITIAL_RESULT: IUploadResult = {
    success: false,
    report: {
        uploaded: [],
        addFails: [],
        uploadFails: [],
    },
};

const useReport = (HANDLERS: UseGeneralUploaderHandlers) => {
    const result = useRef<IUploadResult>(INITIAL_RESULT);

    const onReset = useCallback(() => (result.current = INITIAL_RESULT), []);

    const onAddFail = useCallback(
        (f: File) => {
            result.current.report.addFails.push(f);
            HANDLERS.onAddFail?.(f);
        },
        [HANDLERS.onAddFail]
    );

    const onUploadFail = useCallback(
        (name: string) => {
            result.current.report.uploadFails.push(name);
            HANDLERS.onUploadFail?.(name);
        },
        [HANDLERS.onUploadFail]
    );

    const onFinish = useCallback((addFileRes: UploadFileRes[]) => {
        const { addFails, uploadFails } = result.current.report;

        // Calculate Success
        result.current.success =
            addFails.length === 0 && uploadFails.length === 0;

        // Prepare uploaded
        result.current.report.uploaded = addFileRes;

        return result.current;
    }, []);

    return { onReset, onAddFail, onUploadFail, onFinish };
};

export default useReport;

import { useCallback, useRef } from "react";
import { AddFileRes, IUploadResult, UseGeneralUploaderHandlers } from "./types";

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

    const onAddFail = useCallback(
        (f: File) => {
            result.current.report.addFails.push(f);
            HANDLERS.onAddFail?.(f);
        },
        [HANDLERS.onAddFail]
    );

    const onUploadFail = useCallback(
        (key: string) => {
            result.current.report.uploadFails.push(key);
            HANDLERS.onUploadFail?.(key);
        },
        [HANDLERS.onUploadFail]
    );

    const onFinish = useCallback((addFileRes: AddFileRes[]) => {
        const { addFails, uploadFails } = result.current.report;

        // Calculate Success
        result.current.success =
            addFails.length === 0 && uploadFails.length === 0;

        // Prepare uploaded
        result.current.report.uploaded = addFileRes;

        return result.current;
    }, []);

    return { onAddFail, onUploadFail, onFinish };
};

export default useReport;

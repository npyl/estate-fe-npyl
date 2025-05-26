import { useCallback, useRef } from "react";
import {
    IUploadResult,
    OrUndefined,
    UploadResponse,
    UseGeneralUploaderHandlers,
} from "./types";

// ------------------------------------------------------------------------

const INITIAL_RESULT: IUploadResult = {
    success: false,
    data: [],
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

    const onFinish = useCallback((res: OrUndefined<UploadResponse>[]) => {
        const { addFails, uploadFails } = result.current.report;

        // Calculate Success
        result.current.success =
            addFails.length === 0 && uploadFails.length === 0;

        // Prepare response data
        result.current.data = res.reduce<UploadResponse[]>((acc, item) => {
            if (item) acc.push(item);
            return acc;
        }, []);

        return result.current;
    }, []);

    return { onAddFail, onUploadFail, onFinish };
};

export default useReport;

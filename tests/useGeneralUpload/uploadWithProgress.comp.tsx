import { useCallback, useRef, useState } from "react";
import { uploadWithProgress } from "../../src/ui/useGeneralUploader/file";

const UPLOAD_BTN_ID = "upload-btn-testid";
const INPUT_ID = "input-test-id";

const VALUE_ID = "value-id";

const PERCENTAGE_10_ID = "p-10-id";
const PERCENTAGE_10_VALUE = "10";
const PERCENTAGE_30_ID = "p-30-id";
const PERCENTAGE_30_VALUE = "30";
const PERCENTAGE_90_ID = "p-90-id";
const PERCENTAGE_90_VALUE = "90";

const SUCCESS_RES = "success-res";

const mockUrl = "http://127.0.0.1:3000/api/__test__/uploadFile";

const Tester = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [value, setValue] = useState("");
    const [percentage10, setPercentage10] = useState("");
    const [percentage30, setPercentage30] = useState("");
    const [percentage90, setPercentage90] = useState("");

    const onPercentage = useCallback((p: number) => {
        if (p >= 10) setPercentage10(PERCENTAGE_10_VALUE);
        if (p >= 30) setPercentage30(PERCENTAGE_30_VALUE);
        if (p >= 90) setPercentage90(PERCENTAGE_90_VALUE);
    }, []);

    const onClick = useCallback(async () => {
        const list = inputRef.current?.files;
        if (!list) {
            setValue("Could not get file list");
            return;
        }

        const file = Array.from(list).at(0);
        if (!file) {
            setValue("Could not get single file");
            return;
        }

        const res = await uploadWithProgress(mockUrl, file, onPercentage);
        if (!res.success) {
            setValue(`${res.error} ${res.errorDescription}`);
            return;
        }

        setValue(SUCCESS_RES);
    }, []);

    return (
        <>
            <input data-testid={INPUT_ID} ref={inputRef} type="file" />
            <button data-testid={UPLOAD_BTN_ID} onClick={onClick} />

            {/* Test Percentages */}
            <div data-testid={PERCENTAGE_10_ID}>{percentage10}</div>
            <div data-testid={PERCENTAGE_30_ID}>{percentage30}</div>
            <div data-testid={PERCENTAGE_90_ID}>{percentage90}</div>

            {/* Upload Result */}
            <div data-testid={VALUE_ID}>{value}</div>
        </>
    );
};

export {
    UPLOAD_BTN_ID,
    INPUT_ID,
    VALUE_ID,
    // ...
    PERCENTAGE_10_ID,
    PERCENTAGE_10_VALUE,
    PERCENTAGE_30_ID,
    PERCENTAGE_30_VALUE,
    PERCENTAGE_90_ID,
    PERCENTAGE_90_VALUE,
    SUCCESS_RES,
};
export default Tester;

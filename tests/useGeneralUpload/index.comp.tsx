import { FC, useCallback, useRef, useState } from "react";
import useGeneralUploader from "../../src/ui/useGeneralUploader";
import {
    AddFileRes,
    UseGeneralUploaderMethods,
} from "../../src/ui/useGeneralUploader/types";

const UPLOAD_BTN_ID = "upload-btn-testid";
const INPUT_ID = "input-test-id";

const VALUE_ID = "value-id";

const SUCCESS_RES = "success-res";

// -----------------------------------------------------------------------

type TAddFileCb = UseGeneralUploaderMethods["addFile"];

const useStore = (url: string) => {
    const [fileRes, setFileRes] = useState<AddFileRes[]>([]);

    const addFile: TAddFileCb = useCallback(async () => {
        const r = {
            key: `key-${Math.random()}`,
            cdnUrl: `cdnUrl-${Math.random()}`,
            url,
        };

        setFileRes((old) => [...old, r]);

        return { data: r };
    }, []);
    const removeFile = useCallback(
        (k: string) => setFileRes((old) => old.filter(({ key }) => key !== k)),
        []
    );

    return [fileRes, addFile, removeFile] as const;
};

// -----------------------------------------------------------------------

interface TesterProps {
    mockUrl: string;
}

const Tester: FC<TesterProps> = ({ mockUrl }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [files, addFile, removeFile] = useStore(mockUrl);

    const upload = useGeneralUploader({ addFile, removeFile }, {});

    const [value, setValue] = useState("");

    const onClick = useCallback(async () => {
        const list = inputRef.current?.files;
        if (!list) {
            setValue("Could not get file list");
            return;
        }

        const files = Array.from(list);

        const res = await upload(files);

        try {
            if (!res.success) throw "Check";
            if (res.report.addFails.length > 0) throw "Check";
            if (res.report.uploadFails.length > 0) throw "Check";
            if (res.report.uploaded.length !== files.length) throw "Check";

            setValue(SUCCESS_RES);
        } catch (ex) {
            setValue(JSON.stringify(res.report));
            return;
        }
    }, []);

    return (
        <>
            <input data-testid={INPUT_ID} ref={inputRef} multiple type="file" />
            <button data-testid={UPLOAD_BTN_ID} onClick={onClick} />

            {/* Upload Result */}
            <div data-testid={VALUE_ID}>{value}</div>
        </>
    );
};

export { UPLOAD_BTN_ID, INPUT_ID, VALUE_ID, SUCCESS_RES };
export default Tester;

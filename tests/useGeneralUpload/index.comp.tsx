import { FC, useCallback, useRef, useState } from "react";
import useGeneralUploader from "../../src/ui/useGeneralUploader";
import {
    AddFileRes,
    UseGeneralUploaderMethods,
} from "../../src/ui/useGeneralUploader/types";

const UPLOAD_BTN_ID = "upload-btn-testid";
const INPUT_ID = "input-test-id";

const VALUE_ID = "value-id";
const FILES_COUNT_ID = "files-count-id";

const SUCCESS_RES = "success-res";

// INFO: this is intentionally empty
const INITIAL_VALUE = "";

// -----------------------------------------------------------------------

type TAddFileCb = UseGeneralUploaderMethods["addFile"];

const useStore = (url: string) => {
    const [files, setFiles] = useState<AddFileRes[]>([]);

    const addFile: TAddFileCb = useCallback(async () => {
        const r: AddFileRes = {
            key: `key-${Math.random()}`,
            cdnUrl: `cdnUrl-${Math.random()}`,
            url,
        };

        setFiles((old) => [...old, r]);

        return { data: r };
    }, [url]);
    const removeFile = useCallback(
        (k: string) => setFiles((old) => old.filter(({ key }) => key !== k)),
        []
    );

    return [files, addFile, removeFile] as const;
};

// -----------------------------------------------------------------------

interface TesterProps {
    mockUrl: string;
}

const Tester: FC<TesterProps> = ({ mockUrl }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [files, addFile, removeFile] = useStore(mockUrl);

    const upload = useGeneralUploader({ addFile, removeFile }, {});

    const [value, setValue] = useState(INITIAL_VALUE);

    const onClick = useCallback(async () => {
        const list = inputRef.current?.files;
        if (!list) {
            setValue("Could not get file list");
            return;
        }

        const files = Array.from(list);

        const res = await upload(files);

        setValue(JSON.stringify(res));
    }, []);

    return (
        <>
            <input data-testid={INPUT_ID} ref={inputRef} multiple type="file" />
            <button data-testid={UPLOAD_BTN_ID} onClick={onClick} />

            {/* Upload Result */}
            {value ? <div data-testid={VALUE_ID}>{value}</div> : null}

            {/* TODO: Check files after remove */}
            <div data-test-id={FILES_COUNT_ID}>{files.length}</div>
        </>
    );
};

export { UPLOAD_BTN_ID, INPUT_ID, VALUE_ID, FILES_COUNT_ID, SUCCESS_RES };
export default Tester;

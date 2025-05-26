import {
    ICreatePropertyParams,
    useCreatePropertyMutation,
} from "@/services/properties";
import usePropertyUpload from "./useUploader";
import { NextPage } from "next";
import { FC, useCallback, useLayoutEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";

// INFO: prevent from showing up on production
export const getStaticProps = async () => {
    if (process.env.NODE_ENV === "production") {
        return { notFound: true };
    }
    return { props: {} };
};

// --------------------------------------------------------------------------------------

const UPLOAD_BTN_TESTID = "upload-btn-test-id";
const VALUE_TESTID = "value-test-id";
const FAILURE_RES = "failure";
const SUCCESS_RES = "success";

const CREATE_REQ: ICreatePropertyParams = {
    category: "STUDIO",
    parentCategory: "RESIDENTIAL",
};

interface TesterProps {
    id: number;
}

const Tester: FC<TesterProps> = ({ id }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [value, setValue] = useState(FAILURE_RES);

    const [upload] = usePropertyUpload("image", id);

    const onUploadClick = useCallback(async () => {
        const list = inputRef.current?.files;
        if (!list) return;

        const files = Array.from(list);

        const res = await upload(files);
        if (!res.success) return;

        setValue(SUCCESS_RES);
    }, []);

    return (
        <>
            <input multiple type="file" ref={inputRef} />
            <button data-testid={UPLOAD_BTN_TESTID} onClick={onUploadClick} />

            <Typography data-testid={VALUE_TESTID}>{value}</Typography>
        </>
    );
};

// --------------------------------------------------------------------------------------

const FileUploadPage: NextPage = () => {
    const [create] = useCreatePropertyMutation();

    const [id, setId] = useState<number>();

    const loadTester = useCallback(async () => {
        const res = await create(CREATE_REQ);
        if ("error" in res) return;

        setId(res.data);
    }, []);

    useLayoutEffect(() => {
        loadTester();
    }, []);

    if (Boolean(id)) return <Tester id={id!} />;

    return null;
};

export { UPLOAD_BTN_TESTID, VALUE_TESTID, SUCCESS_RES };
export default FileUploadPage;

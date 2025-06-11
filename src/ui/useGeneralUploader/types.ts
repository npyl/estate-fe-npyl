type WithError<T> = { data: T } | { error: any };
type OrUndefined<T> = T | undefined;

interface AddFileRes {
    key: string;
    url: string; // amazon to PUT image
    cdnUrl: string; // where image **WILL** be downloadable from when PUT finishes
}

interface UploadFileRes {
    key: string;
    cdnUrl: string;
}

type TStep0Cb = <Res extends AddFileRes = AddFileRes>(
    f: File
) => Promise<OrUndefined<Res>>;

type TStep1Cb = (
    f: OrUndefined<File>,
    res: AddFileRes
) => Promise<OrUndefined<UploadFileRes>>;

// ---------------------------------------------------------------------------------------------------------------------------

interface IUploadProgress {
    key: string;
    p: number;
}

// ---------------------------------------------------------------------------------------------------------------------------

interface IUploadFail {
    key: string;
    name: string;
}

interface IUploadReport {
    uploaded: UploadFileRes[];
    addFails: File[];
    uploadFails: IUploadFail[]; // keys
}

interface IUploadResult {
    success: boolean;
    report: IUploadReport;
}

type TUpload = (f: File[]) => Promise<IUploadResult>;

/**
 * addFile:     tells BE to allocate space for this and returns cdnUrl to upload to
 * removeFile:  tells BE to de-allocate space (e.g. on unsuccessful update)
 */
interface UseGeneralUploaderMethods {
    addFile: (f: File) => Promise<WithError<AddFileRes>>;
    removeFile: (key: string) => void;
}

/**
 * onAddFail:       `addFile` failed for one file
 * onUploadFail:    `uploadFile` failed for one file
 */
interface UseGeneralUploaderHandlers {
    onAddFail?: (f: File) => void;
    onUploadFail?: (f: IUploadFail) => void;
    onIntervalChange?: (i: number) => void;
    onProgressUpdate?: (p: IUploadProgress) => void;

    onReconnect?: VoidFunction;
}

export type {
    OrUndefined,
    // ...
    AddFileRes,
    UploadFileRes,
    IUploadFail,
    // ...
    TStep0Cb,
    TStep1Cb,
    // ...
    TUpload,
    // ...
    IUploadReport,
    IUploadResult,
    // ...
    UseGeneralUploaderMethods,
    UseGeneralUploaderHandlers,
};

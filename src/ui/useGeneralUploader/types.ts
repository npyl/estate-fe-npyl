interface AddFileRes {
    key: string;
    url: string; // amazon to PUT image
    cdnUrl: string; // where image **WILL** be downloadable from when PUT finishes
}
interface UploadResponse {
    key: string;
    cdnUrl: string;
}

type WithError<T> = { data: T } | { error: any };
type OrUndefined<T> = T | undefined;

type TStep0Cb = <Res extends AddFileRes = AddFileRes>(
    f: File
) => Promise<OrUndefined<Res>>;

type TStep1Cb = (
    f: OrUndefined<File>,
    res: AddFileRes
) => Promise<OrUndefined<UploadResponse>>;

// ---------------------------------------------------------------------------------------------------------------------------

interface IUploadProgress {
    key: string;
    p: number;
}

// ---------------------------------------------------------------------------------------------------------------------------

interface IUploadReport {
    uploaded: UploadResponse[];
    addFails: File[];
    uploadFails: string[]; // keys
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
    onUploadFail?: (key: string) => void;
    onProgressUpdate?: (p: IUploadProgress) => void;
}

export type {
    OrUndefined,
    // ...
    AddFileRes,
    UploadResponse,
    // ...
    TStep0Cb,
    TStep1Cb,
    // ...
    TUpload,
    // ...
    IUploadResult,
    // ...
    UseGeneralUploaderMethods,
    UseGeneralUploaderHandlers,
};

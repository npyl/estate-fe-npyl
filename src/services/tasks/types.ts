interface IAddAttachmentReq {
    card?: number;
    contentType: string;
    filename: string;
    size: number;
}

interface IAddAttachmentRes {
    cdnUrl: string;
    contentType: string;
    filename: string;
    id: number;
    url: string;
}

export type { IAddAttachmentReq, IAddAttachmentRes };

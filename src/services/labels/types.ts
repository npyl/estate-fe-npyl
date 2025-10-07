import { ILabelPOST, LabelResourceType } from "@/types/label";

type InvalidateTagsMetadata = Partial<{
    cardId: number;
}>;

interface LabelForResourceProps {
    resourceId: number;
    resource: LabelResourceType;
    body: ILabelPOST;
}

interface DeleteLabelProps {
    resource: LabelResourceType;
    resourceId: number;
    labelId: number;
}

interface ILabelForResourceReq {
    resourceId?: number;
    resource: LabelResourceType;
    body: ILabelPOST;
}

interface IAssignLabelToResourceReq extends Required<ILabelForResourceReq> {}

interface ILabelForResourceRes {
    id: number;
}

interface IDeleteLabelForResourceReq {
    resource: LabelResourceType;
    labelId: number;
}

export type {
    InvalidateTagsMetadata,
    // ...
    LabelForResourceProps,
    IAssignLabelToResourceReq,
    DeleteLabelProps,
    ILabelForResourceReq,
    ILabelForResourceRes,
    IDeleteLabelForResourceReq,
};

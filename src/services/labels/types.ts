import { ILabelPOST, LabelResourceType } from "@/types/label";

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

interface GetLabelForResourceReq {
    resource: LabelResourceType;
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
    LabelForResourceProps,
    IAssignLabelToResourceReq,
    DeleteLabelProps,
    GetLabelForResourceReq,
    ILabelForResourceReq,
    ILabelForResourceRes,
    IDeleteLabelForResourceReq,
};

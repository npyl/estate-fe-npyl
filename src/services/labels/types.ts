import { ILabelPOST, LabelResourceType } from "@/types/label";

interface LabelForResourceProps {
    resourceId: number;
    resource: LabelResourceType;
    body: ILabelPOST;
}
type AssignLabelProps = LabelForResourceProps;

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

interface ILabelForResourceRes {
    id: number;
}

interface IDeleteLabelForResourceReq {
    resource: LabelResourceType;
    labelId: number;
}

export type {
    LabelForResourceProps,
    AssignLabelProps,
    DeleteLabelProps,
    ILabelForResourceReq,
    ILabelForResourceRes,
    IDeleteLabelForResourceReq,
};

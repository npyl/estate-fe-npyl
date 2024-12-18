import { ILabelPOST, LabelResourceType } from "@/types/label";

interface ILabelForm extends ILabelPOST {
    resource: LabelResourceType;
    resourceId?: number;
}

export type { ILabelForm };

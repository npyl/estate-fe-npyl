import { ILabel, LabelResourceType } from "src/types/label";

export interface IEditProps extends ILabel {
    resource: LabelResourceType;
}

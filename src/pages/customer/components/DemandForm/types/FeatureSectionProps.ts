import { IPropertyFeatures } from "src/types/features";

export interface IFeatureSectionProps {
    features: IPropertyFeatures;
    onChange: (key: string, checked: boolean) => void;
}

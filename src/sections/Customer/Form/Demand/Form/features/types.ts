import { IPriorityFeatures } from "@/types/demand";

export interface IFeatureSectionProps {
    features: IPriorityFeatures;
    onChange: (key: string, checked: boolean) => void;
}

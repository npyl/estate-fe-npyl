import { IPropertyImage } from "@/types/file";
import { TListingTab } from "../../types";
import { TwoDimentionsDndNode } from "@/components/TwoDimentionsDnd/types";

type Ops = {
    publicImages: TwoDimentionsDndNode[];
    privateImages: TwoDimentionsDndNode[];
    isLoading: boolean;
    handleDragEnd: any;
};

type TUseContentOperations = (
    tab: TListingTab,
    createItemCb: (f: IPropertyImage, index: number) => TwoDimentionsDndNode
) => Ops;

export default TUseContentOperations;

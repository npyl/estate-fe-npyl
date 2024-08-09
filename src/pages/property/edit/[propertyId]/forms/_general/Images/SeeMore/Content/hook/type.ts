import { IPropertyImage } from "@/types/file";
import { TListingTab } from "../../types";
import { TwoDimentionsDndNode } from "@/components/TwoDimentionsDnd/types";
import { DropResult } from "react-beautiful-dnd";

export interface ExtendedDropResult extends DropResult {
    columns: number;
}

type Ops = {
    publicImages: TwoDimentionsDndNode[];
    privateImages: TwoDimentionsDndNode[];
    isLoading: boolean;
    handleDragEnd: (r: ExtendedDropResult) => void;
};

type TUseContentOperations = (
    tab: TListingTab,
    createItemCb: (f: IPropertyImage, index: number) => TwoDimentionsDndNode
) => Ops;

export default TUseContentOperations;

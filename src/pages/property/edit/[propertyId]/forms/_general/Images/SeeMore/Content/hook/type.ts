import { IPropertyImage } from "@/types/file";
import { TListingTab } from "../../types";
import { DndItem } from "../PreviewReorder/types";

type Ops = {
    publicImages: DndItem[];
    privateImages: DndItem[];
    isLoading: boolean;
    handleDragEnd: any;
};

type TUseContentOperations = (
    tab: TListingTab,
    createItemCb: (f: IPropertyImage, index: number) => DndItem
) => Ops;

export default TUseContentOperations;

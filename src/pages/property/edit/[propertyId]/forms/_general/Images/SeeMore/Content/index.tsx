import { IPropertyImage } from "@/types/file";
import { DndItem } from "./PreviewReorder/types";
import { TListingTab } from "../types";
import DropZone from "./DropZone";
import Over25ImagesPreview from "./PreviewReorder/Over25";
import useContentOperations from "./hook";

const COLUMNS = 5;

interface ContentProps {
    tab: TListingTab;
    createItemCb: (f: IPropertyImage, index: number) => DndItem;
}

const Content: React.FC<ContentProps> = ({ tab, createItemCb }) => {
    const { publicImages, privateImages, handleDragEnd, isLoading } =
        useContentOperations(tab, createItemCb);

    // TODO: see if this can become responsive
    // TODO: see how to disable dropzone for other tabs

    return (
        <DropZone>
            <Over25ImagesPreview
                loading={isLoading}
                publicImages={publicImages}
                privateImages={privateImages}
                columns={COLUMNS}
                onDragEnd={handleDragEnd}
            />
        </DropZone>
    );
};

export default Content;

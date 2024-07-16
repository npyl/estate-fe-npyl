import DownloadButton from "./DownloadButton";
import Image from "../image/Image";
import PreviewImage from "../image/PreviewImage";
import { IPropertyFile } from "../upload";

// ----------------------------------------------------------------------

type FileIconProps = {
    file: IPropertyFile;
    onDownload?: VoidFunction;
};

export default function FileThumbnail({ file, onDownload }: FileIconProps) {
    const renderContent = file.url ? (
        <Image src={file.url} />
    ) : (
        <PreviewImage animate />
    );

    return (
        <>
            {renderContent}
            {onDownload && <DownloadButton onDownload={onDownload} />}
        </>
    );
}

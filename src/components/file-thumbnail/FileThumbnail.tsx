import Image from "../image/Image";
import PreviewImage from "../image/PreviewImage";
import { IPropertyFile } from "../upload";

// ----------------------------------------------------------------------

type FileIconProps = {
    file: IPropertyFile;
};

const FileThumbnail = ({ file }: FileIconProps) =>
    file.url ? <Image src={file.url} /> : <PreviewImage animate />;

export default FileThumbnail;

import BaseImage from "@/components/image/Image/BaseImage";
import PreviewImage from "../image/PreviewImage";
import { TUploadFile } from "../upload";
import { CSSProperties } from "react";

const STYLE: CSSProperties = { height: "45px", width: "45px" };

type FileIconProps = {
    file: TUploadFile;
};

const FileThumbnail = ({ file }: FileIconProps) =>
    file.url ? (
        <BaseImage src={file.url} style={STYLE} />
    ) : (
        <PreviewImage animate style={STYLE} />
    );

export default FileThumbnail;

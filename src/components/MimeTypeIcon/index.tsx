import { FC, useMemo } from "react";
import getMimeTypeInfo from "./getMimeTypeInfo";

interface MimeTypeIconProps {
    mimeType: string;
}

const MimeTypeIcon: FC<MimeTypeIconProps> = ({ mimeType, ...props }) => {
    const { Icon, color } = useMemo(
        () => getMimeTypeInfo(mimeType),
        [mimeType]
    );

    return <Icon style={{ color }} {...props} />;
};

export default MimeTypeIcon;

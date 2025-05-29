import { FC, useCallback } from "react";
import { Download } from "@mui/icons-material";
import RoundIconButton, {
    RoundIconButtonProps,
} from "@/components/RoundIconButton";

interface DownloadButtonProps
    extends Omit<RoundIconButtonProps, "sx" | "onClick"> {
    url: string;
    filename: string;
}

const DownloadButton: FC<DownloadButtonProps> = ({
    url,
    filename,
    ...props
}) => {
    const onClick = useCallback(() => {
        // Create a temporary anchor element to trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;

        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [url, filename]);

    return (
        <RoundIconButton size="small" onClick={onClick} {...props}>
            <Download fontSize="small" />
        </RoundIconButton>
    );
};

export default DownloadButton;

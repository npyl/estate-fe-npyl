import GoogleEarthIcon from "@/assets/logo/GoogleEarth";
import { errorToast } from "@/components/Toaster";
import { IPropertyFile } from "@/types/file";
import IconButton from "@mui/material/IconButton";
import { FC, useCallback } from "react";

interface Props {
    googleEarth: IPropertyFile;
}

const DownloadButton: FC<Props> = ({ googleEarth }) => {
    const handleDownload = useCallback(() => {
        if (!googleEarth?.url) {
            errorToast("GOOGLE_EARTH_FAULTY_URL");
            return;
        }

        window.open(googleEarth.url, "_blank");
    }, [googleEarth?.url]);

    return (
        <IconButton onClick={handleDownload}>
            <GoogleEarthIcon width={20} height={20} />
        </IconButton>
    );
};

export default DownloadButton;

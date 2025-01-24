import GoogleEarthIcon from "@/assets/logo/GoogleEarth";
import { SpaceBetween } from "@/components/styled";
import { IPropertyFile } from "@/types/file";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, useCallback } from "react";

interface ItemProps {
    googleEarth: IPropertyFile;
}

const Item: FC<ItemProps> = ({ googleEarth }) => {
    const handleDownload = useCallback(() => {}, []);

    return (
        <SpaceBetween alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
                <GoogleEarthIcon width={50} height={50} />

                <Typography ml={1} variant="subtitle2">
                    {googleEarth.filename}
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
                <IconButton onClick={handleDownload}>
                    <DownloadIcon />
                </IconButton>
            </Stack>
        </SpaceBetween>
    );
};

export default Item;

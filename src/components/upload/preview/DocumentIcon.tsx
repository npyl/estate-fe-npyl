import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { SvgIconProps } from "@mui/material/SvgIcon";
import DocumentSvg from "src/assets/Document";

interface DocumentIconProps extends SvgIconProps {
    isPreview: boolean;
}

const DocumentIcon = ({ isPreview, ...other }: DocumentIconProps) => (
    <Stack
        position="relative"
        alignItems="center"
        justifyContent="center"
        maxWidth="max-content"
    >
        <DocumentSvg {...other} />

        {isPreview ? (
            <CircularProgress
                size={20}
                sx={{
                    position: "absolute",
                }}
            />
        ) : null}
    </Stack>
);

export default DocumentIcon;

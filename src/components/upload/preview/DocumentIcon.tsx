import CircularProgress from "@mui/material/CircularProgress";
import { SvgIconProps } from "@mui/material/SvgIcon";
import DocumentSvg from "src/assets/Document";

interface DocumentIconProps extends SvgIconProps {
    isPreview: boolean;
}

export const DocumentIcon = ({ isPreview, ...other }: DocumentIconProps) => {
    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <DocumentSvg {...other} />
            {isPreview && (
                <CircularProgress
                    sx={{
                        position: "absolute",
                        top: "calc(50% - 20px)",
                        left: "calc(50% - 20px)",
                        transform: "translate(-50%, -50%)",
                    }}
                />
            )}
        </div>
    );
};

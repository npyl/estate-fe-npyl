import CircularProgress from "@mui/material/CircularProgress";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { createSvgIcon } from "@mui/material/utils";

// First, create the icon with createSvgIcon
const DocumentSvg = createSvgIcon(
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M6 2H14L20 8V22C20 23.1 19.1 24 18 24H6C4.9 24 4 23.1 4 22V4C4 2.9 4.9 2 6 2Z"
            fill="currentColor"
        />
        <path d="M13 9V3.5L18.5 9H13Z" fill="currentColor" />
    </svg>,
    "DocumentIcon"
);

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

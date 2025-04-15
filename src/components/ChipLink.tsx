import Link from "@/components/Link";
import { SxProps, Theme } from "@mui/material";
import Chip, { ChipProps } from "@mui/material/Chip";
import { forwardRef, useCallback } from "react";

const Sx: SxProps<Theme> = {
    "& .MuiChip-label:hover": {
        cursor: "pointer",
        textDecoration: "underline",
    },
    cursor: "default",
};

interface ChipLinkProps extends ChipProps {
    href: string;
}

const ChipLink = forwardRef<HTMLAnchorElement, ChipLinkProps>(
    ({ href, onDelete, sx, ...props }, ref) => {
        const handleDelete = useCallback(
            (e: Event) => {
                e.preventDefault();
                onDelete?.(e);
            },
            [onDelete]
        );

        const deleteCb = onDelete ? handleDelete : undefined;

        return (
            <Link
                ref={ref}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Chip onDelete={deleteCb} sx={{ ...Sx, ...sx }} {...props} />
            </Link>
        );
    }
);

ChipLink.displayName = "ChipLink";

export type { ChipLinkProps };
export default ChipLink;

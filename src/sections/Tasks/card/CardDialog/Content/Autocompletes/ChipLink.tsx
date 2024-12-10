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

        return (
            <Link ref={ref} href={href}>
                <Chip
                    onDelete={handleDelete}
                    sx={{ ...Sx, ...sx }}
                    {...props}
                />
            </Link>
        );
    }
);

ChipLink.displayName = "ChipLink";

export default ChipLink;

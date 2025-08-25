import { FC, useMemo } from "react";
import { LinkProps } from "@/components/Link";
import { BlogPostShort } from "@/types/company";
import Image from "@/components/image";
import { StyledLink } from "./PropertyCard/styled";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material";
import { SpaceBetween } from "@/components/styled";
import Avatar from "@/components/Avatar";

interface CreatedAtProps {
    createdAt: string;
}

const CreatedAt: FC<CreatedAtProps> = ({ createdAt }) => {
    const formattedDate = useMemo(() => {
        const date = new Date(createdAt);
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return date.toLocaleDateString("en-US", options);
    }, [createdAt]);

    return (
        <Typography variant="body2" color="text.secondary">
            {formattedDate}
        </Typography>
    );
};

// -------------------------------------------------------------------

const LinkSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    gap: 1,
};

type PropertyCardProps = {
    item: BlogPostShort;
} & Omit<LinkProps, "href">;

const PropertyCard: FC<PropertyCardProps> = ({
    item,
    sx,
    children,
    ...props
}) => {
    const { id, thumbnail, createdAt, user } = item || {};

    const title = "TEMP";

    return (
        <StyledLink
            href={`/blog/${id}`}
            sx={{ ...LinkSx, ...sx }}
            {...(props as any)}
        >
            <Image
                aspectRatio="4/3"
                style={{ height: "300px", width: "30%", objectFit: "contain" }}
                src={thumbnail}
            />

            <Stack width={1} p={2} justifyContent="space-between">
                <Typography variant="h6" textAlign="center">
                    {title}
                </Typography>

                <SpaceBetween>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar
                            src={user?.avatar}
                            firstName={user?.firstName}
                            lastName={user?.lastName}
                        />
                        <CreatedAt createdAt={createdAt} />
                    </Stack>
                </SpaceBetween>
            </Stack>

            {children}
        </StyledLink>
    );
};

export default PropertyCard;

import { IProperties, IPropertyResultResponse } from "@/types/properties";
import { Divider, Stack } from "@mui/material";
import { FC } from "react";
import { DividerSx, StyledLink } from "../styled";
import { LinkProps } from "@/components/Link";
import Carousel from "../_shared/Carousel";
import Badges from "../_shared/Badges";
import Address from "../_shared/Address";
import Info from "./Info";

type PropertyCardProps = {
    item: IPropertyResultResponse | IProperties;
} & Omit<LinkProps, "href" | "horizontal">;

// -------------------------------------------------------------

const CAROUSEL_WIDTH = "35%"; // INFO: this is a width that works well

const PropertyCard: FC<PropertyCardProps> = ({ item, ...props }) => {
    const { id, images = [] } = item || {};

    return (
        <StyledLink
            horizontal
            // ...
            isActive={false}
            href={`/property/${id}`}
            {...(props as any)}
        >
            <Carousel
                images={images}
                isActive={item.active}
                sx={{ width: CAROUSEL_WIDTH }}
            />

            <Stack
                p={2}
                spacing={2}
                justifyContent="space-around"
                width={`calc(100% - ${CAROUSEL_WIDTH})`}
            >
                <Address item={item} />
                <Divider sx={DividerSx} />
                <Info item={item} />
                <Divider sx={DividerSx} />
                <Badges item={item} />
            </Stack>
        </StyledLink>
    );
};

export default PropertyCard;

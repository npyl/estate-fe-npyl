import { IProperties, IPropertyResultResponse } from "@/types/properties";
import { Divider, Stack } from "@mui/material";
import { FC } from "react";
import { DividerSx, StyledLink } from "../styled";
import { LinkProps } from "@/components/Link";
import Address from "../_shared/Address";
import Badges from "../_shared/Badges";
import Carousel from "../_shared/Carousel";
import Info from "./Info";

type PropertyCardProps = {
    item: IPropertyResultResponse | IProperties;
} & Omit<LinkProps, "href" | "horizontal">;

const PropertyCard: FC<PropertyCardProps> = ({ item, ...props }) => {
    const { id, images = [] } = item || {};

    return (
        <StyledLink
            isActive={false}
            href={`/property/${id}`}
            {...(props as any)}
        >
            <Carousel images={images} ratio="4/3" isActive={item.active} />
            <Stack p={2} spacing={0.8}>
                <Info item={item} />
                <Address item={item} />
                <Divider sx={DividerSx} />
                <Badges item={item} />
            </Stack>
        </StyledLink>
    );
};

export default PropertyCard;

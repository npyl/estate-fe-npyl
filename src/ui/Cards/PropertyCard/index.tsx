import { IProperties, IPropertyResultResponse } from "@/types/properties";
import { Divider, Stack } from "@mui/material";
import { FC } from "react";
import { DividerSx, StyledLink } from "./styled";
import { LinkProps } from "@/components/Link";
import Address from "./_shared/Address";
import Badges from "./_shared/Badges";
import Carousel from "./_shared/Carousel";
import Info from "./Normal/Info";
import InfoH from "./Horizontal/Info";

const CAROUSEL_WIDTH = "35%"; // INFO: this is a width that works well

const getCarouselSx = (horizontal: boolean) => ({
    width: horizontal ? CAROUSEL_WIDTH : 1,
});

const getCommonWidth = (horizontal: boolean) =>
    horizontal ? `calc(100% - ${CAROUSEL_WIDTH})` : 1;

const getCommonSpacing = (horizontal: boolean) => (horizontal ? 0.8 : 2);

const getJustifyContent = (horizontal: boolean) =>
    horizontal ? "space-around" : undefined;

interface CommonProps {
    item: IPropertyResultResponse | IProperties;
    horizontal: boolean;
}

const Common: FC<CommonProps> = ({ item, horizontal }) => (
    <Stack
        p={2}
        spacing={getCommonSpacing(horizontal)}
        width={getCommonWidth(horizontal)}
        justifyContent={getJustifyContent(horizontal)}
    >
        {!horizontal ? <Info item={item} /> : null}
        <Address item={item} />
        {horizontal ? <Divider sx={DividerSx} /> : null}
        {horizontal ? <InfoH item={item} /> : null}
        <Divider sx={DividerSx} />
        <Badges item={item} />
    </Stack>
);

type PropertyCardProps = {
    item: IPropertyResultResponse | IProperties;
    horizontal?: boolean;
} & Omit<LinkProps, "href">;

const PropertyCard: FC<PropertyCardProps> = ({
    item,
    horizontal = false,
    ...props
}) => {
    const { id, images = [] } = item || {};

    return (
        <StyledLink
            horizontal={horizontal}
            // ...
            isActive={false}
            href={`/property/${id}`}
            // ...
            {...(props as any)}
        >
            <Carousel
                images={images}
                isActive={item.active}
                sx={getCarouselSx(horizontal)}
            />

            <Common item={item} horizontal={horizontal} />
        </StyledLink>
    );
};

export default PropertyCard;

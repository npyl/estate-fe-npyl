import { Stack, Typography } from "@mui/material";
import { ListingTypes } from "src/types/listings";
import { LabeledSwitch } from "./Switch";
import SpitogatosSvg from "src/assets/SpitogatosSvg";
import RightMoveIcon from "src/assets/RightMoveIcon";
import FerimmoIcon from "@/assets/ferimmo";
import PlotGRIcon from "src/assets/plotgr";
import XEIcon from "src/assets/xrysh_eukairia";
import JamesEditionIcon from "@/assets/james_edition";
import { spitogatosListing } from "@/services/listings";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

type LISTING_STATIC_DATUM = {
    text: string;
    icon: JSX.Element;
    publish: any;
    unpublish: any;
};

const getSTATIC_DATA = (
    propertyId: number
): Record<ListingTypes, LISTING_STATIC_DATUM> => ({
    SPITOGATOS: {
        icon: <SpitogatosSvg width={36} height={36} />,
        text: "Spitogatos.gr",
        publish:
            spitogatosListing.endpoints.addSpitogatosListing.initiate(
                propertyId
            ),
        unpublish:
            spitogatosListing.endpoints.removeSpitogatosListing.initiate(
                propertyId
            ),
    },
    PLOT_GR: {
        icon: <PlotGRIcon width={30} height={30} />,
        text: "plot.gr",
        publish: () => {},
        unpublish: () => {},
    },
    JAMES_EDITION: {
        icon: <JamesEditionIcon width={30} height={30} />,
        text: "jamesedition.com",
        publish: () => {},
        unpublish: () => {},
    },
    XE: {
        icon: <XEIcon width={30} height={30} />,
        text: "xe.gr",
        publish: () => {},
        unpublish: () => {},
    },
    RIGHT_MOVE: {
        icon: <RightMoveIcon width={30} height={30} />,
        text: "rightmove.co.uk",
        publish: () => {},
        unpublish: () => {},
    },
    FERIMMO: {
        icon: <FerimmoIcon width={30} height={30} />,
        text: "ferimmo.de",
        publish: () => {},
        unpublish: () => {},
    },
});

interface ListingCardProps {
    label: ListingTypes;
    value: boolean;
    onClick: () => void;
}

const ListingCard = ({ label, value, onClick }: ListingCardProps) => {
    const dispatch = useDispatch();

    const router = useRouter();
    const { propertyId } = router.query;

    const STATIC_DATA = useMemo(() => getSTATIC_DATA(+propertyId!), []);

    const handleChange = async (_: any, b: boolean) => {
        const d = STATIC_DATA[label];

        if (b) await dispatch(d.unpublish());
        else await dispatch(d.publish());

        onClick();
    };

    return (
        <Stack direction="row" minWidth="400px" justifyContent="space-between">
            <Stack direction="row" spacing={1} alignItems="center">
                {STATIC_DATA[label].icon}

                <Typography>{STATIC_DATA[label].text}</Typography>
            </Stack>

            <LabeledSwitch
                checked={value}
                labelOn="Published"
                labelOff="Unpublished"
                onChange={handleChange}
                name="checkedA"
            />
        </Stack>
    );
};

export default ListingCard;

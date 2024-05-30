import { Stack, Typography } from "@mui/material";
import { IntegrationSite } from "src/types/listings";
import { LabeledSwitch } from "./Switch";
import SpitogatosSvg from "src/assets/SpitogatosSvg";
import RightMoveIcon from "src/assets/RightMoveIcon";
import FerimmoIcon from "@/assets/ferimmo";
import PlotGRIcon from "src/assets/plotgr";
import XEIcon from "src/assets/xrysh_eukairia";
import JamesEditionIcon from "@/assets/james_edition";
import { spitogatosListing } from "@/services/listings";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Iconify from "@/components/iconify";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";
import Item from "./styled";

// -------------------------------------------------------

const LoadingIconButton = styled(LoadingButton)({
    "& .MuiButton-startIcon": {
        marginRight: "0px",
    },
});

// -------------------------------------------------------

const useCooldown = (): [boolean, VoidFunction] => {
    const [cooldown, setCooldown] = useState(false);

    const startCooldown = useCallback(() => {
        setCooldown(true);

        // Automatically stop cooldown after 1 minute
        setTimeout(() => {
            setCooldown(false);
        }, 60000);
    }, []);

    return [cooldown, startCooldown];
};

// -------------------------------------------------------

type LISTING_STATIC_DATUM = {
    text: string;
    icon: JSX.Element;
    publish: any;
    unpublish: any;
    sync?: any;
};

const getSTATIC_DATA = (
    propertyId: number
): Record<IntegrationSite, LISTING_STATIC_DATUM> => ({
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
        sync: spitogatosListing.endpoints.syncSpitogatosListing.initiate(
            propertyId
        ),
    },
    PLOT_GR: {
        icon: <PlotGRIcon width={30} height={30} />,
        text: "plot.gr",
        publish: () => {},
        unpublish: () => {},
        // sync: () => {},
    },
    JAMES_EDITION: {
        icon: <JamesEditionIcon width={30} height={30} />,
        text: "jamesedition.com",
        publish: () => {},
        unpublish: () => {},
        // sync: () => {},
    },
    XE: {
        icon: <XEIcon width={30} height={30} />,
        text: "xe.gr",
        publish: () => {},
        unpublish: () => {},
        // sync: () => {},
    },
    RIGHT_MOVE: {
        icon: <RightMoveIcon width={30} height={30} />,
        text: "rightmove.co.uk",
        publish: () => {},
        unpublish: () => {},
        // sync: () => {},
    },
    FERIMMO: {
        icon: <FerimmoIcon width={30} height={30} />,
        text: "ferimmo.de",
        publish: () => {},
        unpublish: () => {},
        // sync: () => {},
    },
});

// -------------------------------------------------------

interface ListingCardProps {
    label: IntegrationSite;
    value: boolean;
    onClick: () => void;
}

const ListingCard = ({ label, value, onClick }: ListingCardProps) => {
    const dispatch = useDispatch();

    const router = useRouter();
    const { propertyId } = router.query;

    const STATIC_DATA = useMemo(() => getSTATIC_DATA(+propertyId!), []);

    const [isSyncLoading, setSyncLoading] = useState(false);
    const [cooldown, startCooldown] = useCooldown();

    const handleChange = async (_: any, b: boolean) => {
        const d = STATIC_DATA[label];

        if (b) await dispatch(d.unpublish);
        else await dispatch(d.publish);

        onClick();
    };

    const handleSync = async () => {
        setSyncLoading(true);
        await dispatch(STATIC_DATA[label].sync);
        startCooldown();
        setSyncLoading(false);
    };

    return (
        <Item>
            <Stack direction="row" spacing={1} alignItems="center">
                {STATIC_DATA[label].icon}
                <Typography>{STATIC_DATA[label].text}</Typography>
            </Stack>

            <Stack
                direction={{ xs: "column", md: "row" }}
                gap={1}
                alignItems="center"
            >
                <LabeledSwitch
                    checked={value}
                    labelOn="Published"
                    labelOff="Unpublished"
                    onChange={handleChange}
                    name="checkedA"
                />

                {STATIC_DATA[label].sync ? (
                    <LoadingIconButton
                        color="info"
                        variant="contained"
                        loading={isSyncLoading}
                        disabled={isSyncLoading || cooldown}
                        onClick={handleSync}
                        startIcon={
                            <Iconify
                                icon="material-symbols-light:sync"
                                width={30}
                                height={30}
                            />
                        }
                    />
                ) : null}
            </Stack>
        </Item>
    );
};

export default ListingCard;

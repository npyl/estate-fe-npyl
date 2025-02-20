import { Stack, Typography } from "@mui/material";
import { IntegrationSite } from "src/types/listings";
import { LabeledSwitch } from "./Switch";
import SpitogatosSvg from "@/assets/integrations/SpitogatosSvg";
import RightMoveIcon from "@/assets/integrations/RightMoveIcon";
import FerimmoIcon from "@/assets/integrations/ferimmo";
import PlotGRIcon from "@/assets/integrations/plotgr";
import XEIcon from "@/assets/integrations/xrysh_eukairia";
import JamesEditionIcon from "@/assets/integrations/james_edition";
import { generalListing } from "@/services/listings";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Iconify from "@/components/iconify";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";
import Item from "./styled";
import { useTranslation } from "react-i18next";
import useInvalidateTags from "./useInvalidateTags";

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

// ---------------------------------------------------------------------------

const getFROM_GENERAL = (propertyId: number, site: IntegrationSite) => ({
    publish: generalListing.endpoints.addGeneralListing.initiate({
        propertyId,
        site,
    }),
    unpublish: generalListing.endpoints.removeGeneralListing.initiate({
        propertyId,
        site,
    }),
    sync: generalListing.endpoints.syncGeneralListing.initiate({
        propertyId,
        site,
    }),
});

// ---------------------------------------------------------------------------

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
        ...getFROM_GENERAL(propertyId, "SPITOGATOS"),
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
        ...getFROM_GENERAL(propertyId, "JAMES_EDITION"),
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
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { invalidateTags } = useInvalidateTags();

    const router = useRouter();
    const { propertyId } = router.query;

    const STATIC_DATA = useMemo(() => getSTATIC_DATA(+propertyId!), []);

    const [isSyncLoading, setSyncLoading] = useState(false);
    const [cooldown, startCooldown] = useCooldown();

    const handleChange = async (_: any, b: boolean) => {
        const d = STATIC_DATA[label];

        if (b) await dispatch(d.unpublish);
        else await dispatch(d.publish);
        invalidateTags();

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
                    labelOff={t("Unpublished")}
                    onChange={handleChange}
                />

                {STATIC_DATA[label].sync ? (
                    <LoadingIconButton
                        color="info"
                        variant="contained"
                        loading={isSyncLoading}
                        disabled={isSyncLoading || cooldown}
                        onClick={handleSync}
                        sx={{ width: "30px", height: "34px" }}
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

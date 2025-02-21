import useDialog from "@/hooks/useDialog";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import ShareIcon from "@mui/icons-material/Share";
import { useRouter } from "next/router";
import { useGetPropertyListingsQuery } from "@/services/properties";
import { toNumberSafe } from "@/utils/toNumber";
import DisabledShareButton from "./DisabledShareButton";
const SharePopover = dynamic(() => import("@/components/Share"));

// TODO: update this to handle properties that are:
// 1. published on a different public

const getShareUrl = (lang: string) => (propertyId: number) =>
    `https://www.kopanitsanos.gr/${lang}/property-detail/${propertyId}`;

const ShareButton = () => {
    const { t, i18n } = useTranslation();

    const anchorRef = useRef(null);
    const [isOpen, openPopover, closePopover] = useDialog();

    const router = useRouter();
    const { propertyId } = router.query;
    const { data: listings } = useGetPropertyListingsQuery(+propertyId!);

    const hasPublic = useMemo(
        () => listings?.publicSites?.some(({ published }) => published),
        [listings?.publicSites]
    );

    const lang = i18n.language === "en" ? "en" : "gr";
    const iPropertyId = toNumberSafe(propertyId);
    const shareUrls = [getShareUrl(lang)(iPropertyId)];

    return (
        <>
            {!hasPublic ? (
                <DisabledShareButton title={t("Property is not public")} />
            ) : null}

            {hasPublic ? (
                <Tooltip title={t("Share")}>
                    <IconButton ref={anchorRef} onClick={openPopover}>
                        <ShareIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            ) : null}

            {isOpen && iPropertyId !== -1 ? (
                <SharePopover
                    anchorEl={anchorRef.current}
                    onClose={closePopover}
                    shareUrls={shareUrls}
                />
            ) : null}
        </>
    );
};

export default ShareButton;

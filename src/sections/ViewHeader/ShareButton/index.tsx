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

const ShareButton = () => {
    const { t } = useTranslation();

    const anchorRef = useRef(null);
    const [isOpen, openPopover, closePopover] = useDialog();

    const router = useRouter();
    const { propertyId } = router.query;
    const { data: listings } = useGetPropertyListingsQuery(+propertyId!);

    const hasPublic = useMemo(
        () => listings?.publicSites?.some(({ published }) => published),
        [listings?.publicSites]
    );

    const iPropertyId = toNumberSafe(propertyId);

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

            {isOpen ? (
                <SharePopover
                    anchorEl={anchorRef.current}
                    onClose={closePopover}
                    propertyIds={[iPropertyId]}
                />
            ) : null}
        </>
    );
};

export default ShareButton;

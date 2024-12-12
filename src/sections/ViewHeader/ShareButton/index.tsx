import useDialog from "@/hooks/useDialog";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import ShareIcon from "@mui/icons-material/Share";
import { SvgIcon } from "@mui/material";
import { useRouter } from "next/router";
import { useGetPropertyListingsQuery } from "@/services/properties";

const SharePopover = dynamic(() => import("@/components/Share"));

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

    const lang = i18n.language === "el" ? "gr" : "en";

    const shareUrl = `https://www.kopanitsanos.gr/${lang}/property-detail/${propertyId}`;

    return (
        <>
            {!hasPublic ? (
                <Tooltip title={t("Property is not public")}>
                    <IconButton>
                        <SvgIcon>
                            <ShareIcon color="disabled" />
                            <path
                                d="M22 2L2 22"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </SvgIcon>
                    </IconButton>
                </Tooltip>
            ) : null}

            {hasPublic ? (
                <IconButton ref={anchorRef} onClick={openPopover}>
                    <ShareIcon fontSize="small" />
                </IconButton>
            ) : null}

            {isOpen ? (
                <SharePopover
                    anchorEl={anchorRef.current}
                    onClose={closePopover}
                    shareUrl={shareUrl}
                />
            ) : null}
        </>
    );
};

export default ShareButton;

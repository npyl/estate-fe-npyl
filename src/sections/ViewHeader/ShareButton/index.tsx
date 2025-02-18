import useDialog from "@/hooks/useDialog";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import dynamic from "next/dynamic";
import { FC, PropsWithChildren, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import ShareIcon from "@mui/icons-material/Share";
import { SvgIcon } from "@mui/material";
import { useRouter } from "next/router";
import { useGetPropertyListingsQuery } from "@/services/properties";
import { toNumberSafe } from "@/utils/toNumber";

const SharePopover = dynamic(() => import("@/components/Share"));

interface DisabledIconButtonProps extends PropsWithChildren {
    title: string;
}

const DisabledIconButton: FC<DisabledIconButtonProps> = ({
    title,
    children,
}) => (
    <Tooltip title={title}>
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
);

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

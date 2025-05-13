const SharePopover = dynamic(() => import("@/sections/Share"));
import useDialog from "@/hooks/useDialog";
import DisabledShareButton from "@/sections/ViewHeader/ShareButton/Property/DisabledShareButton";
import {
    IPropertyFilterParams,
    useFilterPropertiesQuery,
} from "@/services/properties";
import IconButton from "@mui/material/IconButton";
import dynamic from "next/dynamic";
import { FC, useRef } from "react";
import { useTranslation } from "react-i18next";
import ShareIcon from "@mui/icons-material/Share";

// TODO: update this to handle properties that are:
// 1. published on a different public

const getShareUrl = (lang: string) => (propertyId: number) =>
    `https://www.kopanitsanos.gr/${lang}/property-detail/${propertyId}`;

interface ShareProps {
    selectedRows: number[];
    filters: IPropertyFilterParams;
}

const Share: FC<ShareProps> = ({ selectedRows, filters }) => {
    const { t, i18n } = useTranslation();

    const [isOpen, openPopover, closePopover] = useDialog();
    const anchorRef = useRef<HTMLButtonElement>(null);

    const { data } = useFilterPropertiesQuery(filters);
    const selectedActiveRows =
        data?.content
            ?.filter(
                ({ id, active }) => Boolean(active) && selectedRows.includes(id)
            )
            ?.map(({ id }) => id) || [];
    const lang = i18n.language === "en" ? "en" : "gr";
    const shareUrls = selectedActiveRows.map(getShareUrl(lang));
    const haveRows = selectedActiveRows.length > 0;

    return (
        <>
            {!haveRows ? (
                <DisabledShareButton title={t("_SELECT_ACTIVE_TO_SHARE")} />
            ) : null}

            {haveRows ? (
                <IconButton ref={anchorRef} onClick={openPopover}>
                    <ShareIcon />
                </IconButton>
            ) : null}

            {isOpen ? (
                <SharePopover
                    anchorEl={anchorRef.current}
                    shareUrls={shareUrls}
                    onClose={closePopover}
                />
            ) : null}
        </>
    );
};

export default Share;

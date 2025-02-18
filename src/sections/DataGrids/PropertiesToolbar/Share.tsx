const SharePopover = dynamic(() => import("@/components/Share"));
import useDialog from "@/hooks/useDialog";
import DisabledShareButton from "@/sections/ViewHeader/ShareButton/DisabledShareButton";
import {
    IPropertyFilterParams,
    useFilterPropertiesQuery,
} from "@/services/properties";
import IconButton from "@mui/material/IconButton";
import dynamic from "next/dynamic";
import { FC, useRef } from "react";
import { useTranslation } from "react-i18next";
import ShareIcon from "@mui/icons-material/Share";

interface ShareProps {
    selectedRows: number[];
    filters: IPropertyFilterParams;
}

const Share: FC<ShareProps> = ({ selectedRows, filters }) => {
    const { t } = useTranslation();

    const [isOpen, openPopover, closePopover] = useDialog();
    const anchorRef = useRef<HTMLButtonElement>(null);

    const { data } = useFilterPropertiesQuery(filters);
    const selectedActiveRows =
        data?.content?.filter(
            ({ id, active }) => Boolean(active) && selectedRows.includes(id)
        ) || [];
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
                    propertyIds={selectedRows}
                    onClose={closePopover}
                />
            ) : null}
        </>
    );
};

export default Share;

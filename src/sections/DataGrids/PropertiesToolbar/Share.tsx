const SharePopover = dynamic(() => import("@/components/Share"));
import useDialog from "@/hooks/useDialog";
import {
    IPropertyFilterParams,
    useFilterPropertiesQuery,
} from "@/services/properties";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import dynamic from "next/dynamic";
import { FC, forwardRef, useRef } from "react";

interface ShareProps {
    selectedRows: number[];
    filters: IPropertyFilterParams;
}

const Share: FC<ShareProps> = ({ selectedRows, filters }) => {
    const [isOpen, openPopover, closePopover] = useDialog();
    const anchorRef = useRef<HTMLButtonElement>(null);

    const { data } = useFilterPropertiesQuery(filters);
    const selectedActiveRows = data?.content?.filter(
        ({ id, active }) => Boolean(active) && selectedRows.includes(id)
    );

    return (
        <>
            <IconButton ref={anchorRef} onClick={openPopover}>
                Share
            </IconButton>

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

import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import React, { useState, MouseEvent } from "react";
import dynamic from "next/dynamic";
import { IAgreementShort } from "@/types/agreements";
const SharePopover = dynamic(() => import("@/components/Share"));

interface Props {
    agreement: IAgreementShort;
}

// TODO: share
const ShareButton: React.FC<Props> = ({ agreement }) => {
    // const { variant, lang } = agreement;
    // const inputs = useMemo(() => [flattenObject(agreement)], [agreement]);

    const [anchorEl, setAnchor] = useState<HTMLButtonElement>();

    const openPopover = (e: MouseEvent<HTMLButtonElement>) =>
        setAnchor(e.currentTarget);
    const closePopover = () => setAnchor(undefined);

    return (
        <>
            <IconButton onClick={openPopover}>
                <ShareIcon />
            </IconButton>

            {!!anchorEl ? (
                <SharePopover
                    anchorEl={anchorEl}
                    open={!!anchorEl}
                    shareUrl={window.location.href}
                    onClose={closePopover}
                />
            ) : null}
        </>
    );
};

export default ShareButton;

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import { IAgreement, IAgreementShort } from "@/types/agreements";
import React, { useMemo, useState, MouseEvent } from "react";
import { flattenObject } from "../../Dialogs/PDFEditor/util";
import { useGeneratePDF } from "../../Dialogs/_shared/hook";
import downloadBlob from "@/utils/downloadBlob";
import LoadingIconButton from "@/components/LoadingIconButton";
import dynamic from "next/dynamic";
const SharePopover = dynamic(() => import("@/components/Share"));

// ------------------------------------------------------------

interface CustomButtonProps {
    agreement: IAgreementShort;
}

// TODO: share
const ShareButton: React.FC<CustomButtonProps> = ({ agreement }) => {
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

const ExportButton: React.FC<CustomButtonProps> = ({ agreement }) => {
    return <>TODO</>;

    // const { variant, language, title } = agreement;
    // const inputs = useMemo(() => [flattenObject(agreement)], [agreement]);

    // const { generatePDF, isGenerating } = useGeneratePDF(
    //     variant,
    //     language,
    //     inputs
    // );

    // const handleGenerate = async () => {
    //     const pdf = await generatePDF();
    //     if (!pdf) return;

    //     const blob = new Blob([pdf.buffer], { type: "application/pdf" });

    //     downloadBlob(blob, `${title}.pdf`);
    // };

    // return (
    //     <LoadingIconButton loading={isGenerating} onClick={handleGenerate}>
    //         <DownloadIcon />
    //     </LoadingIconButton>
    // );
};

// ------------------------------------------------------------

interface ControlsProps {
    agreement: IAgreementShort;
    onEdit: VoidFunction;
    onDelete: VoidFunction;
}

const Controls: React.FC<ControlsProps> = ({ agreement, onEdit, onDelete }) => (
    <Stack
        spacing={1}
        direction="row"
        justifyContent="flex-end"
        className="AgreementCardButtons"
    >
        <IconButton onClick={onEdit}>
            <EditIcon />
        </IconButton>
        <ShareButton agreement={agreement} />
        <ExportButton agreement={agreement} />
        <IconButton color="error" onClick={onDelete}>
            <DeleteIcon />
        </IconButton>
    </Stack>
);

export default Controls;

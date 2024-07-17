import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import { IAgreement } from "@/types/agreements";
import React, { useMemo } from "react";
import { flattenObject } from "../../Dialogs/PDFEditor/util";
import { useGeneratePDF } from "../../Dialogs/_shared/hook";
import downloadBlob from "@/utils/downloadBlob";
import LoadingIconButton from "@/components/LoadingIconButton";

// ------------------------------------------------------------

interface CustomButtonProps {
    agreement: IAgreement;
}

// TODO: share
const ShareButton: React.FC<CustomButtonProps> = ({ agreement }) => {
    const { variant, lang } = agreement;
    const inputs = useMemo(() => [flattenObject(agreement)], [agreement]);

    const handleShare = () => {};

    return (
        <IconButton onClick={handleShare}>
            <ShareIcon />
        </IconButton>
    );
};

const ExportButton: React.FC<CustomButtonProps> = ({ agreement }) => {
    const { variant, lang, title } = agreement;
    const inputs = useMemo(() => [flattenObject(agreement)], [agreement]);

    const { generatePDF, isGenerating } = useGeneratePDF(variant, lang, inputs);

    const handleGenerate = async () => {
        const pdf = await generatePDF();
        if (!pdf) return;

        const blob = new Blob([pdf.buffer], { type: "application/pdf" });

        downloadBlob(blob, `${title}.pdf`);
    };

    return (
        <LoadingIconButton loading={isGenerating} onClick={handleGenerate}>
            <DownloadIcon />
        </LoadingIconButton>
    );
};

// ------------------------------------------------------------

interface ControlsProps {
    agreement: IAgreement;
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

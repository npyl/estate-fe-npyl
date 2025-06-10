import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";

import {
    Paper,
    Grid,
    Box,
    Divider,
    Typography,
    IconButton,
    Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { Label } from "@/components/Label";
import DocumentIcon from "src/components/upload/preview/DocumentIcon";
import { useGetPropertyByIdQuery } from "src/services/properties";
import { useDownloadDocuments } from "@/services/exports";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { IPropertyDocument } from "@/types/file";
import useDialog from "@/hooks/useDialog";

const downloadBlob = (blob: Blob, propertyCode: string): void => {
    // Convert the blob to a URL
    const blobUrl = URL.createObjectURL(blob);

    // Create an anchor element and attach the blob URL to it
    const anchor = document.createElement("a");
    anchor.href = blobUrl;
    anchor.download = `documents_${propertyCode || "noCode"}.zip`;

    // Append the anchor to the document and trigger a click on it
    document.body.appendChild(anchor);
    anchor.click();

    // Clean up by removing the anchor and revoking the blob URL
    document.body.removeChild(anchor);
    URL.revokeObjectURL(blobUrl);
};

interface DocumentProps {
    d: IPropertyDocument;
}

const Document: FC<DocumentProps> = ({ d }) => {
    const { url, filename, labels } = d;

    const [isOpen, open, close] = useDialog();

    if (!url) return null;

    return (
        <Grid
            item
            sx={{
                border: 1,
                borderRadius: 1,
                p: 2,
            }}
            flex={1}
        >
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                mb={2}
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    width="100%"
                >
                    <DocumentIcon isPreview={false} />

                    <Typography variant="h6">{filename || "N/A"}</Typography>
                    <Box ml={2}>
                        {labels.map(({ id, name, color }) => (
                            <Label key={id} color={color} name={name} />
                        ))}
                    </Box>
                </Box>
                <IconButton>
                    {!isOpen ? <KeyboardArrowDownIcon onClick={open} /> : null}
                    {isOpen ? <KeyboardArrowUpIcon onClick={close} /> : null}
                </IconButton>
            </Box>
            {isOpen ? (
                <iframe
                    src={url}
                    height={500}
                    width={"100%"}
                    style={{
                        border: 0,
                    }}
                />
            ) : null}
        </Grid>
    );
};

const getDocument = (d: IPropertyDocument) => <Document key={d.id} d={d} />;

const Documents: React.FC = () => {
    const { t } = useTranslation();

    const router = useRouter();
    const { propertyId } = router.query;

    const { data: property } = useGetPropertyByIdQuery(+propertyId!);
    const documents = useMemo(() => property?.documents || [], [property]);
    const propertyCode = useMemo(() => property?.code || "", [property]);

    const [downloadDocuments, { isLoading }] = useDownloadDocuments();

    const handleDownload = async () => {
        const res = await downloadDocuments(+propertyId!);
        if (!res) return;
        downloadBlob(res, propertyCode);
    };

    return (
        <Paper elevation={10} sx={{ overflow: "auto", padding: "10px" }}>
            <Grid container direction={"column"} gap={1} flex={1} mb={2}>
                {documents?.map(getDocument)}
            </Grid>
            <Divider />
            <Stack direction="row" justifyContent="flex-end" mt={1}>
                <LoadingButton
                    loading={isLoading}
                    disabled={isLoading}
                    onClick={handleDownload}
                >
                    {t("Download")}
                </LoadingButton>
            </Stack>
        </Paper>
    );
};

export default Documents;

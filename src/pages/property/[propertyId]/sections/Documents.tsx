import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import {
    Paper,
    Grid,
    Button,
    Box,
    Divider,
    Typography,
    IconButton,
} from "@mui/material";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { DocumentIcon } from "src/components/upload/preview/DocumentIcon";
import { useLazyDownloadDocumentsQuery } from "src/services/exports";
import { useGetPropertyByIdQuery } from "src/services/properties";

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

const Documents: React.FC = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { data: property } = useGetPropertyByIdQuery(+propertyId!);
    const documents = useMemo(() => property?.documents || [], [property]);
    const propertyCode = useMemo(() => property?.code || "", [property]);

    const [downloadDocuments] = useLazyDownloadDocumentsQuery();

    const [openIframe, setOpenIframe] = useState("");

    const handleDownload = () =>
        downloadDocuments(+propertyId!)
            .unwrap()
            .then((b) => downloadBlob(b, propertyCode));

    return (
        <Paper elevation={10} sx={{ overflow: "auto", padding: "10px" }}>
            <Grid container direction={"column"} gap={1} flex={1} mb={2}>
                {documents?.map(({ key, filename, url }) =>
                    url ? (
                        <Grid
                            item
                            key={key}
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
                                    <Typography variant="h6">
                                        {filename || "N/A"}
                                    </Typography>
                                </Box>
                                <IconButton>
                                    {!openIframe && (
                                        <ArrowDownward
                                            onClick={() => setOpenIframe(key)}
                                        />
                                    )}
                                    {openIframe === key && (
                                        <ArrowUpward
                                            onClick={() => setOpenIframe("")}
                                        />
                                    )}
                                </IconButton>
                            </Box>
                            {openIframe === key && (
                                <iframe
                                    src={url}
                                    height={500}
                                    width={"100%"}
                                    style={{
                                        border: 0,
                                    }}
                                />
                            )}
                        </Grid>
                    ) : null
                )}
            </Grid>
            <Divider />
            <Box
                flex={1}
                flexDirection={"row"}
                justifyContent={"flex-end"}
                mt={1}
            >
                <Button onClick={handleDownload}>Download</Button>
            </Box>
        </Paper>
    );
};

export default Documents;

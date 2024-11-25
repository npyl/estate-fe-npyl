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
import { useMemo, useState } from "react";
import { Label } from "@/components/Label";
import DocumentIcon from "src/components/upload/preview/DocumentIcon";
import { useGetPropertyByIdQuery } from "src/services/properties";
import { downloadDocuments } from "@/services/exports";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();

    const router = useRouter();
    const { propertyId } = router.query;

    const { data: property } = useGetPropertyByIdQuery(+propertyId!);
    const documents = useMemo(() => property?.documents || [], [property]);
    const propertyCode = useMemo(() => property?.code || "", [property]);

    const [isLoading, setLoading] = useState(false);

    const [openIframe, setOpenIframe] = useState("");

    const handleDownload = () => {
        setLoading(true);
        downloadDocuments(+propertyId!).then((b) => {
            setLoading(false);
            downloadBlob(b, propertyCode);
        });
    };

    return (
        <Paper elevation={10} sx={{ overflow: "auto", padding: "10px" }}>
            <Grid container direction={"column"} gap={1} flex={1} mb={2}>
                {documents?.map(({ key, filename, url, labels }) =>
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
                                    <DocumentIcon
                                        isPreview={isLoading ? true : false}
                                    />

                                    <Typography variant="h6">
                                        {filename || "N/A"}
                                    </Typography>
                                    <Box ml={2}>
                                        {labels.map(({ id, name, color }) => (
                                            <Label
                                                key={id}
                                                color={color}
                                                name={name}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                                <IconButton>
                                    {!openIframe && (
                                        <KeyboardArrowDownIcon
                                            onClick={() => setOpenIframe(key)}
                                        />
                                    )}
                                    {openIframe === key && (
                                        <KeyboardArrowUpIcon
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
            <Stack direction="row" justifyContent="flex-end" mt={1}>
                <LoadingButton
                    loading={isLoading}
                    disabled={isLoading}
                    loadingPosition="end"
                    onClick={handleDownload}
                >
                    {t("Download")}
                </LoadingButton>
            </Stack>
        </Paper>
    );
};

export default Documents;

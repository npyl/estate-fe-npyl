import {
    Button,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import { Fragment, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import DocumentSvg from "src/assets/Document";
import useToggle from "src/hooks/useToggle";
import { useGetNotificationByIdQuery } from "src/services/notification";
import { ContactNotification } from "src/types/notification";
import BasicRow from "./basic";

interface ListingRowProps {
    row: ContactNotification;
    onRemove: () => void;
    onClick: () => void;
    loading: boolean;
}

interface CollapsibleProps {
    id?: number;
    open: boolean;
}

const Collapsible = ({ id, open }: CollapsibleProps) => {
    const { t, i18n } = useTranslation();

    const { data: workForUs } = useGetNotificationByIdQuery(id!, {
        skip: !id && !open,
        selectFromResult: ({ data }) => ({
            data: data?.workForUsDetails,
        }),
    });

    const greekVersion = useMemo(() => i18n.language === "el", [i18n.language]);
    const workRegion = useMemo(
        () =>
            (greekVersion
                ? workForUs?.workRegion?.nameGR
                : workForUs?.workRegion?.nameEN) || "",
        [greekVersion, workForUs?.workRegion]
    );

    const handleOpenPDF = useCallback(() => {
        // Check if we have the attachment
        const attachment = workForUs?.attachments;
        if (!attachment) {
            console.error("No attachment found.");
            return;
        }

        // Extract the base64 encoded data
        const base64Data = attachment.split("base64,")[1];
        if (!base64Data) {
            console.error("Invalid attachment data.");
            return;
        }

        // Convert base64 to binary
        const binaryString = window.atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Create a Blob from the PDF bytes
        const blob = new Blob([bytes], { type: "application/pdf" });
        // Generate a URL for the Blob
        const blobUrl = URL.createObjectURL(blob);

        // Create an anchor element and trigger a download
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = "attachment.pdf"; // You can name the download file here
        document.body.appendChild(a); // Append the anchor to body
        a.click(); // Trigger a click on the element
        document.body.removeChild(a); // Clean up

        // If you prefer to open the PDF in a new tab, you can use this instead:
        // window.open(blobUrl, '_blank');
    }, [workForUs?.attachments]);

    return (
        <TableRow>
            <TableCell
                style={{ paddingBottom: 0, paddingTop: 0, paddingRight: 0 }}
                colSpan={6}
            >
                <Collapse
                    in={open}
                    timeout="auto"
                    unmountOnExit
                    sx={{
                        p: 2,
                        height: "auto",
                    }}
                >
                    <Table
                        size="small"
                        sx={{
                            "& .MuiTableCell-root": {
                                borderBottom: "none",
                                borderRadius: "0px",
                            },
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>{t("Positions")}</TableCell>
                                <TableCell>{t("Work Regions")}</TableCell>
                                <TableCell>{t("Attachment")}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    {workForUs?.positions
                                        ? Object.entries(workForUs?.positions)
                                              .filter(([key, value]) => !!value)
                                              .map(([key], i) => (
                                                  <div key={i}>
                                                      {i + 1}. {key}
                                                  </div>
                                              ))
                                        : null}
                                </TableCell>
                                <TableCell>{workRegion}</TableCell>
                                <TableCell>
                                    {workForUs?.attachments ? (
                                        <Button
                                            startIcon={<DocumentSvg />}
                                            onClick={handleOpenPDF}
                                        >
                                            Download PDF
                                        </Button>
                                    ) : null}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Collapse>
            </TableCell>
        </TableRow>
    );
};

function WorkApplication({ row, onRemove, loading, onClick }: ListingRowProps) {
    const [open, toggleOpen] = useToggle(false);

    return (
        <Fragment>
            <BasicRow
                row={row}
                open={open}
                variant="dontShowType"
                onToggle={toggleOpen}
                onRemove={onRemove}
                loading={loading}
                onClick={onClick}
            />
            {open ? <Collapsible id={row?.id} open={open} /> : null}
        </Fragment>
    );
}

export default WorkApplication;

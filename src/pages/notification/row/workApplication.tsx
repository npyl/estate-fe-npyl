import {
    Button,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
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
    filter: any;
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
        const attachment = workForUs?.attachments;
        if (!attachment) {
            console.error("No attachment found.");
            return;
        }

        const base64Data = attachment.split("base64,")[1];
        if (!base64Data) {
            console.error("Invalid attachment data.");
            return;
        }

        const binaryString = window.atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([bytes], { type: "application/pdf" });
        const blobUrl = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = "attachment.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // To open the PDF in a new tab, uncomment the following line:
        // window.open(blobUrl, '_blank');
    }, [workForUs?.attachments]);

    return (
        <TableRow>
            <TableCell colSpan={6} style={{ padding: 0 }}>
                <Collapse in={open} timeout="auto" unmountOnExit sx={{ p: 2 }}>
                    <Table
                        size="small"
                        sx={{
                            "& .MuiTableCell-root": {
                                borderBottom: "none",
                                borderRadius: "0px",
                                padding: "10px",
                            },
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle2">
                                        {t("Positions")}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2">
                                        {t("Work Regions")}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2">
                                        {t("Attachment")}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    {workForUs?.positions
                                        ? Object.entries(workForUs?.positions)
                                              .filter(([key, value]) => !!value)
                                              .map(([key], i) => (
                                                  <Typography
                                                      key={i}
                                                      variant="body2"
                                                  >
                                                      {i + 1}. {key}
                                                  </Typography>
                                              ))
                                        : null}
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {workRegion}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {workForUs?.attachments ? (
                                        <Button
                                            startIcon={<DocumentSvg />}
                                            onClick={handleOpenPDF}
                                        >
                                            {t("Download PDF")}
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

function WorkApplication({
    row,
    onRemove,
    loading,
    onClick,
    filter,
}: ListingRowProps) {
    const [open, toggleOpen] = useToggle(false);

    return (
        <Fragment>
            <BasicRow
                row={row}
                open={open}
                variant="dontShowType"
                onToggle={toggleOpen}
                onRemove={onRemove}
                filter={filter}
                loading={loading}
                onClick={onClick}
            />
            {open ? <Collapsible id={row?.id} open={open} /> : null}
        </Fragment>
    );
}

export default WorkApplication;

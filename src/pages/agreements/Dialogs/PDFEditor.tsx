import { useForm } from "./hook";
import React, { useEffect, useRef, useState } from "react";
import { Template } from "@pdfme/common";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import { Box, Fab } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const getSampleTemplate = (basePdf: any): Template => ({
    schemas: [
        {
            name: {
                type: "text",
                position: {
                    x: 25.06,
                    y: 26.35,
                },
                width: 77.77,
                height: 18.7,
                fontSize: 36,
                fontColor: "#14b351",
            },
        },
    ],
    basePdf,
});

const PDFEditor = () => {
    const [template, setTemplate] = useState<Template | null>(null);

    useEffect(() => {
        const loadPdf = async () => {
            try {
                const res = await fetch("/api/pdf", {
                    headers: {
                        "Content-Type": "application/pdf",
                    },
                });

                const basePdf = await res.text();

                const template = getSampleTemplate(basePdf);

                setTemplate(template);
            } catch (error) {
                console.error("Error loading PDF:", error);
            }
        };
        loadPdf();
    }, []);

    const formRef = useRef<HTMLDivElement>(null);

    useForm({ formRef, template });

    return <div ref={formRef} />;
};

interface Props extends Omit<DialogProps, "onClose"> {
    onClose: VoidFunction;
    variant: "basic" | "purchase";
}

const PDFEditorDialog: React.FC<Props> = (props) => (
    <Box position="relative">
        <Dialog {...props} fullScreen>
            <PDFEditor />
        </Dialog>

        <Fab
            sx={{
                position: "fixed",
                top: 30,
                right: 30,
                zIndex: 1500,
            }}
            onClick={props.onClose}
        >
            <CloseIcon />
        </Fab>
    </Box>
);

export default PDFEditorDialog;

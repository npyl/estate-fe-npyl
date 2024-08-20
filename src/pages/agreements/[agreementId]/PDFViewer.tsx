import readOnly from "@/components/PDFPlugins/readOnly";
import signature from "@/components/PDFPlugins/signature";
import errorTooltip from "@/components/PDFPlugins/errorTooltip";
import {
    flattenObject,
    loadPdf,
} from "@/sections/agreements/Dialogs/PDFEditor/util";
import { IAgreement } from "@/types/agreements";
import { text } from "@pdfme/schemas";
import { Viewer } from "@pdfme/ui";
import { useEffect, useRef } from "react";

interface Props {
    a: IAgreement;
}

const PDFViewer: React.FC<Props> = ({ a }) => {
    const { variant, language, formData } = a || {};

    const containerRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<Viewer>();

    useEffect(() => {
        if (!containerRef.current) return;
        if (!variant?.key || !language?.key) return;

        const inputs = [flattenObject(formData)];

        loadPdf(variant.key, language.key).then((template) => {
            if (!template) return;

            try {
                viewRef.current = new Viewer({
                    domContainer: containerRef.current!,
                    template,
                    inputs,
                    plugins: { text, readOnly, errorTooltip, signature },
                });
            } catch (ex) {}
        });
    }, [containerRef.current, formData, variant, language]);

    useEffect(() => {
        return () => {
            viewRef.current?.destroy();
        };
    }, []);

    return <div ref={containerRef} />;
};

export default PDFViewer;

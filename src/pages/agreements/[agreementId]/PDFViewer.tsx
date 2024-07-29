import {
    flattenObject,
    loadPdf,
} from "@/sections/agreements/Dialogs/PDFEditor/util";
import { IAgreement } from "@/types/agreements";
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

            viewRef.current = new Viewer({
                domContainer: containerRef.current!,
                template,
                inputs,
            });
        });
    }, [containerRef.current, formData, variant, language]);

    return <div ref={containerRef} />;
};

export default PDFViewer;

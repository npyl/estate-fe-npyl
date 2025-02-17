import { loadPdf } from "@/sections/agreements/Dialogs/PDFEditor/util";
import { IAgreement } from "@/types/agreements";
import { Viewer } from "@pdfme/ui";
import { useEffect, useRef } from "react";
import { getAuto } from "@/sections/agreements/Dialogs/Preparation/mapper";
import { PDF_PLUGINS_LIST } from "@/components/PDFPlugins/_shared/constants";
import flattenObject from "@/utils/flattenObject";

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

        const { additional } = formData;

        const data = {
            ...formData,
            ...getAuto(additional?.date, formData?.owner?.email || ""),
        };

        const inputs = [flattenObject(data)];

        loadPdf(variant.key, language.key).then((template) => {
            if (!template) return;

            try {
                viewRef.current = new Viewer({
                    domContainer: containerRef.current!,
                    template,
                    inputs,
                    plugins: PDF_PLUGINS_LIST,
                });
            } catch (ex) {}
        });
    }, [containerRef.current, formData, variant, language]);

    useEffect(() => {
        return () => {
            viewRef.current?.destroy();
            viewRef.current = undefined;
        };
    }, []);

    return <div ref={containerRef} />;
};

export default PDFViewer;

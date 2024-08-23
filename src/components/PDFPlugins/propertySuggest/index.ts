import type { Plugin } from "@pdfme/common";
import { text } from "@pdfme/schemas";
import { TextSchema } from "@pdfme/schemas/dist/types/src/text/types";
import uiRender from "./ui";

const type = "PROPERTY_PRO_SUGGEST_BUTTON";

const propertySuggest: Plugin<TextSchema> = {
    ui: uiRender,
    pdf: text.pdf,
    propPanel: {
        schema: {},
        defaultValue: "",
        defaultSchema: {
            ...text.propPanel.defaultSchema,
            type,
            content: "",
            position: { x: 0, y: 0 },
            width: 62.5,
            height: 37.5,
        },
    },
};

export default propertySuggest;

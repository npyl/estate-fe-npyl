//
// INFO:    this is a dummy schema that acts as a .selectable
//          so that ErrorTooltip can appear for suggestedProperties array

import type { Plugin } from "@pdfme/common";
import { text } from "@pdfme/schemas";
import { TextSchema } from "@pdfme/schemas/dist/types/src/text/types";

const type = "PROPERTY_PRO_ERROR_TOOLTIP";

const ErrorTooltipSchema: Plugin<TextSchema> = {
    ui: () => {}, // disabled in edit mode
    pdf: () => {}, // disabled in export mode
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

export default ErrorTooltipSchema;

import signature from "../signature";
import errorTooltip from "../errorTooltip";
import readOnly from "../readOnly";
import { text } from "@pdfme/schemas";
import getPropertySuggest from "../getPropertySuggest";

type ALIGNMENT = "left" | "center" | "right";
type VERTICAL_ALIGNMENT = "top" | "middle" | "bottom";

export const DEFAULT_FONT_SIZE = 13;

const ALIGN_LEFT = "left" as ALIGNMENT;
export const DEFAULT_ALIGNMENT = ALIGN_LEFT;
export const VERTICAL_ALIGN_TOP = "top" as VERTICAL_ALIGNMENT;
export const VERTICAL_ALIGN_MIDDLE = "middle" as VERTICAL_ALIGNMENT;
export const VERTICAL_ALIGN_BOTTOM = "bottom" as VERTICAL_ALIGNMENT;
export const DEFAULT_LINE_HEIGHT = 1;
export const DEFAULT_CHARACTER_SPACING = 0;

/* variation without onLoad */
export const PDF_PLUGINS_LIST = {
    text,
    signature,
    errorTooltip,
    readOnly,
    propertySuggest: getPropertySuggest(),
};

/* callback that returns plugins list with onLoad support */
export const getPDF_PLUGINS_LIST = (onLoad?: VoidFunction) => ({
    text,
    signature,
    errorTooltip,
    readOnly,
    propertySuggest: getPropertySuggest(onLoad),
});

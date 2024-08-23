import signature from "../signature";
import errorTooltip from "../errorTooltip";
import readOnly from "../readOnly";
import propertySuggest from "../propertySuggest";
import { text } from "@pdfme/schemas";

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

export const PDF_PLUGINS_LIST = {
    text,
    signature,
    errorTooltip,
    readOnly,
    propertySuggest,
};

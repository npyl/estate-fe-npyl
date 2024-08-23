import type * as CSS from "csstype";
import {
    DEFAULT_FONT_SIZE,
    DEFAULT_ALIGNMENT,
    VERTICAL_ALIGN_TOP,
    VERTICAL_ALIGN_MIDDLE,
    VERTICAL_ALIGN_BOTTOM,
    DEFAULT_LINE_HEIGHT,
    DEFAULT_CHARACTER_SPACING,
} from "../_shared/constants";
import { CSSProperties } from "react";
import { TextSchema } from "@pdfme/schemas/dist/types/src/text/types";

const mapVerticalAlignToFlex = (verticalAlignmentValue: string | undefined) => {
    switch (verticalAlignmentValue) {
        case VERTICAL_ALIGN_TOP:
            return "flex-start";
        case VERTICAL_ALIGN_MIDDLE:
            return "center";
        case VERTICAL_ALIGN_BOTTOM:
            return "flex-end";
    }
    return "flex-start";
};

const getContainerStyle = (
    hasCustomNode: boolean,
    verticalAlignment?: string
): CSSProperties => ({
    padding: 0,
    resize: "none",
    backgroundColor: "transparent",
    border: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: mapVerticalAlignToFlex(verticalAlignment),
    width: "100%",
    height: "100%",
    // ...
    ...(hasCustomNode ? { position: "relative" } : {}),
});

const getTextBlockStyle = (schema: TextSchema): CSS.Properties => ({
    // Font formatting styles
    fontFamily: schema.fontName ? `'${schema.fontName}'` : "inherit",
    color: "blue",
    fontSize: `${schema.fontSize ?? DEFAULT_FONT_SIZE}pt`,
    letterSpacing: `${schema.characterSpacing ?? DEFAULT_CHARACTER_SPACING}pt`,
    lineHeight: `${schema.lineHeight ?? DEFAULT_LINE_HEIGHT}em`,
    textAlign: schema.alignment ?? DEFAULT_ALIGNMENT,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    // Block layout styles
    resize: "none",
    border: "none",
    outline: "none",
    marginBottom: "5px",
    paddingTop: "5px",
    backgroundColor: "transparent",
});

export { getContainerStyle, getTextBlockStyle };

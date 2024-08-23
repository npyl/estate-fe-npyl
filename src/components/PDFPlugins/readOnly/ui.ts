import type * as CSS from "csstype";
import { UIRenderProps } from "@pdfme/common";
import {
    DEFAULT_FONT_SIZE,
    DEFAULT_ALIGNMENT,
    VERTICAL_ALIGN_TOP,
    VERTICAL_ALIGN_MIDDLE,
    VERTICAL_ALIGN_BOTTOM,
    DEFAULT_LINE_HEIGHT,
    DEFAULT_CHARACTER_SPACING,
} from "../_shared/constants";

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

export const uiRender = async (arg: UIRenderProps<any>) => {
    const { value, schema, rootElement } = arg;

    const container = document.createElement("div");

    const containerStyle: CSS.Properties = {
        padding: 0,
        resize: "none",
        backgroundColor: "transparent",
        border: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: mapVerticalAlignToFlex(schema.verticalAlignment),
        width: "100%",
        height: "100%",
    };
    Object.assign(container.style, containerStyle);
    rootElement.innerHTML = "";
    rootElement.appendChild(container);

    const textBlockStyle: CSS.Properties = {
        // Font formatting styles
        fontFamily: schema.fontName ? `'${schema.fontName}'` : "inherit",
        color: "blue",
        fontSize: `${schema.fontSize ?? DEFAULT_FONT_SIZE}pt`,
        letterSpacing: `${
            schema.characterSpacing ?? DEFAULT_CHARACTER_SPACING
        }pt`,
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
    };
    const textBlock = document.createElement("div");
    Object.assign(textBlock.style, textBlockStyle);

    textBlock.innerHTML = value
        .split("")
        .map(
            (l: string, i: number) =>
                `<span style="letter-spacing:${
                    String(value).length === i + 1 ? 0 : "inherit"
                };">${l}</span>`
        )
        .join("");

    container.appendChild(textBlock);
};

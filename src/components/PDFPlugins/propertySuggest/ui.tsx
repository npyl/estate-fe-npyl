import { UIRenderProps } from "@pdfme/common";
import { getContainerStyle, getTextBlockStyle } from "./css";
import { TextSchema } from "@pdfme/schemas/dist/types/src/text/types";
import { createRoot } from "react-dom/client";
import Button from "./Button";

const getTextBlockValue = (value: string) =>
    value
        .split("")
        .map(
            (l: string, i: number) =>
                `<span style="letter-spacing:${
                    String(value).length === i + 1 ? 0 : "inherit"
                };">${l}</span>`
        )
        .join("");

const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        document.execCommand("insertLineBreak", false, undefined);
    }
};

const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData?.getData("text");
    const selection = window.getSelection();
    if (!selection?.rangeCount) return;
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(paste || ""));
    selection.collapseToEnd();
};

const uiRender = async (arg: UIRenderProps<TextSchema>) => {
    const {
        value,
        schema,
        rootElement,
        // ..
        tabIndex,
        onChange,
        placeholder,
        stopEditing,
    } = arg;

    // Create container div
    const container = document.createElement("div");
    const containerStyle = getContainerStyle(true, schema.verticalAlignment);
    Object.assign(container.style, containerStyle);

    // AppendChild to root
    rootElement.innerHTML = "";
    rootElement.appendChild(container);

    // Create textBlock
    const textBlockStyle = getTextBlockStyle(schema);
    const textBlock = document.createElement("div");
    textBlock.innerHTML = getTextBlockValue(value);
    Object.assign(textBlock.style, textBlockStyle);

    // AppendChild to container
    container.appendChild(textBlock);

    //
    //  Editability
    //
    textBlock.contentEditable = "true";
    textBlock.addEventListener("keydown", handleKeyDown);
    textBlock.addEventListener("paste", handlePaste);

    textBlock.tabIndex = tabIndex || 0;
    textBlock.innerText = value;
    textBlock.addEventListener("blur", (e: Event) => {
        onChange && onChange((e.target as HTMLDivElement).innerText);
        stopEditing && stopEditing();
    });

    if (placeholder && !value) {
        textBlock.innerText = placeholder;
        textBlock.style.color = "black";
        textBlock.addEventListener("focus", () => {
            if (textBlock.innerText === placeholder) {
                textBlock.innerText = "";
                textBlock.style.color = schema.fontColor ?? "black";
            }
        });
    }

    //
    //  Custom Node
    //
    const nodeContainer = document.createElement("div");
    rootElement.appendChild(nodeContainer);

    const root = createRoot(nodeContainer);
    root.render(<Button schemaKey={arg.schema.key as string} />);
};

export default uiRender;

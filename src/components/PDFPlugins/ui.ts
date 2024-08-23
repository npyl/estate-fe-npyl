import { UIRenderProps } from "@pdfme/common";
import { text } from "@pdfme/schemas";
import { TextSchema } from "@pdfme/schemas/dist/types/src/text/types";

interface Props extends UIRenderProps<TextSchema> {
    onLoad?: VoidFunction;
}

export const uiRender = async ({ onLoad, ...arg }: Props) => {
    const res = await text.ui(arg);

    onLoad?.();

    return res;
};

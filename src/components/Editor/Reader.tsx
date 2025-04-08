import { generateHTML } from "@tiptap/core";
import { extensions } from "./config";
import debugLog from "@/_private/debugLog";
import { FC, useMemo } from "react";
import Box, { BoxProps } from "@mui/material/Box";

const renderTipTapHTML = (json: any) => {
    try {
        return generateHTML(json, extensions);
    } catch (ex) {
        debugLog(ex);
        return "";
    }
};

const isTipTapJson = (input: string | undefined): boolean => {
    if (!input) return false;
    try {
        const parsed = JSON.parse(input);
        return parsed?.type === "doc" && Array.isArray(parsed?.content);
    } catch {
        return false;
    }
};

interface ReaderProps extends Omit<BoxProps, "dangerouslySetInnerHTML"> {
    content?: string;
}

const Reader: FC<ReaderProps> = ({ content, ...props }) => {
    const html = useMemo(() => {
        if (isTipTapJson(content)) {
            try {
                return renderTipTapHTML(JSON.parse(content || ""));
            } catch (ex) {
                debugLog(ex);
                return content ?? "";
            }
        } else {
            // Fallback to escape plain text.This handles the comments created before the editor was applied.
            const safeText = content
                ?.replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/\n/g, "<br>");
            return `<p>${safeText}</p>`;
        }
    }, [content]);

    return <Box dangerouslySetInnerHTML={{ __html: html }} {...props} />;
};

export default Reader;

import { useCallback } from "react";
import { TEditor } from "..";
import infoToast from "@/components/Toaster/toasts/info";

const useCopyToClipboard = (editor?: TEditor | null) => {
    return useCallback(async () => {
        try {
            if (!editor) throw new Error("Bad editor");

            const html = editor.getHTML();
            const text = editor.getText();

            await navigator.clipboard.write([
                new ClipboardItem({
                    "text/html": new Blob([html], { type: "text/html" }),
                    "text/plain": new Blob([text], { type: "text/plain" }),
                }),
            ]);

            infoToast("COPY_TO_CLIPBOARD_SUCCESS");
        } catch (err) {
            console.log(err);
        }
    }, [editor]);
};

export default useCopyToClipboard;

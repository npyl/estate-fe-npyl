import useTextField from "@/hooks/useTextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useEditorContext } from "../../context";
import { debuglog } from "util";
import DoneIcon from "@mui/icons-material/Done";

const Content = () => {
    const { t } = useTranslation();

    const { editor } = useEditorContext();
    const initialValue = editor?.getAttributes("link").href || "";

    const [href, setHref] = useTextField(initialValue);

    const onClick = useCallback(() => {
        try {
            // empty
            if (href === "") {
                editor
                    ?.chain()
                    .focus()
                    .extendMarkRange("link")
                    .unsetLink()
                    .run();
                return;
            }

            // update link
            editor
                ?.chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href })
                .run();
        } catch (ex) {
            debuglog(ex);
        }
    }, [href]);

    return (
        <Stack
            direction="row"
            p={1}
            alignItems="center"
            overflow="hidden hidden"
            spacing={1}
        >
            <TextField
                label={t("Link")}
                autoFocus
                value={href}
                onChange={setHref}
            />

            <Button disabled={!href} variant="contained" onClick={onClick}>
                <DoneIcon />
            </Button>
        </Stack>
    );
};

export default Content;

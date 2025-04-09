import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import SaveButton from "./SaveButton";
import RHFEditor from "@/components/hook-form/RHFEditor";
import { Box, TextField, ClickAwayListener } from "@mui/material";

interface CreateProps {
    cardId: number;
}

const Create: FC<CreateProps> = ({ cardId }) => {
    const { t } = useTranslation();
    const [isEditorVisible, setEditorVisible] = useState(false);
    const editorRef = useRef<any>(null);

    const methods = useForm({
        defaultValues: { message: "" },
        mode: "onChange",
    });

    const { reset, watch } = methods;
    const message = watch("message");

    const handleClear = () => {
        reset();
        setEditorVisible(false);
    };

    const handleClickAway = () => {
        try {
            const parsed =
                typeof message === "string" ? JSON.parse(message) : message;

            const isEmpty =
                !parsed?.content?.length ||
                (parsed.content.length === 1 &&
                    parsed.content[0].type === "paragraph" &&
                    (!parsed.content[0].content ||
                        parsed.content[0].content.length === 0));

            if (isEmpty) {
                setEditorVisible(false);
            }
        } catch (err) {
            // In case of parse error or unexpected structure, just collapse
            setEditorVisible(false);
        }
    };

    useEffect(() => {
        if (isEditorVisible && editorRef.current) {
            editorRef.current?.commands.focus();
        }
    }, [isEditorVisible]);
    return (
        <FormProvider {...methods}>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Box>
                    {isEditorVisible ? (
                        <>
                            <RHFEditor
                                name="message"
                                placeholder={t<string>("Comment") + "..."}
                                ref={editorRef}
                            />
                            <Box mt={1}>
                                <SaveButton
                                    onCreate={handleClear}
                                    cardId={cardId}
                                    message={message}
                                />
                            </Box>
                        </>
                    ) : (
                        <Box>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder={t("Comment...") || ""}
                                onFocus={() => {
                                    setEditorVisible(true);
                                    // Delay the focus until editor is mounted
                                    requestAnimationFrame(() => {
                                        requestAnimationFrame(() => {
                                            editorRef.current?.commands.focus();
                                        });
                                    });
                                }}
                            />

                            <SaveButton
                                onCreate={handleClear}
                                cardId={cardId}
                                message={message}
                            />
                        </Box>
                    )}
                </Box>
            </ClickAwayListener>
        </FormProvider>
    );
};

export default Create;

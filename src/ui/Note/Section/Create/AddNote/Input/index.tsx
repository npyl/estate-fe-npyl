import { EditorRef } from "@/components/Editor";
import useDialog from "@/hooks/useDialog";
import TextField from "@mui/material/TextField";
import { forwardRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import DisappearingEditor from "./DisappearingEditor";
import AddButton from "./AddButton";
import { SxProps, Theme } from "@mui/material";
import CloseButton from "./CloseButton";
import { SpaceBetween } from "@/components/styled";

const ActionsSx: SxProps<Theme> = {
    bgcolor: "background.neutral",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
};

const AddButtonSx: SxProps<Theme> = {
    width: "fit-content",
    alignSelf: "flex-end",
};

interface InputProps {
    onAdd: VoidFunction;
}

const Input = forwardRef<EditorRef, InputProps>(({ onAdd: _onAdd }, ref) => {
    const { t } = useTranslation();
    const [isEnabled, enable, disable] = useDialog();

    const onAdd = useCallback(() => {
        _onAdd();
        disable();
    }, [_onAdd]);

    if (!isEnabled)
        return (
            <TextField
                fullWidth
                variant="outlined"
                placeholder={t("Comment...") || ""}
                onFocus={enable}
            />
        );

    return (
        <DisappearingEditor ref={ref}>
            <SpaceBetween alignItems="center" sx={ActionsSx}>
                <CloseButton onClick={disable} />
                <AddButton onClick={onAdd} sx={AddButtonSx} />
            </SpaceBetween>
        </DisappearingEditor>
    );
});

Input.displayName = "Input";

export default Input;

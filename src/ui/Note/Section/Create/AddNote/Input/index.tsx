import { EditorRef } from "@/components/Editor";
import useDialog from "@/hooks/useDialog";
import TextField from "@mui/material/TextField";
import { forwardRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import DisappearingEditor from "./DisappearingEditor";
import AddButton from "./AddButton";
import Stack from "@mui/material/Stack";
import { SxProps, Theme } from "@mui/material";
import CancelButton from "./CancelButton";
import { SpaceBetween } from "@/components/styled";

const ContainerSx: SxProps<Theme> = {
    gap: 1,
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
        <Stack sx={ContainerSx}>
            <DisappearingEditor ref={ref} />
            <SpaceBetween alignItems="center">
                <CancelButton onClick={disable} />
                <AddButton onClick={onAdd} sx={AddButtonSx} />
            </SpaceBetween>
        </Stack>
    );
});

Input.displayName = "Input";

export default Input;

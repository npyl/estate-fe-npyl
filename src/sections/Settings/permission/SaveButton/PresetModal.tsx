import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@/components/Dialog";
import TextField from "@mui/material/TextField";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import useTextField from "@/hooks/useTextField";
import { useSavePresetMutation } from "@/services/security";
import { useSecurityContext } from "../Context";
import LoadingButton from "@mui/lab/LoadingButton";

// ----------------------------------------------------------------------------------

interface SaveButtonProps {
    name: string;
    onClose?: VoidFunction;
}

const SaveButton: FC<SaveButtonProps> = ({ name, onClose }) => {
    const { t } = useTranslation();

    const { data, selectedPreset, preset } = useSecurityContext();

    const [savePreset, { isLoading }] = useSavePresetMutation();

    const onClick = async () => {
        const res = await savePreset({
            data: {
                id: selectedPreset === -1 ? null : preset?.id,
                name,
                permissions: data.permissionResponses,
            },
            method: !!preset?.id && selectedPreset !== -1 ? "PUT" : "POST",
        });

        if ("error" in res) return;

        onClose?.();
    };

    return (
        <LoadingButton
            disabled={isLoading}
            loading={isLoading}
            onClick={onClick}
        >
            {t("Save")}
        </LoadingButton>
    );
};

// ----------------------------------------------------------------------------------

interface Props extends DialogProps {}

const SavePresetDialog: FC<Props> = (props) => {
    const { t } = useTranslation();

    const { selectedPreset, preset } = useSecurityContext();
    const presetName = selectedPreset === -1 ? "" : preset?.name;

    const [name, setName] = useTextField(presetName ?? "");

    return (
        <Dialog
            title={t("New preset")}
            content={
                <TextField
                    fullWidth
                    InputLabelProps={{ shrink: false }}
                    placeholder={t<string>("Name")}
                    value={name}
                    onChange={setName}
                />
            }
            actions={
                <>
                    <Button onClick={props.onClose}>{t("Cancel")}</Button>
                    <SaveButton name={name} />
                </>
            }
            {...props}
        />
    );
};

export default SavePresetDialog;

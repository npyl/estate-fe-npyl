import { RHFTextField } from "@/components/hook-form";
import Stack from "@mui/material/Stack";
import { useFormContext } from "react-hook-form";
import {
    Button,
    IconButton,
    TextField,
    TextFieldProps,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleRounded";
import RemoveIcon from "@mui/icons-material/RemoveCircleRounded";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import useDialog from "@/hooks/useDialog";
import { RHFTextFieldProps } from "@/components/hook-form/RHFTextField";

// ------------------------------------------------------------------------------------

type NewTextFieldProps = TextFieldProps & {
    onAdd: (v: string) => void;
};

const NewTextField: React.FC<NewTextFieldProps> = ({ onAdd, ...props }) => {
    const { t } = useTranslation();
    const [value, setValue] = useState("");

    return (
        <Stack direction="row" spacing={1}>
            <TextField
                value={value}
                onChange={(e) => setValue(e.target.value)}
                {...props}
            />
            <Button disabled={!value} onClick={() => onAdd(value)}>
                {t("Add")}
            </Button>
        </Stack>
    );
};

type RemovableProps = RHFTextFieldProps & {
    onRemove: VoidFunction;
    isRemoveDisabled: boolean;
};

const RemovableRHFTextField: React.FC<RemovableProps> = ({
    onRemove,
    isRemoveDisabled,
    ...props
}) => {
    return (
        <Stack direction="row" spacing={1}>
            <RHFTextField {...props} />
            <IconButton disabled={isRemoveDisabled} onClick={onRemove}>
                <RemoveIcon />
            </IconButton>
        </Stack>
    );
};

// ------------------------------------------------------------------------------------

interface MultipleProps {
    label: string;
    name: string;
}

const Multiple = ({ label, name }: MultipleProps) => {
    const { watch, setValue } = useFormContext();

    const values = (watch(name) as string[]) || [];

    const [wantNew, openNew, closeNew] = useDialog();
    const handleAddNew = useCallback((v: string) => {
        const old = (watch(name) as string[]) || [];
        setValue(name, [...old, v]);
        closeNew();
    }, []);
    const handleRemove = useCallback((i: number) => {
        const old = (watch(name) as string[]) || [];
        setValue(
            name,
            old.filter((_, index) => index !== i)
        );
    }, []);

    return (
        <Stack spacing={0.5} position="relative" py={1}>
            <Typography>{label}</Typography>
            <Stack direction="row" spacing={1} width={1}>
                <Stack spacing={1} width={1}>
                    {values.map((_, i) => (
                        <RemovableRHFTextField
                            key={i}
                            fullWidth
                            name={`${name}.${i}`}
                            isRemoveDisabled={values.length === 1}
                            onRemove={() => handleRemove(i)}
                        />
                    ))}

                    {wantNew ? (
                        <NewTextField fullWidth onAdd={handleAddNew} />
                    ) : null}
                </Stack>

                <IconButton
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                    }}
                    onClick={openNew}
                >
                    <AddIcon />
                </IconButton>
            </Stack>
        </Stack>
    );
};

export default Multiple;

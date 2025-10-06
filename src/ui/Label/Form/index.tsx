import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import CreateButton from "./CreateButton";
import { FC } from "react";
import { ILabel } from "@/types/label";
import { SpaceBetween } from "@/components/styled";
import Content from "./Content";
import Form from "./Form";

interface LabelFormProps {
    label?: ILabel;
    onCancel: VoidFunction;
    onSuccess?: (id: number) => void;
}

const LabelForm: FC<LabelFormProps> = ({ label, onCancel, onSuccess }) => {
    const { t } = useTranslation();

    const isEdit = Boolean(label);

    return (
        <Form label={label}>
            <Stack spacing={1} p={1}>
                <Content isEdit={isEdit} />

                <SpaceBetween alignItems="center">
                    <Button onClick={onCancel}>{t("Cancel")}</Button>
                    <CreateButton edit={isEdit} onSuccess={onSuccess} />
                </SpaceBetween>
            </Stack>
        </Form>
    );
};

export type { LabelFormProps };
export default LabelForm;

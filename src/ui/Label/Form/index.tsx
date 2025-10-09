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
    assign?: boolean; // Flag to trigger assign to resource support on or off

    resourceId?: number;

    onCancel: VoidFunction;
    onSuccess?: (id: number) => void;
}

const LabelForm: FC<LabelFormProps> = ({
    label,
    assign = false,
    // ...
    resourceId,
    // ...
    onCancel,
    onSuccess,
}) => {
    const { t } = useTranslation();

    const isEdit = Boolean(label);

    return (
        <Form label={label}>
            <Stack spacing={1} p={1}>
                <Content isEdit={isEdit} assign={assign} />

                <SpaceBetween alignItems="center">
                    <Button onClick={onCancel}>{t("Cancel")}</Button>
                    <CreateButton
                        resourceId={resourceId}
                        edit={isEdit}
                        onSuccess={onSuccess}
                    />
                </SpaceBetween>
            </Stack>
        </Form>
    );
};

export type { LabelFormProps };
export default LabelForm;

import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import CreateButton from "./CreateButton";
import { FC } from "react";
import { ILabel } from "@/types/label";
import { FormProvider, useForm } from "react-hook-form";
import { SpaceBetween } from "@/components/styled";
import { ILabelForm } from "./types";
import Content from "./Content";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const schema = z.object({
    color: z.string().min(1, "Color is required"),
    name: z.string().min(1, "Name is required"),
    resource: z.enum(["property", "customer", "document", "ticket"], {
        required_error: "Resource is required",
    }),
    id: z.number().optional(),
});

interface LabelFormProps {
    label?: ILabel;
    onCancel: VoidFunction;
    onCreate?: (id: number) => void;
}

const LabelForm: FC<LabelFormProps> = ({ label, onCancel, onCreate }) => {
    const { t } = useTranslation();

    const isEdit = Boolean(label);

    const methods = useForm<ILabelForm>({
        values: {
            id: undefined,
            name: label?.name || "",
            color: label?.color || "#22194d",
            resource: "property",
        },
        resolver: zodResolver(schema),
    });

    return (
        <FormProvider {...methods}>
            <Stack spacing={3}>
                <Content isEdit={isEdit} />

                <SpaceBetween alignItems="center">
                    <Button>{t("Cancel")}</Button>
                    <CreateButton edit={isEdit} onCreate={onCreate} />
                </SpaceBetween>
            </Stack>
        </FormProvider>
    );
};

export type { LabelFormProps };
export default LabelForm;

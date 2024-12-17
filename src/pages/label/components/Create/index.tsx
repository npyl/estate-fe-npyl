import { Paper, Typography } from "@mui/material";
import { CSSProperties, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ILabelPOST, LabelResourceType } from "@/types/label";
import { FormProvider, useForm } from "react-hook-form";
import { RHFRadioGroup, RHFTextField } from "@/components/hook-form";
import RHFColorPicker from "./RHFColorPicker";
import Preview from "./Preview";
import SubmitButton from "./SubmitButton";
import dynamic from "next/dynamic";
import useCreateLabel from "./useCreateLabel";
const Assign = dynamic(() => import("./Assign"));

const FormStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
};

interface ILabelForm extends ILabelPOST {
    resource: LabelResourceType;
    resourceId?: number;
}

const Create = () => {
    const { t } = useTranslation();

    const methods = useForm<ILabelForm>({
        values: {
            name: "",
            color: "#22194d",
            resource: "property",
        },
    });

    const assigneeType = methods.watch("resource");

    const { createLabel } = useCreateLabel();

    const radioOptions = [
        { label: t("Property"), value: "property" },
        { label: t("Customer"), value: "customer" },
        { label: t("Document"), value: "document" },
        { label: t("Task"), value: "task" },
    ];

    const handleSubmit = useCallback(
        async ({ resource, resourceId, ...d }: ILabelForm) => {
            await createLabel(d.name, resourceId ?? -1, d.color, resource);
        },
        []
    );

    return (
        <Paper
            sx={{
                p: 3,
            }}
            elevation={3}
        >
            <Typography variant="h5" gutterBottom>
                {t("Create Label")}
            </Typography>

            <FormProvider {...methods}>
                <form
                    style={FormStyle}
                    onSubmit={methods.handleSubmit(handleSubmit)}
                >
                    <RHFRadioGroup name="resource" options={radioOptions} />

                    {assigneeType ? (
                        <>
                            <RHFTextField
                                name="labelName"
                                fullWidth
                                label={t("Label's name")}
                                variant="outlined"
                                placeholder="Label's Name"
                            />

                            <RHFColorPicker />

                            <Preview />

                            {assigneeType !== "document" && <Assign />}

                            <SubmitButton />
                        </>
                    ) : null}
                </form>
            </FormProvider>
        </Paper>
    );
};

export default Create;

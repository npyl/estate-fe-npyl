import { Paper, Typography } from "@mui/material";
import { CSSProperties, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { RHFRadioGroup, RHFTextField } from "@/components/hook-form";
import RHFColorPicker from "./RHFColorPicker";
import Preview from "./Preview";
import SubmitButton from "./SubmitButton";
import dynamic from "next/dynamic";
import useCreateLabel from "./useCreateLabel";
import { ILabelForm } from "./types";
const Assign = dynamic(() => import("./Assign"));

const FormStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
};

interface IOption {
    label: string;
    value: string;
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

    const radioOptions = useMemo(
        (): IOption[] => [
            { label: t("Property"), value: "property" },
            { label: t("Customer"), value: "customer" },
            { label: t("Document"), value: "document" },
            { label: t("Task"), value: "ticket" },
        ],
        [t]
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
                    onSubmit={methods.handleSubmit(createLabel)}
                >
                    <RHFRadioGroup name="resource" options={radioOptions} />

                    {assigneeType ? (
                        <>
                            <RHFTextField
                                name="name"
                                fullWidth
                                label={t("Title")}
                                variant="outlined"
                            />

                            <RHFColorPicker />

                            <Preview />

                            {assigneeType !== "document" &&
                            assigneeType !== "ticket" ? (
                                <Assign />
                            ) : null}

                            <SubmitButton />
                        </>
                    ) : null}
                </form>
            </FormProvider>
        </Paper>
    );
};

export default Create;

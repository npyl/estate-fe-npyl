import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import SaveButton from "./SaveButton";
import RHFEditor from "@/components/hook-form/RHFEditor";

interface CreateProps {
    cardId: number;
}

const Create: FC<CreateProps> = ({ cardId }) => {
    const { t } = useTranslation();

    const methods = useForm({
        defaultValues: { message: "" },
        mode: "onChange",
    });

    const { reset, watch } = methods;
    const message = watch("message");

    const handleClear = () => {
        reset();
    };

    return (
        <FormProvider {...methods}>
            <RHFEditor
                name="message"
                placeholder={t<string>("Comment") + "..."}
            />
            <SaveButton
                onCreate={handleClear}
                cardId={cardId}
                message={message}
            />
        </FormProvider>
    );
};

export default Create;

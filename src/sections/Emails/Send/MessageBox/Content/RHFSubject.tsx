import { useTranslation } from "react-i18next";
import InputField from "./InputField";
import { Controller, useFormContext } from "react-hook-form";
import { IEmailReq } from "@/types/email";

const RHFSubject = () => {
    const { t } = useTranslation();
    const { control } = useFormContext<IEmailReq>();
    return (
        <Controller
            name="subject"
            control={control}
            render={({ field }) => (
                <InputField {...field} placeholder={t<string>("Subject")} />
            )}
        />
    );
};

export default RHFSubject;

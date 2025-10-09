import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { ILabelForm } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, PropsWithChildren } from "react";
import { ILabel } from "@/types/label";

const schema = z.object({
    color: z.string().min(1, "Color is required"),
    name: z.string().min(1, "Name is required"),
    resource: z.enum(["property", "customer", "document", "ticket"], {
        required_error: "Resource is required",
    }),
    resourceId: z.number().optional(),
    id: z.number().optional(),
});

interface FormProps extends PropsWithChildren {
    label?: ILabel;
}

const Form: FC<FormProps> = ({ label, children }) => {
    const methods = useForm<ILabelForm>({
        values: {
            id: label?.id,
            name: label?.name || "",
            color: label?.color || "#22194d",
            resource: "property",
        },
        resolver: zodResolver(schema),
    });
    return <FormProvider {...methods}>{children}</FormProvider>;
};

export default Form;

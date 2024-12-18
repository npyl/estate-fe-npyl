import * as yup from "yup";
import { ILabelForm } from "./types";
import { LabelResourceType } from "@/types/label";

const schema = yup.object<ILabelForm>().shape({
    id: yup.number().optional(),
    color: yup.string().required(),
    name: yup.string().required(),
    resource: yup
        .string()
        .oneOf<LabelResourceType>([
            "property",
            "customer",
            "document",
            "ticket",
        ])
        .optional(),
    resourceId: yup.number().positive().optional(),
});

export default schema;

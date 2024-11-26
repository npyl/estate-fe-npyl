import { IKanbanCardPOST } from "@/types/tasks";
import * as yup from "yup";

const schema = yup.object<IKanbanCardPOST>().shape({
    id: yup.number().optional(),
    priority: yup.number().min(0).max(2).required(),
    name: yup.string().required(),
    description: yup.string().optional(),

    attachments: yup.array(yup.number().required()).required(),

    properties: yup.array(yup.number().min(0).required()).optional(),
    customers: yup.array(yup.number().min(0).required()).optional(),
    userIds: yup.array(yup.number().min(0).required()).min(1).required(),

    columnId: yup.number().min(0).required(),

    // TODO: supported by backend, but theoretically I should never update it!
    event: yup.string().optional(),
    withCalendar: yup.boolean().required(),

    // ------------------ Calendar Event Logic ----------------------------

    due: yup
        .tuple([yup.string().required(), yup.string().required()])
        .when("withCalendar", {
            is: true,
            then: (schema) => schema.required(),
            otherwise: (schema) => schema.transform(() => undefined),
        }),

    googleUserKey: yup.string().when("withCalendar", {
        is: true,
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.transform(() => undefined),
    }),
});

export default schema;

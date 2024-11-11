import { IKanbanCardPOST } from "@/types/tasks";
import * as yup from "yup";

const schema = yup.object<IKanbanCardPOST>().shape({
    id: yup.number().optional(),
    priority: yup.number().min(0).max(2).required(),
    name: yup.string().required(),
    description: yup.string().optional(),

    attachments: yup.array(yup.string().required()).required(),
    completed: yup.boolean().required(),

    propertyId: yup.number().optional(),
    customerId: yup.number().optional(),
    assigneeId: yup.number().min(0).required(),

    columnId: yup.number().min(0).required(),

    comments: yup
        .array(
            yup.object().shape({
                id: yup.number().optional(),
                creatorId: yup.number().min(0).required(),
                message: yup.string().required(),
            })
        )
        .required(),

    eventId: yup.string().optional(),
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

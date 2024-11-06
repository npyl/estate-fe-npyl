import { IKanbanCardPOST } from "@/types/tasks";
import * as yup from "yup";

const schema = yup.object<IKanbanCardPOST>().shape({
    id: yup.number().optional(),
    priority: yup.number().min(0).max(2).required(),
    name: yup.string().required(),
    description: yup.string().optional(),
    due: yup
        .tuple([yup.string().required(), yup.string().required()])
        .optional(),
    attachments: yup.array(yup.string().required()).required(),
    completed: yup.boolean().required(),

    propertyId: yup.number().min(0).required(),
    customerId: yup.number().min(0).required(),
    assigneeId: yup.number().min(0).required(),

    eventId: yup.string().required(),

    columnId: yup.number().min(0).required(),

    comments: yup
        .array(
            yup.object().shape({
                id: yup.number().optional(),
                avatar: yup.string().optional(),
                name: yup.string().optional(),
                createdAt: yup.string().optional(),
                messageType: yup.string().oneOf(["image", "text"]).required(),
                message: yup.string().required(),
            })
        )
        .required(),
});

export default schema;

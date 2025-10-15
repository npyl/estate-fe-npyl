import { IKanbanCardPOST } from "@/types/tasks";
import { z } from "zod";

interface ZodCompatibleReq extends Omit<IKanbanCardPOST, "columnId"> {
    // TODO: this is due to a bug in our @/components/Select (probably)
    columnId: string;
}

const schema = z
    .object({
        id: z.number().optional(),
        priority: z.number().min(0).max(2),
        name: z.string().min(1),
        description: z.string().optional(),

        attachments: z.array(z.number()),

        properties: z.array(z.number().min(0)).optional(),
        customers: z.array(z.number().min(0)).optional(),
        userIds: z.array(z.number().min(0)).min(1),

        columnId: z.string().nonempty(),

        labels: z.array(z.number()),

        // ------------------ Calendar Event Related ----------------------------

        event: z.string().optional(), // TODO: supported by backend, but theoretically I should never update it!
        withCalendar: z.boolean(),
        due: z.tuple([z.string().optional(), z.string().optional()]).optional(),
    })
    .refine(
        (data) => {
            if (data.withCalendar) return data?.due?.[0] && data?.due?.[1];
            return true;
        },
        {
            message:
                "due is required with non-empty strings when withCalendar is true",
            path: ["due"],
        }
    ) satisfies z.ZodType<ZodCompatibleReq>;

export default schema;

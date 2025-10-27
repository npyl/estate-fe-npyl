import {
    codeIsUnique,
    keyCodeIsUnique,
} from "@/sections/Properties/validators";
import z from "zod";

const getSchema = (
    initialCode: string | undefined,
    initialKeyCode: string | undefined
) =>
    z
        .object({
            code: z
                .string()
                .refine(
                    async (value) =>
                        (await codeIsUnique(initialCode, value)) === true,
                    {
                        message: "Code already exists",
                    }
                ),
            keyCode: z
                .string()
                .refine(
                    async (value) =>
                        (await keyCodeIsUnique(initialKeyCode, value)) === true,
                    {
                        message: "Key Code already exists",
                    }
                )
                .optional(),
            state: z.string(),
            details: z
                .object({
                    parkings: z
                        .array(
                            z.object({
                                parkingType: z.string().min(1, {
                                    message: "Parking type cannot be empty",
                                }),
                                spots: z
                                    .number()
                                    .positive({
                                        message:
                                            "Spots must be greater than zero",
                                    })
                                    // TODO: OnlyNumbersInput anomally
                                    .or(z.string()),
                            })
                        )
                        .optional(),
                    balconies: z
                        .array(
                            z.object({
                                side: z.string().min(1, {
                                    message: "Side cannot be empty",
                                }),
                                area: z
                                    .number()
                                    .positive({
                                        message:
                                            "Area must be greater than zero",
                                    })
                                    // TODO: OnlyNumbersInput anomally
                                    .or(z.string()),
                            })
                        )
                        .optional(),
                })
                .passthrough()
                .optional(),
        })
        .passthrough();

export default getSchema;

import { FC, PropsWithChildren, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TThreadMessageReq } from "@/types/email";
import { useSendEmailMutation } from "@/services/email";
import { useAuth } from "@/sections/use-auth";
import { TMessageBoxValues } from "../types";
import filesToBase64 from "./filesToBase64";
import { errorToast } from "@/components/Toaster";

interface FormProps extends PropsWithChildren {
    to?: string[];

    // INFO: subject is required when replying to a thread
    subject?: string;
    threadId?: string;

    toFreeSoloed?: string[];
    body?: string;
    propertyIds?: number[];
    onClose: VoidFunction;
}

const Form: FC<FormProps> = ({
    subject,
    body,
    threadId,
    to,
    toFreeSoloed,
    propertyIds,
    onClose,
    children,
}) => {
    const { user } = useAuth();
    const [sendEmail] = useSendEmailMutation();

    const onSubmit = useCallback(
        async (d: TMessageBoxValues) => {
            if (!d.subject) {
                errorToast("EMAIL_REQUIRES_TITLE");
                return;
            }

            const { toFreeSoloed, attachments: _attachments, ...rest } = d;

            const attachments = await filesToBase64(_attachments);

            const body = {
                ...rest,
                to: [...rest.to, ...toFreeSoloed],
                attachments,
            } as TThreadMessageReq;

            const res = await sendEmail({
                body,
                userId: user?.id!,
            });

            if ("error" in res) return;

            onClose();
        },
        [user?.id!]
    );

    const methods = useForm<TMessageBoxValues>({
        defaultValues: {
            subject,
            threadId,
            body,
            to,
            toFreeSoloed,
            propertyIds: propertyIds ?? [],
            attachments: [],
        },
    });

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormProvider {...methods}>{children}</FormProvider>
        </form>
    );
};

export type { FormProps };
export default Form;

import { FC, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TThreadMessageReq } from "@/types/email";
import { useSendEmailMutation } from "@/services/email";
import { useAuth } from "@/hooks/use-auth";
import Content from "./Content";
import { TMessageBoxValues } from "./types";
import filesToBase64 from "./filesToBase64";

interface MessageBoxProps {
    to?: string[];

    // INFO: subject is required when replying to a thread
    subject?: string;
    threadId?: string;

    toFreeSoloed?: string[];
    body?: string;
    propertyIds?: number[];
    onClose: VoidFunction;
}

const MessageBox: FC<MessageBoxProps> = ({
    to = [],
    // ...
    subject = "",
    threadId = "",
    // ...
    toFreeSoloed = [],
    body = "",
    propertyIds = [],
    onClose,
}) => {
    const { user } = useAuth();
    const [sendEmail] = useSendEmailMutation();

    const threadMode = Boolean(threadId);

    const onSubmit = useCallback(
        async (d: TMessageBoxValues) => {
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
            <FormProvider {...methods}>
                <Content thread={threadMode} onClose={onClose} />
            </FormProvider>
        </form>
    );
};

export default MessageBox;

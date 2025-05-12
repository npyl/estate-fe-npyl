import { FC, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IEmailReq } from "@/types/email";
import { useSendEmailMutation } from "@/services/email";
import { useAuth } from "@/hooks/use-auth";
import Content from "./Content";
import { TMessageBoxValues } from "./types";
import useValues from "./useValues";

interface MessageBoxProps {
    to?: string[];
    propertyIds?: number[];
    onClose: VoidFunction;
}

const MessageBox: FC<MessageBoxProps> = ({
    to = [],
    propertyIds = [],
    onClose,
}) => {
    const { user } = useAuth();
    const [sendEmail] = useSendEmailMutation();

    const onSubmit = useCallback(
        async (d: TMessageBoxValues) => {
            const { toFreeSoloed, ...rest } = d;

            const body = {
                ...rest,
                to: [...rest.to, ...toFreeSoloed],
            } as IEmailReq;

            await sendEmail({
                body,
                userId: user?.id!,
            });
        },
        [user?.id!]
    );

    const values = useValues(to, propertyIds);

    const methods = useForm<TMessageBoxValues>({
        values,
    });

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
                <Content onClose={onClose} />
            </FormProvider>
        </form>
    );
};

export default MessageBox;

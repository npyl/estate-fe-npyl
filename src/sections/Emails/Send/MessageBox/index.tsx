import { FC, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IEmailReq } from "@/types/email";
import { useSendEmailMutation } from "@/services/email";
import { useAuth } from "@/hooks/use-auth";
import Content from "./Content";

interface MessageBoxProps {
    to?: string;
    propertyIds?: number[];
    onClose: VoidFunction;
}

const MessageBox: FC<MessageBoxProps> = ({ onClose }) => {
    const { user } = useAuth();
    const [sendEmail] = useSendEmailMutation();

    const onSubmit = useCallback(
        async (body: IEmailReq) => {
            await sendEmail({
                body,
                userId: user?.id!,
            });
        },
        [user?.id!]
    );

    const methods = useForm<IEmailReq>({
        values: {
            body: "",
            to: [],
            propertyIds: [],
        },
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

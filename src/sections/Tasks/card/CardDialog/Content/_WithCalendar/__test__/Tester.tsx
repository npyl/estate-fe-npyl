import { ICreateOrUpdateTaskReq } from "@/types/tasks";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import WithCalendar from "@/sections/Tasks/card/CardDialog/Content/_WithCalendar";

interface TesterProps {
    defaultValues?: Partial<ICreateOrUpdateTaskReq>;
}

const Tester: FC<TesterProps> = ({ defaultValues = {} }) => {
    const methods = useForm<ICreateOrUpdateTaskReq>({
        defaultValues: {
            userIds: [],
            withCalendar: false,
            due: [],
            ...defaultValues,
        },
    });

    return (
        <FormProvider {...methods}>
            <WithCalendar />
        </FormProvider>
    );
};

export type { TesterProps };
export default Tester;

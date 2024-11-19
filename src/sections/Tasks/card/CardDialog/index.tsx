import Dialog from "@/components/Dialog";
import { ICreateOrUpdateTaskReq, IKanbanCard } from "@/types/tasks";
import { FC, useCallback } from "react";
import {
    DialogSx,
    StyledDialogActions,
    StyledDialogContent,
    StyledDialogTitle,
} from "./styled";
import TaskLabel from "./TaskLabel";
import Content from "./Content";
import Actions from "./Actions";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import {
    useCreateOrUpdateTaskMutation,
    useGetCardQuery,
} from "@/services/tasks";
import { IKanbanCardRes2Req } from "@/types/tasks/mapper";

interface DetailsProps {
    task?: IKanbanCard;
    columnId?: number;
    onClose: VoidFunction;
}

const Details: FC<DetailsProps> = ({ task, columnId = -1, onClose }) => {
    const { name, uniqueCode } = task || {};

    const methods = useForm<ICreateOrUpdateTaskReq>({
        values: {
            ...IKanbanCardRes2Req(task),
            columnId,
        },
        resolver: yupResolver(schema),
    });

    console.log("values: ", methods.watch());
    console.log("errors: ", methods.formState.errors);

    const [createOrUpdate] = useCreateOrUpdateTaskMutation();

    const handleSubmit = useCallback(
        async (d: ICreateOrUpdateTaskReq) => {
            await createOrUpdate(d);
            onClose();
        },
        [onClose]
    );

    return (
        <FormProvider {...methods}>
            <Dialog
                open
                submit
                onSubmit={methods.handleSubmit(handleSubmit)}
                // ...
                sx={DialogSx}
                DialogTitleComponent={StyledDialogTitle}
                DialogContentComponent={StyledDialogContent}
                DialogActionsComponent={StyledDialogActions}
                // ...
                title={<TaskLabel name={name} taskCode={uniqueCode} />}
                content={
                    <Content
                        cardId={task?.id}
                        columnId={columnId}
                        // ...
                        createdAt={task?.createdAt}
                        updatedAt={task?.updatedAt}
                    />
                }
                actions={<Actions onClose={onClose} />}
            />
        </FormProvider>
    );
};

// ------------------------------------------------------------------

interface WrapperProps extends Omit<DetailsProps, "task"> {
    taskId?: number;
}

const Wrapper: FC<WrapperProps> = ({ taskId, ...props }) => {
    const { data: task } = useGetCardQuery(taskId!, {
        skip: taskId === undefined,
    });

    if (taskId && task) return <Details task={task} {...props} />;

    return <Details {...props} />;
};

export default Wrapper;

import Dialog from "@/components/Dialog";
import { ICreateOrUpdateTaskReq, IKanbanCard } from "@/types/tasks";
import { FC, useCallback } from "react";
import {
    DialogSx,
    StyledDialogActions,
    StyledDialogContent,
    StyledDialogTitle,
} from "./styled";
import Content from "./Content";
import Actions from "./Actions";
import { FormProvider } from "react-hook-form";
import schema from "./schema";
import {
    useCreateOrUpdateTaskMutation,
    useGetCardQuery,
} from "@/services/tasks";
import { IKanbanCardRes2Req } from "@/types/tasks/mapper";
import TaskTitle from "./TaskTitle";
import useFormPersist from "@/components/hook-form/useFormPersist";
import useCookieKey from "./useCookieKey";
import { TASK } from "@/constants/tests";
import { zodResolver } from "@hookform/resolvers/zod";

// ------------------------------------------------------------------------------------------

const getValues = (task?: IKanbanCard) => IKanbanCardRes2Req(task);

// ------------------------------------------------------------------------------------------

interface DetailsProps {
    quickCreate?: boolean; // INFO: (true) for when creating a task from another resource e.g. Property, Customer so that form is already dirty
    task?: IKanbanCard;
    onClose: VoidFunction;
}

const Details: FC<DetailsProps> = ({ quickCreate = false, task, onClose }) => {
    const { name, uniqueCode } = task || {};

    const cookieKey = useCookieKey(quickCreate);
    const [methods, { PersistNotice, persistChanges }] =
        useFormPersist<ICreateOrUpdateTaskReq>(cookieKey, onClose, {
            dialog: true,
            resolver: zodResolver(schema),
            values: getValues(task),
        });

    const [createOrUpdate] = useCreateOrUpdateTaskMutation();

    const handleSubmit = useCallback(async (d: ICreateOrUpdateTaskReq) => {
        const res = await createOrUpdate(d);
        return Boolean(res);
    }, []);

    const handleClose = useCallback(() => {
        persistChanges();
        onClose();
    }, [persistChanges, onClose]);

    return (
        <FormProvider {...methods}>
            <Dialog
                data-testid={TASK.DIALOG_ID}
                submit
                onSubmit={methods.handleSubmit(handleSubmit)}
                onClose={handleClose}
                // ...
                sx={DialogSx}
                DialogTitleComponent={StyledDialogTitle}
                DialogContentComponent={StyledDialogContent}
                DialogActionsComponent={StyledDialogActions}
                // ...
                title={<TaskTitle name={name} taskCode={uniqueCode} />}
                content={
                    <>
                        {PersistNotice}
                        <Content
                            cardId={task?.id}
                            // ...
                            updatedAt={task?.updatedAt}
                            reporter={task?.reporter}
                            updatedBy={task?.updatedBy}
                        />
                    </>
                }
                actions={
                    <Actions quickCreate={quickCreate} onClose={handleClose} />
                }
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

// ------------------------------------------------------------------

export { Details };
export default Wrapper;

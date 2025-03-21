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
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import {
    useCreateOrUpdateTaskMutation,
    useGetCardQuery,
} from "@/services/tasks";
import { IKanbanCardRes2Req } from "@/types/tasks/mapper";
import TaskTitle from "./TaskTitle";
import useFormPersist from "@/components/hook-form/useFormPersist";
import Pusher from "@/sections/Tasks/Pusher";

// ------------------------------------------------------------------------------------------

const getValues = (task?: IKanbanCard) => IKanbanCardRes2Req(task);

// ------------------------------------------------------------------------------------------

const getCookieKey = (id: number = -1) =>
    id === -1 ? `PPTaskForm-create` : `PPTaskForm-${id}`;

interface DetailsProps {
    quickCreate?: boolean; // INFO: (true) for when creating a task from another resource e.g. Property, Customer so that form is already dirty
    task?: IKanbanCard;
    onClose: VoidFunction;
}

const Details: FC<DetailsProps> = ({ quickCreate = false, task, onClose }) => {
    const { name, uniqueCode } = task || {};

    const cookieKey = getCookieKey(task?.id);
    const [methods, { PersistNotice, persistChanges }] =
        useFormPersist<ICreateOrUpdateTaskReq>(cookieKey, onClose, {
            dialog: true,
            resolver: yupResolver(schema),
            values: getValues(task),
        });

    // INFO: flag to know whether we are editing (w/ calendar);
    // Here, it is important to differenciate between a normal edit and an edit w/ calendar
    const haveEvent = Boolean(task?.event);

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
        <>
            <Pusher taskId={task?.id} />

            <FormProvider {...methods}>
                {PersistNotice}

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
                    title={<TaskTitle name={name} taskCode={uniqueCode} />}
                    content={
                        <Content
                            cardId={task?.id}
                            // ...
                            createdAt={task?.createdAt}
                            updatedAt={task?.updatedAt}
                            // ...
                            haveEvent={haveEvent}
                        />
                    }
                    actions={
                        <Actions
                            quickCreate={quickCreate}
                            onClose={handleClose}
                        />
                    }
                />
            </FormProvider>
        </>
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

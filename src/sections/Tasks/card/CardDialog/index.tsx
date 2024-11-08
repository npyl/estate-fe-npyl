import Dialog from "@/components/Dialog";
import { ICreateOrUpdateTaskReq, IKanbanCard } from "@/types/tasks";
import { FC } from "react";
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
import { useCreateOrUpdateTaskMutation } from "@/services/tasks";
import { IKanbanCardRes2Req } from "@/types/tasks/mapper";

interface DetailsProps {
    task?: IKanbanCard;
    columnId?: number;
    onClose: VoidFunction;
}

const Details: FC<DetailsProps> = ({ task, columnId, onClose }) => {
    const methods = useForm<ICreateOrUpdateTaskReq>({
        values: {
            ...IKanbanCardRes2Req(task),
            columnId: columnId || -1,
        },
        resolver: yupResolver(schema),
    });

    console.log("errors: ", methods.formState.errors);

    const [createOrUpdate] = useCreateOrUpdateTaskMutation();

    const handleSubmit = async (d: ICreateOrUpdateTaskReq) => {
        await createOrUpdate(d);
    };

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
                title={<TaskLabel name={task?.name} taskId={task?.id} />}
                content={
                    <Content
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

export default Details;

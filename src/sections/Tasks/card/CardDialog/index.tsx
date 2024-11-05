import Dialog from "@/components/Dialog";
import {
    IKanbanCard,
    IKanbanCardPOST,
    IKanbanCardRes2Req,
} from "@/types/tasks";
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

interface DetailsProps {
    task?: IKanbanCard;
    columnId?: number;
    onClose: VoidFunction;
}

const Details: FC<DetailsProps> = ({ task, columnId, onClose }) => {
    const methods = useForm<IKanbanCardPOST>({
        values: { ...IKanbanCardRes2Req(task), columnId: columnId || -1 },
    });

    const handleSubmit = (d: IKanbanCardPOST) => {
        alert("EDW!");
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
                content={<Content columnId={columnId} />}
                actions={<Actions onClose={onClose} />}
            />
        </FormProvider>
    );
};

export default Details;

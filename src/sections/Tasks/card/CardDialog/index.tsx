import Dialog from "@/components/Dialog";
import { IKanbanCard } from "@/types/tasks";
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

interface DetailsProps {
    task?: IKanbanCard;
    columnId?: number;
    onClose: VoidFunction;
}

const Details: FC<DetailsProps> = ({ task, columnId, onClose }) => (
    <Dialog
        open
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
);

export default Details;

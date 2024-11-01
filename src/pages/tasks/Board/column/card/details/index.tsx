import Dialog from "@/components/Dialog";
import { IKanbanCard } from "@/types/kanban";
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
    task: IKanbanCard;
    onClose: VoidFunction;
}

const Details: FC<DetailsProps> = ({ task, onClose }) => (
    <Dialog
        open
        // ...
        sx={DialogSx}
        DialogTitleComponent={StyledDialogTitle}
        DialogContentComponent={StyledDialogContent}
        DialogActionsComponent={StyledDialogActions}
        // ...
        title={<TaskLabel taskId={task.id} />}
        content={<Content task={task} />}
        actions={<Actions onClose={onClose} />}
    />
);

export default Details;

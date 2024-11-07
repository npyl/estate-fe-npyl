import Dialog from "@/components/Dialog";
import {
    ICreateOrUpdateTaskReq,
    IKanbanCard,
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
import EventDates from "@/sections/Calendar/Event/form/EventDates";
import { useAuth } from "@/hooks/use-auth";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import useEventDates from "@/sections/Calendar/Event/form/EventDates/useEventDates";
import { useCreateOrUpdateTaskMutation } from "@/services/tasks";

interface DetailsProps {
    task?: IKanbanCard;
    columnId?: number;
    onClose: VoidFunction;
}

const Details: FC<DetailsProps> = ({ task, columnId, onClose }) => {
    const { user } = useAuth();

    const {
        _isAllDay,
        _allDayDate,
        // ...
        isAllDay,
        allDayDate,
        // ...
        onAllDayChange,
        onAllDayDateChange,
    } = useEventDates({
        startDate: task?.due[0]!,
        endDate: task?.due[1]!,
    });

    const methods = useForm<ICreateOrUpdateTaskReq>({
        values: {
            ...IKanbanCardRes2Req(task),
            columnId: columnId || -1,
            reporterId: user?.id!,
        },
        resolver: yupResolver(schema),
    });

    console.log("errors: ", methods.formState.errors);

    const isDirty =
        _isAllDay !== isAllDay ||
        _allDayDate !== allDayDate ||
        methods.formState.isDirty;

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
                        DatePicker={
                            <EventDates
                                allDay={isAllDay}
                                allDayDate={allDayDate}
                                // ...
                                onAllDayChange={onAllDayChange}
                                onAllDayDateChange={onAllDayDateChange}
                                // ...
                                startDateKey="due.0"
                                endDateKey="due.1"
                                mt={2}
                            />
                        }
                    />
                }
                actions={<Actions dirty={isDirty} onClose={onClose} />}
            />
        </FormProvider>
    );
};

export default Details;

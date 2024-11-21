import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import AssignmentIcon from "@mui/icons-material/Assignment";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import { FC, useLayoutEffect, useMemo, useState } from "react";
import { ContactNotificationExtended } from "@/types/notification";
import { IKanbanCard } from "@/types/tasks";
import { TranslationType } from "@/types/translation";
import { useLazyFindByEmailQuery } from "@/services/customers";
import { ICustomerMini } from "@/types/customer";

const TaskDialog = dynamic(() =>
    import("@/sections/Tasks/card/CardDialog").then(({ Details }) => Details)
);

// ------------------------------------------------------------------------

const getTaskForNotification = (
    t: TranslationType,
    propertyTile: string | undefined,
    {
        customerEmail,
        customerMobile,
        customerName,
        // ...
        message,
    }: ContactNotificationExtended,
    customer?: ICustomerMini
): Partial<IKanbanCard> => {
    const NAME = t("Tour request for");
    const CONTACT_DETAILS = t("Contact Details");
    const FULLNAME = t("Full Name");
    const MOBILE = t("Mobile");

    const name = `${NAME} (${propertyTile || customerName || "-"})`;

    const description = customer
        ? message
        : `${message}\n\n${CONTACT_DETAILS}:\n${FULLNAME}: \t${customerName}\nEmail: \t${customerEmail}\n${MOBILE}: \t${customerMobile}`;

    return {
        name,
        description,
        customers: customer ? [customer] : [],
        priority: 1,
    };
};

interface TaskDialogProps {
    data: ContactNotificationExtended;
    onClose: VoidFunction;
}

const TaskDialogForNotification: FC<TaskDialogProps> = ({ data, onClose }) => {
    const { t, i18n } = useTranslation();

    const [findByEmail] = useLazyFindByEmailQuery();

    const [task, setTask] = useState<IKanbanCard>();

    useLayoutEffect(() => {
        const lang = i18n.language === "en" ? "en" : "el";
        const propertyTitle = data?.property?.descriptions?.[lang].title;

        const getTask = async () => {
            const { customerEmail } = data;

            let customer: ICustomerMini | undefined = undefined;

            // INFO: attempt to find customer with this email!
            try {
                customer = await findByEmail(customerEmail).unwrap();
            } catch (ex) {
                // ...
            }

            // TODO: this is supported by our Dialog; Probably find a better way though...
            return getTaskForNotification(
                t,
                propertyTitle,
                data,
                customer
            ) as IKanbanCard;
        };

        getTask().then(setTask);
    }, [t, i18n.language, data]);

    if (!task) return null;

    return <TaskDialog task={task} onClose={onClose} />;
};

// ------------------------------------------------------------------------

interface CreateTaskButtonProps {
    data: ContactNotificationExtended;
}

const CreateTaskButton: FC<CreateTaskButtonProps> = ({ data }) => {
    const { t } = useTranslation();

    const [isOpen, openTask, closeTask] = useDialog();

    return (
        <>
            <Button
                onClick={openTask}
                variant="contained"
                endIcon={<AssignmentIcon />}
                sx={{
                    width: "max-content",
                    textWrap: "nowrap",
                }}
            >
                {t("New Task")}
            </Button>

            {isOpen ? (
                <TaskDialogForNotification data={data} onClose={closeTask} />
            ) : null}
        </>
    );
};

export default CreateTaskButton;

import { IKanbanCard } from "@/types/kanban";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MultilineTextField from "@/components/MultilineTextField";
import { useTranslation } from "react-i18next";
import Reporter from "./Reporter";
import PropertySelect from "./Property";
import CustomerSelect from "./Customer";
import AssigneeSelect from "./Assignee";
import PriorityButtonGroup from "./Priority";

// -----------------------------------------------------------------

const Buttons = () => {
    return (
        <Stack direction="row" spacing={1}>
            <Button
                variant="contained"
                sx={{
                    bgcolor: "info.dark",
                }}
                startIcon={<AttachFileIcon />}
            >
                Attach
            </Button>
            <Select value="">Marketing</Select>
        </Stack>
    );
};

// -----------------------------------------------------------------

interface ContentProps {
    task: IKanbanCard;
}

const Content: FC<ContentProps> = ({ task }) => {
    const { name } = task;

    const { t } = useTranslation();

    return (
        <>
            <Typography mb={3} variant="h5">
                {name}
            </Typography>

            <Stack spacing={2}>
                <Buttons />

                <MultilineTextField
                    multiline
                    rows={5}
                    label={t("Description")}
                />

                <PropertySelect />
                <CustomerSelect />
                <AssigneeSelect />

                <Stack alignItems="center">
                    <PriorityButtonGroup />
                </Stack>

                <Reporter />
            </Stack>
        </>
    );
};

export default Content;

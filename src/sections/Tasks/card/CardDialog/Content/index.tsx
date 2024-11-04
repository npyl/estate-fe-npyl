import Button from "@mui/material/Button";
import Select, { SelectProps } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MultilineTextField from "@/components/MultilineTextField";
import { useTranslation } from "react-i18next";
import Reporter from "./Reporter";
import PropertySelect from "./Property";
import CustomerSelect from "./Customer";
import AssigneeSelect from "./Assignee";
import PriorityButtonGroup from "./Priority";
import { FC } from "react";
import { useGetBoardQuery } from "@/services/tasks";
import { IKanbanColumn } from "@/types/tasks";
import MenuItem from "@mui/material/MenuItem";

// -----------------------------------------------------------------

const useBoardColumns = () => {
    const { data } = useGetBoardQuery();
    return data?.columns;
};

const getOption = ({ id, name }: IKanbanColumn) => (
    <MenuItem key={id} value={id}>
        {name}
    </MenuItem>
);

const ColumnSelect: FC<SelectProps> = (props) => {
    const { t } = useTranslation();
    const columns = useBoardColumns();
    return (
        <Select {...props}>
            <MenuItem>{t("Not selected")}</MenuItem>
            {columns?.map(getOption)}
        </Select>
    );
};

interface ButtonsProps {
    columnId?: number;
}

const Buttons: FC<ButtonsProps> = ({ columnId }) => {
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

            <ColumnSelect defaultValue={columnId} />
        </Stack>
    );
};

// -----------------------------------------------------------------

interface ContentProps {
    columnId?: number;
}

const Content: FC<ContentProps> = ({ columnId }) => {
    const { t } = useTranslation();

    return (
        <Stack spacing={2}>
            <Buttons columnId={columnId} />

            <MultilineTextField multiline rows={5} label={t("Description")} />

            <PropertySelect />
            <CustomerSelect />
            <AssigneeSelect />

            <Stack alignItems="center">
                <PriorityButtonGroup />
            </Stack>

            <Reporter />
        </Stack>
    );
};

export default Content;

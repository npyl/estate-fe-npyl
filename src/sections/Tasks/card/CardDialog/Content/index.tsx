import Button from "@mui/material/Button";
import { SelectProps } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import AttachFileIcon from "@mui/icons-material/AttachFile";
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
import { FormControl, InputLabel } from "@mui/material";
import { RHFSelect } from "@/components/hook-form";
import RHFMultilineTextField from "@/components/hook-form/RHFTextFieldMultiline";

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
        <FormControl>
            <InputLabel>{props.label}</InputLabel>
            <RHFSelect name="columnId" {...props}>
                <MenuItem>{t("No option")}</MenuItem>
                {columns?.map(getOption)}
            </RHFSelect>
        </FormControl>
    );
};

interface ButtonsProps {
    columnId?: number;
}

const Buttons: FC<ButtonsProps> = ({ columnId }) => {
    const { t } = useTranslation();

    return (
        <Stack direction="row" spacing={1}>
            <Button
                variant="contained"
                sx={{
                    bgcolor: "info.dark",
                }}
                startIcon={<AttachFileIcon />}
            >
                {t("Attach")}
            </Button>

            <ColumnSelect
                label={t("_Column_")}
                defaultValue={columnId}
                sx={{
                    minWidth: "150px",
                }}
            />
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

            {/* <DatePickets /> */}

            <RHFMultilineTextField
                name="description"
                label={t("Description")}
                multiline
                rows={5}
            />

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

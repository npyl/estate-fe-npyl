import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import Reporter from "./Reporter";
import PropertySelect from "./Property";
import CustomerSelect from "./Customer";
import AssigneeSelect from "./Assignee";
import PriorityButtonGroup from "./Priority";
import { FC, PropsWithChildren, ReactNode, useCallback, useState } from "react";
import RHFMultilineTextField from "@/components/hook-form/RHFTextFieldMultiline";
import Buttons from "./Buttons";
import Attachments from "./Attachments";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import { IOSSwitch } from "@/components/iOSSwitch";
import { RHFSwitch, RHFTextField } from "@/components/hook-form";

// let due: [string, string] | undefined = undefined;

// if (withCalendarEvent && d?.due) {
//     // INFO: normalise dates if isAllDay
//     due = (
//         isAllDay ? getAllDayStartEnd(allDayDate) : [d.due[0], d.due[1]]
//     ) as [string, string];
// }

const SwitchSx = {
    gap: 1,
    ml: 0,
    "& .MuiFormControlLabel-label": {
        color: "text.secondary",
    },
};

const WithCalendar: FC<PropsWithChildren> = ({ children }) => {
    const { t } = useTranslation();

    const [isOpen, setOpen] = useState(false);
    const handleChange = useCallback((_: any, b: boolean) => setOpen(b), []);

    return (
        <Box>
            <FormControlLabel
                label={t("Connect with Calendar")}
                labelPlacement="start"
                control={<IOSSwitch />}
                checked={isOpen}
                onChange={handleChange}
                sx={SwitchSx}
            />

            {isOpen ? <Collapse in>{children}</Collapse> : null}
        </Box>
    );
};

// -----------------------------------------------------------------

interface ContentProps {
    columnId?: number;
    DatePicker: ReactNode;
}

const Content: FC<ContentProps> = ({ columnId, DatePicker }) => {
    const { t } = useTranslation();

    return (
        <Stack spacing={2} mt={3}>
            {/* ------------------------ */}
            <Buttons columnId={columnId} />
            <Attachments />
            {/* ------------------------ */}

            <Divider />
            <WithCalendar>{DatePicker}</WithCalendar>
            <Divider />

            <RHFTextField name="name" label={t("Name")} />
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

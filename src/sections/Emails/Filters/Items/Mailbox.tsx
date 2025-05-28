import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import { TranslationType } from "@/types/translation";
import { ComponentType, useCallback, useMemo } from "react";
import MenuItem from "@mui/material/MenuItem";
import InboxIcon from "@mui/icons-material/Inbox";
import OutboxIcon from "@mui/icons-material/Outbox";
import { SxProps, Theme } from "@mui/material";
import { useFiltersContext } from "../Context";
import { TMailbox } from "@/types/email";

interface IOption {
    key: TMailbox;
    label: string;
    Icon: ComponentType<any>;
}

const getOPTIONS = (t: TranslationType): IOption[] => [
    { key: "INBOX", label: t("Inbox"), Icon: InboxIcon },
    { key: "SENT", label: t("Sent"), Icon: OutboxIcon },
];

const MenuItemSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    alignItems: "center",
    color: "text.secondary",
};

const getOption = ({ key, label, Icon }: IOption) => (
    <MenuItem key={key} value={key} sx={MenuItemSx}>
        <Icon fontSize="small" />
        {label}
    </MenuItem>
);

const slotProps: SelectProps["slotProps"] = {
    input: {
        sx: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
        },
    },
};

const MailboxFilter = () => {
    const { t } = useTranslation();

    const { box, setBox } = useFiltersContext();
    const onChange = useCallback(
        (e: SelectChangeEvent) => setBox(e.target.value as TMailbox),
        []
    );

    const OPTIONS = useMemo(() => getOPTIONS(t), [t]);

    return (
        <Select value={box} onChange={onChange} slotProps={slotProps}>
            {OPTIONS.map(getOption)}
        </Select>
    );
};

export default MailboxFilter;

import { TCalendarEventType } from "@/components/Calendar/types";
import Box, { BoxProps } from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { FC, PropsWithChildren, useCallback } from "react";
import { useTranslation } from "react-i18next";

const Bullet: FC<BoxProps> = (props) => (
    <Box width={10} height={10} borderRadius="100%" p={1} {...props} />
);

interface Props<T extends string = TCalendarEventType>
    extends PropsWithChildren {
    type: T;
    onChange: (t: T) => void;
}

const TypeSelect = <T extends string>({
    type,
    onChange,
    children,
}: Props<T>) => {
    const { t } = useTranslation();

    const handleChange = useCallback(
        (_: any, value: T) => onChange(value),
        [onChange]
    );

    return (
        <ToggleButtonGroup
            exclusive
            size="small"
            value={type}
            onChange={handleChange}
        >
            {children}
            <ToggleButton value="TASK">
                <Bullet bgcolor="red" />
                <Typography ml={1}>{t("Task")}</Typography>
            </ToggleButton>
            <ToggleButton value="MEETING">
                <Bullet bgcolor="green" />
                <Typography ml={1}>{t("Meeting")}</Typography>
            </ToggleButton>
            <ToggleButton value="TOUR_ONLINE">
                <Bullet bgcolor="cyan" />
                <Typography ml={1}>{t("Tour online")}</Typography>
            </ToggleButton>
            <ToggleButton value="TOUR_INPERSON">
                <Bullet bgcolor="blue" />
                <Typography ml={1}>{t("Tour in person")}</Typography>
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default TypeSelect;

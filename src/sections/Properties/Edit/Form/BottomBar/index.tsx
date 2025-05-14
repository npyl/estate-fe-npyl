import Stack from "@mui/material/Stack";
import SubmitButton from "./SubmitButton";
import CancelButton from "./CancelButton";
import GenerateCheckbox, { GenerateCheckboxRef } from "./GenerateCheckbox";
import { FC, ReactNode, RefObject } from "react";
import FormBottomBar, { FormBottomBarProps } from "@/sections/FormBottomBar";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
interface BottomBarProps
    extends Omit<FormBottomBarProps, "contentLeft" | "contentRight"> {
    PersistNotice?: ReactNode;
    checkboxRef: RefObject<GenerateCheckboxRef>;
    onSubmitWithoutRedirect: () => void;
}

const BottomBar: FC<BottomBarProps> = ({
    PersistNotice,
    checkboxRef,
    onSubmitWithoutRedirect,
}) => {
    const { t } = useTranslation();

    return (
        <FormBottomBar
            contentLeft={PersistNotice}
            contentRight={
                <Stack direction="row" spacing={1} alignItems="center">
                    <CancelButton />

                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        bgcolor="background.neutral"
                        borderRadius={1}
                    >
                        <GenerateCheckbox ref={checkboxRef} />
                        <Tooltip
                            placement="top"
                            title={t("Save Without Redirect")}
                        >
                            <SaveAsOutlinedIcon
                                onClick={onSubmitWithoutRedirect}
                                sx={{
                                    color: "primary.main",
                                    cursor: "pointer",
                                }}
                            />
                        </Tooltip>

                        <SubmitButton />
                    </Stack>
                </Stack>
            }
        />
    );
};

export default BottomBar;

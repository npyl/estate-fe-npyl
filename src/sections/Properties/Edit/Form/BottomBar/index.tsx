import Stack from "@mui/material/Stack";
import SubmitButton from "./SubmitButton";
import CancelButton from "./CancelButton";
import GenerateCheckbox, { GenerateCheckboxRef } from "./GenerateCheckbox";
import { FC, ReactNode, RefObject } from "react";
import FormBottomBar, { FormBottomBarProps } from "@/sections/FormBottomBar";
import SubmitWithoutRedirectButton from "./SubmitWithoutRedirectButton";

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
}) => (
    <FormBottomBar
        contentLeft={PersistNotice}
        contentRight={
            <Stack direction="row" spacing={1} alignItems="center">
                <CancelButton />

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    bgcolor="background.neutral"
                    borderRadius={1}
                >
                    <GenerateCheckbox ref={checkboxRef} />
                    <SubmitWithoutRedirectButton
                        onClick={onSubmitWithoutRedirect}
                    />
                    <SubmitButton />
                </Stack>
            </Stack>
        }
    />
);

export default BottomBar;

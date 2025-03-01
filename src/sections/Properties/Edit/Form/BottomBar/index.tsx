import Stack from "@mui/material/Stack";
import ClearButton from "./ClearButton";
import SubmitButton from "./SubmitButton";
import CancelButton from "./CancelButton";
import GenerateCheckbox, { GenerateCheckboxRef } from "./GenerateCheckbox";
import { FC, ReactNode, RefObject } from "react";
import Divider from "@mui/material/Divider";
import FormBottomBar, { FormBottomBarProps } from "@/sections/FormBottomBar";

interface BottomBarProps
    extends Omit<FormBottomBarProps, "contentLeft" | "contentRight"> {
    PersistNotice?: ReactNode;
    checkboxRef: RefObject<GenerateCheckboxRef>;
}

const BottomBar: FC<BottomBarProps> = ({ PersistNotice, checkboxRef }) => (
    <FormBottomBar
        contentLeft={PersistNotice}
        contentRight={
            <Stack direction="row" spacing={1} alignItems="center">
                <CancelButton />
                <ClearButton />

                <Divider />

                <GenerateCheckbox ref={checkboxRef} />
                <SubmitButton />
            </Stack>
        }
    />
);

export default BottomBar;

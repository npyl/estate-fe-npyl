import Stack from "@mui/material/Stack";
import ClearButton from "./ClearButton";
import SubmitButton from "./SubmitButton";
import CancelButton from "./CancelButton";
import GenerateCheckbox, { GenerateCheckboxRef } from "./GenerateCheckbox";
import { FC, RefObject } from "react";
import Divider from "@mui/material/Divider";

interface BottomBarProps {
    checkboxRef: RefObject<GenerateCheckboxRef>;
}

const BottomBar: FC<BottomBarProps> = ({ checkboxRef }) => (
    <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
        mt={2}
        sx={{
            backgroundColor: "rgba(128, 128, 128, 0.1)",
            width: "100%",
            p: 0.5,
            alignSelf: "flex-end",
            borderRadius: "10px",
            position: "sticky",
            zIndex: 1000,
            bottom: 1,
        }}
    >
        <CancelButton />
        <ClearButton />

        <Divider />

        <GenerateCheckbox ref={checkboxRef} />
        <SubmitButton />
    </Stack>
);

export default BottomBar;

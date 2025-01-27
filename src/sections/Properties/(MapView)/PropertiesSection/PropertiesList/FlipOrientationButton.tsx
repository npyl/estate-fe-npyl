import FlipIcon from "@mui/icons-material/Flip";
import { Button, Stack } from "@mui/material";

interface Props {
    orientation: boolean;
    toggleOrientation: VoidFunction;
}

const FlipOrientationButton = ({ orientation, toggleOrientation }: Props) => (
    <Stack
        display={{ xs: "none", lg: "block" }}
        direction="row"
        justifyContent="flex-end"
        mb={1}
    >
        <Button onClick={toggleOrientation} sx={{ width: 30 }}>
            <FlipIcon
                sx={{
                    transform: orientation ? "rotate(0deg)" : "rotate(90deg)",
                    transition: "transform 0.2s",
                }}
            />
        </Button>
    </Stack>
);

export default FlipOrientationButton;

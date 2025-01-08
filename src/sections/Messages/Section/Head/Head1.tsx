import Stack from "@mui/material/Stack";
import { HEAD_HEIGHT } from "../constants";
import { getBorderColor2 } from "@/theme/borderColor";
const Head1 = () => (
    <Stack
        minHeight={HEAD_HEIGHT}
        height={HEAD_HEIGHT}
        maxHeight={HEAD_HEIGHT}
        borderBottom="1px solid"
        borderColor={getBorderColor2}
    />
);
export default Head1;

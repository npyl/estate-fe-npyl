import Stack from "@mui/material/Stack";
import { HEAD_HEIGHT } from "../../constants";
import { getBorderColor2 } from "@/theme/borderColor";
const BackButton = dynamic(() => import("./BackButton"));
import dynamic from "next/dynamic";
import Content from "./Content";

const Head1 = () => (
    <Stack
        minHeight={HEAD_HEIGHT}
        height={HEAD_HEIGHT}
        maxHeight={HEAD_HEIGHT}
        borderBottom="1px solid"
        borderColor={getBorderColor2}
        direction="row"
        spacing={1}
        alignItems="center"
        px={1}
    >
        <BackButton />
        <Content />
    </Stack>
);

export default Head1;

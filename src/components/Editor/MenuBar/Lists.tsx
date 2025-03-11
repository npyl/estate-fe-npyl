import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import MenuBarButton from "./MenuBarButton";
import Stack from "@mui/material/Stack";
import useCallbacks from "./useCallbacks";

const Lists = () => {
    const { toggleBulletList, toggleOrderedList } = useCallbacks();

    return (
        <Stack direction="row" alignItems="center">
            <MenuBarButton
                name="bulletList"
                onClick={toggleBulletList}
                icon={<FormatListBulletedIcon />}
            />

            <MenuBarButton
                name="orderedList"
                onClick={toggleOrderedList}
                icon={<FormatListNumberedIcon />}
            />
        </Stack>
    );
};

export default Lists;

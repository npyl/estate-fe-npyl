import AddIcon from "@mui/icons-material/Add";
import { SxProps, Theme } from "@mui/material";
import Fab, { FabProps } from "@mui/material/Fab";
import Link from "next/link";
import { FC } from "react";

const FabSx: SxProps<Theme> = {
    position: "fixed",
    bottom: ({ layout }) => layout.createFab.bottom,
    right: ({ layout }) => layout.createFab.right,
    zIndex: 1,
};

interface CreateFabProps extends FabProps {}

const CreateFab: FC<CreateFabProps> = ({ sx, ...props }) => (
    <Fab
        sx={{ ...FabSx, ...sx }}
        LinkComponent={Link}
        color="primary"
        {...props}
    >
        <AddIcon />
    </Fab>
);

export default CreateFab;

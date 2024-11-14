import IconButton from "@mui/material/IconButton";
import { FC, useCallback, useEffect, useState } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Fade from "@mui/material/Fade";
import { useSetColumnDoneMutation } from "@/services/tasks";

const iconStyle = { position: "absolute" };
const ButtonSx = { position: "relative", width: 40, height: 40 };

interface Props {
    columnId: number;
}

const MakeDoneButton: FC<Props> = ({ columnId }) => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setChecked((prev) => !prev), 1000);
        return () => clearInterval(timer);
    }, []);

    const [setDone] = useSetColumnDoneMutation();
    const handleClick = useCallback(() => setDone(columnId), []);

    return (
        <IconButton size="small" onClick={handleClick} sx={ButtonSx}>
            <Fade in={checked} timeout={200}>
                <CheckCircleIcon color="success" sx={iconStyle} />
            </Fade>
            <Fade in={!checked} timeout={500}>
                <RadioButtonUncheckedIcon sx={iconStyle} />
            </Fade>
        </IconButton>
    );
};

export default MakeDoneButton;

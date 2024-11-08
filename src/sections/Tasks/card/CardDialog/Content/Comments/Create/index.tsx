import { SxProps, Theme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useCallback, useState } from "react";
import SaveButton from "./SaveButton";
import ReporterAvatar from "./ReporterAvatar";
import { useTranslation } from "react-i18next";

const TextFieldSx: SxProps<Theme> = {
    "& .MuiOutlinedInput-root": {
        height: "48px",
        borderRadius: "16px",

        input: {
            "&::placeholder": {
                fontSize: "15px",
            },
        },
    },
};

const Create = () => {
    const { t } = useTranslation();

    const [message, setMessage] = useState("");
    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value),
        []
    );

    return (
        <TextField
            value={message}
            onChange={handleChange}
            placeholder={t<string>("Comment") + "..."}
            sx={TextFieldSx}
            InputProps={{
                startAdornment: <ReporterAvatar />,
                endAdornment: <SaveButton message={message} />,
            }}
        />
    );
};

export default Create;

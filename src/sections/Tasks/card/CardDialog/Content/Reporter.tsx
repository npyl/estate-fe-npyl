import { useAuth } from "@/hooks/use-auth";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { useTranslation } from "react-i18next";
import { SxProps, Theme } from "@mui/material";

const TextFieldSx: SxProps<Theme> = {
    "& .MuiOutlinedInput-root": {
        height: "54px",
        borderRadius: "16px",
    },
};

const Reporter = () => {
    const { t } = useTranslation();
    const { user } = useAuth();

    return (
        <TextField
            label={t("Reporter")}
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                readOnly: true,
                startAdornment: (
                    <InputAdornment position="start">
                        <Avatar src={user?.avatar} />
                    </InputAdornment>
                ),
            }}
            sx={TextFieldSx}
            value={`${user?.firstName} ${user?.lastName}`}
        />
    );
};

export default Reporter;

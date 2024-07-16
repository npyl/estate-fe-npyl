import { Button } from "@mui/material";
import { useFormContext } from "react-hook-form";

const ExportButton = () => {
    const {
        formState: { isSubmitSuccessful },
    } = useFormContext();

    if (!isSubmitSuccessful) return null;

    return <Button>Export</Button>;
};

export default ExportButton;

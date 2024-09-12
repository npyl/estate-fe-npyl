import AddIcon from "@mui/icons-material/Add";
import { useImageOperations } from "../../../../context/ImageOperations";
import StyledIconButton from "../../styled";

const AddButton = () => {
    const { upload, isLoading } = useImageOperations();

    const handleChange = (event: Event) => {
        const files = Array.from(
            (event.target as HTMLInputElement).files || []
        );

        upload(files);
    };

    const handleClick = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/png, image/jpeg";
        input.multiple = true;
        input.onchange = handleChange;
        input.click();
    };

    return (
        <StyledIconButton disabled={isLoading} onClick={handleClick}>
            <AddIcon />
        </StyledIconButton>
    );
};

export default AddButton;

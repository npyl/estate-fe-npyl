import { FC } from "react";
import ImagesPicker, { ImagePickerProps } from "./ImagesPicker";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Collapse from "@mui/material/Collapse";
import useToggle from "@/hooks/useToggle";
import { SpaceBetween } from "@/components/styled";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { Stack, SxProps, Theme } from "@mui/material";

const getToggleSx = (isExpanded: boolean): SxProps<Theme> => ({
    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.3s ease-in-out",
});

const PaperSx: SxProps<Theme> = {
    p: 1,
};

interface ImageSectionProps extends ImagePickerProps {}

const ImageSection: FC<ImageSectionProps> = (props) => {
    const { t } = useTranslation();
    const [isOpen, toggle] = useToggle();

    return (
        <Paper sx={PaperSx}>
            <SpaceBetween alignItems="center">
                <Typography variant="h5">{t("Images")}</Typography>
                <IconButton onClick={toggle} sx={getToggleSx(isOpen)}>
                    <ExpandMoreIcon />
                </IconButton>
            </SpaceBetween>
            <Collapse in={isOpen}>
                <Stack mt={1} />
                <ImagesPicker {...props} />
            </Collapse>
        </Paper>
    );
};

export default ImageSection;

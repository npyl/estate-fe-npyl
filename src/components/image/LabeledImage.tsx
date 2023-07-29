import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import Image from "src/components/image/Image";
import { LabeledImageProps } from "./types";

const ImageContainer = styled("div")`
    position: relative;
`;

const Label = styled(Typography)`
    position: absolute;
    top: ${({ theme }) => theme.spacing(1)};
    right: ${({ theme }) => theme.spacing(1)};
    background: rgba(0, 0, 0, 0.5);
    color: ${({ theme }) => theme.palette.common.white};
    padding: ${({ theme }) => theme.spacing(1)};
    border-radius: ${({ theme }) => theme.shape.borderRadius};
`;

const LabeledImage = ({ src, label }: LabeledImageProps) => {
    return label ? (
        <ImageContainer>
            <Image src={src} />
            <Label>{label}</Label>
        </ImageContainer>
    ) : (
        <Image src={src} />
    );
};

export default LabeledImage;

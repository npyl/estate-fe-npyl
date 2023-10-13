import { styled } from "@mui/system";
import { Stack, Typography } from "@mui/material";
import Image from "src/components/image/Image";
import { LabeledImageProps } from "./types";
import { Lock } from "@mui/icons-material";

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
    border-radius: ${({ theme }) => theme.shape.borderRadius} !important;
`;

const LockIcon = styled(Lock)`
    position: absolute;
    top: ${({ theme }) => theme.spacing(1)};
    left: ${({ theme }) => theme.spacing(1)};
    background: rgba(0, 0, 0, 0.7);
    color: ${({ theme }) => theme.palette.common.white};
    padding: ${({ theme }) => theme.spacing(1)};
    border-radius: ${({ theme }) => theme.shape.borderRadius} !important;
`;

const LabeledImage = ({
    src,
    label,
    hidden,
    ref,
    ...props
}: LabeledImageProps) => {
    return (
        <ImageContainer>
            <Image src={src} {...props} />
            {label && (
                <Label style={{ border: 1, borderRadius: 5 }}>{label}</Label>
            )}
            {hidden && (
                <LockIcon
                    fontSize="large"
                    style={{ border: 1, borderRadius: 5 }}
                />
            )}
        </ImageContainer>
    );
};

export default LabeledImage;

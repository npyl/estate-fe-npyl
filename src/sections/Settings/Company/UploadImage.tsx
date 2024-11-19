import Stack from "@mui/material/Stack";
import { alpha, styled } from "@mui/material/styles";
import { ChangeEvent, MouseEvent, useCallback, useRef } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import { CompanyImageType } from "@/types/company";
import {
    company,
    useRemoveCompanyImageMutation,
    useUploadCompanyImageMutation,
} from "@/services/company";
import { useUploadPropertyFileMutation } from "@/services/properties";
import { useDispatch } from "react-redux";
import { IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlineRounded";

const StyledAvatar = styled(Image)(({ theme }) => ({
    border: "3px solid transparent",
    borderRadius: "15px",
    cursor: "pointer",
    transition: theme.transitions.create("background-color", {
        duration: theme.transitions.duration.short,
    }),
    "&:hover": {
        backgroundColor: alpha(
            theme.palette.mode === "light"
                ? theme.palette.grey[400]
                : theme.palette.neutral?.[900]!,
            0.75
        ),
    },
}));

const StyledButtonBackground = styled(Box)(({ theme }) => ({
    border: "1px solid",
    borderColor:
        theme.palette.mode === "light"
            ? theme.palette.neutral?.[300]
            : theme.palette.neutral?.[600],
    backgroundColor:
        theme.palette.mode === "light"
            ? theme.palette.background.paper
            : theme.palette.neutral?.[700],
    borderRadius: "15px",
}));

const ContentStack = styled(Stack)(({ theme }) => ({
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "200px",
    height: "200px",
    bgcolor:
        theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.neutral?.[800],
    borderRadius: "15px",
}));

interface Props {
    src: string;
    label: string;
    variant: CompanyImageType;
}

const UploadImage = ({ src, label, variant }: Props) => {
    const dispatch = useDispatch();

    const [uploadImage] = useUploadCompanyImageMutation(); // BE
    const [uploadFile] = useUploadPropertyFileMutation(); // AMAZON
    const [removeImage] = useRemoveCompanyImageMutation();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const onAvatarClick = useCallback(() => fileInputRef.current?.click(), []);

    const handleChange = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) return;

            const res0 = await uploadImage({
                contentType: file.type,
                filename: file.name,
                size: file.size,
                type: variant, // LOGO or WATERMARK
            }).unwrap();
            if (!res0) return;

            const res1 = await uploadFile({
                file,
                url: res0.url,
                variant: "OTHER",
            });
            if (!res1) return;

            dispatch(company.util.invalidateTags(["Company"]));
        },
        []
    );

    const handleRemove = useCallback((e: MouseEvent) => {
        e.stopPropagation();
        removeImage(variant);
    }, []);

    return (
        <Stack width={1} alignItems="center">
            <Typography fontWeight="500">{label}</Typography>

            {/* Invisible Input Element */}
            <input
                ref={fileInputRef}
                type="file"
                onChange={handleChange}
                style={{ display: "none" }}
                accept="image/*"
            />

            {/* Content */}
            <ContentStack onClick={onAvatarClick}>
                <StyledAvatar fill objectFit="contain" alt="" src={src} />

                {src ? (
                    <StyledButtonBackground
                        position="absolute"
                        top={-10}
                        right={-10}
                    >
                        <IconButton color="error" onClick={handleRemove}>
                            <DeleteIcon />
                        </IconButton>
                    </StyledButtonBackground>
                ) : null}
            </ContentStack>
        </Stack>
    );
};

export default UploadImage;

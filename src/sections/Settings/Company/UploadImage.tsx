import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { ChangeEvent, FC, MouseEvent, useCallback } from "react";
import Image from "@/components/image";
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
import FileInput, { OpenerBaseProps } from "@/components/FileInput";

const StyledAvatar = styled(Image)(({ theme }) => ({
    border: "3px solid",
    borderColor: theme.palette.divider,
    borderRadius: "15px",
    cursor: "pointer",

    "&:hover": {
        borderColor: theme.palette.info.main,
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

    borderRadius: "20px",
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
}));

interface OpenerProps extends OpenerBaseProps {
    src: string;
    onRemove: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Opener: FC<OpenerProps> = ({ src, onClick, onRemove }) => (
    <ContentStack onClick={onClick}>
        <StyledAvatar alt="" src={src} width="200px" height="200px" />

        {src ? (
            <StyledButtonBackground position="absolute" top={10} right={-10}>
                <IconButton color="error" size="small" onClick={onRemove}>
                    <DeleteIcon />
                </IconButton>
            </StyledButtonBackground>
        ) : null}
    </ContentStack>
);

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

    const handleRemove = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        removeImage(variant);
    }, []);

    return (
        <Stack width={1} alignItems="center">
            <Typography fontWeight="500">{label}</Typography>

            <FileInput
                Opener={(props) => (
                    <Opener src={src} {...props} onRemove={handleRemove} />
                )}
                onChange={handleChange}
            />
        </Stack>
    );
};

export default UploadImage;

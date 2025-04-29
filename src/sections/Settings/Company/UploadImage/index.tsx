import Stack from "@mui/material/Stack";
import { ChangeEvent, FC, useCallback } from "react";
import { CompanyImageType } from "@/types/company";
import { useUploadCompanyImageMutation } from "@/services/company";
import { useUploadPropertyFileMutation } from "@/services/properties";
import { Typography } from "@mui/material";
import FileInput from "@/components/FileInput";
import uploadToast from "@/components/Toaster/toasts/upload";
import useDialog from "@/hooks/useDialog";
import Opener from "./Opener";

interface Props {
    src: string;
    label: string;
    variant: CompanyImageType;
}

const UploadImage: FC<Props> = ({ src, label, variant }) => {
    const [uploadImage] = useUploadCompanyImageMutation(); // BE
    const [uploadFile] = useUploadPropertyFileMutation(); // AMAZON

    const [isUploading, startUploading, stopUploading] = useDialog();

    const handleChange = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) return;

            startUploading();
            const { endUploadToast } = uploadToast(file.name);

            try {
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

                endUploadToast(true);
            } catch (ex) {
                endUploadToast(false);
            } finally {
                stopUploading();
            }
        },
        []
    );

    return (
        <Stack width={1} alignItems="center">
            <Typography fontWeight="500">{label}</Typography>

            <FileInput
                Opener={(props) => (
                    <Opener
                        loading={isUploading}
                        src={src}
                        variant={variant}
                        {...props}
                    />
                )}
                onChange={handleChange}
            />
        </Stack>
    );
};

export default UploadImage;

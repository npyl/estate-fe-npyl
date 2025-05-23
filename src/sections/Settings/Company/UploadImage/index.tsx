import Stack from "@mui/material/Stack";
import { ChangeEvent, FC, useCallback } from "react";
import { CompanyImageType } from "@/types/company";
import { Typography } from "@mui/material";
import FileInput from "@/components/FileInput";
import uploadToast from "@/components/Toaster/toasts/upload";
import Opener from "./Opener";
import useCompanyUpload from "@/ui/Company/useUploader";

interface Props {
    src: string;
    label: string;
    variant: CompanyImageType;
}

const UploadImage: FC<Props> = ({ src, label, variant }) => {
    const [upload, { isUploading }] = useCompanyUpload(variant); // AMAZON

    const handleChange = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) return;

            const { endUploadToast } = uploadToast(file.name);

            try {
                await upload([file]);

                endUploadToast(true);
            } catch (ex) {
                endUploadToast(false);
            } finally {
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

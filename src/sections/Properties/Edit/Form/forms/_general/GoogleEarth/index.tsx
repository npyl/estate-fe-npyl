import Panel from "@/components/Panel";
import { Upload } from "@/components/upload";
import usePropertyUpload from "@/ui/Property/useUploader";
import {
    useDeletePropertyGoogleEarthMutation,
    useGetPropertyGoogleEarthQuery,
} from "@/services/properties";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const isDeleting = false;

const GoogleEarth = () => {
    const { t } = useTranslation();

    const router = useRouter();
    const { propertyId } = router.query;

    const { data, isLoading } = useGetPropertyGoogleEarthQuery(+propertyId!);
    const [uploadFiles, { isUploading }] = usePropertyUpload("google-earth");
    const [remove] = useDeletePropertyGoogleEarthMutation();

    const files = data ? [data] : [];
    const disabled = isLoading || isUploading || isDeleting;

    const handleRemove = () => remove(+propertyId!);

    return (
        <Panel label={t("GoogleEarthSection")}>
            <Upload
                variant="googleEarth"
                disabled={disabled}
                accept={{
                    "application/vnd.google-earth.kmz": [".kmz"],
                }}
                files={files}
                onDrop={uploadFiles}
                sx={{
                    ".PPUpload-DropZone": {
                        display: data ? "none" : "block",
                    },
                }}
                onRemove={handleRemove}
            />
        </Panel>
    );
};

export default GoogleEarth;

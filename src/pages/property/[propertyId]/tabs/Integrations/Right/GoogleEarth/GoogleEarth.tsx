import { useCallback, useMemo } from "react";
import { useAddGoogleEarthMutation } from "src/services/properties";
import useUploadFile from "./hook";
import Upload from "./Upload";
import { useGetProperty } from "@/hooks/property";

const KML_CONTENT_TYPE = "application/vnd.google-earth.kml+xml";
const KMZ_CONTENT_TYPE = "application/vnd.google-earth.kmz";

const GoogleEarth = () => {
    const { property } = useGetProperty();
    const files = useMemo(
        () => (property?.googleEarth ? [property?.googleEarth] : []),
        [property?.googleEarth]
    );

    const [addGoogleEarth] = useAddGoogleEarthMutation();

    const { addFile, uploadFile, invalidatePropertyTags } =
        useUploadFile(addGoogleEarth);

    const handleDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 1) return;

        const contentType = acceptedFiles[0].name.includes(".kmz")
            ? KMZ_CONTENT_TYPE
            : KML_CONTENT_TYPE;

        const response = await addFile(acceptedFiles[0], contentType);
        const result = await uploadFile(
            acceptedFiles[0],
            response,
            contentType
        );

        invalidatePropertyTags();
    }, []);

    return <Upload onDrop={handleDrop} files={files} />;
};

export default GoogleEarth;

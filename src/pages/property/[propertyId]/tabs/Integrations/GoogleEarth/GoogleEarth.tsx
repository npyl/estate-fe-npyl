import { useCallback, useMemo, useState } from "react";
import { useAddGoogleEarthMutation } from "src/services/properties";
import useUploadFile from "./hook";
import Upload from "./Upload";
import { Box, Button } from "@mui/material";
import { useGetProperty } from "src/hooks/property/hook";

const GoogleEarth = () => {
    const { property } = useGetProperty();
    const files = useMemo(
        () => (property?.googleEarth ? [property?.googleEarth] : []),
        [property?.googleEarth]
    );

    const [addGoogleEarth] = useAddGoogleEarthMutation();

    const { addFile, uploadFile, invalidatePropertyTags } =
        useUploadFile(addGoogleEarth);

    const [loading, setLoading] = useState(false);

    const handleDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 1) return;

        setLoading(true);

        const response = await addFile(acceptedFiles[0]);
        const result = await uploadFile(acceptedFiles[0], response);

        setLoading(false);

        invalidatePropertyTags();
    }, []);

    const openKML = () => {
        const kmlFileUrl = property?.googleEarth?.url;
        if (!kmlFileUrl) return;

        // URL encode the KML file URL
        const encodedKmlFileUrl = encodeURIComponent(kmlFileUrl);

        // Generate the Google Earth URL with the encoded KML file URL
        const googleEarthUrl = `https://earth.google.com/web/@?dg=feature&ap=ml%7B${encodedKmlFileUrl}%7D`;

        // Open the Google Earth URL in a new tab
        window.open(googleEarthUrl, "_blank");
    };

    return (
        <Box>
            <Upload onDrop={handleDrop} files={files} />
            <Button onClick={openKML}>Open</Button>
        </Box>
    );
};

export default GoogleEarth;

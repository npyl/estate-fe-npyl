import { Card, CardContent, CardHeader } from "@mui/material";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

import UploadDnd from "src/components/upload/UploadDnd";
import GalleryManager from "src/components/GalleryManager";
import { SoftButton } from "src/components/SoftButton";
import { useAddPropertyThumbnailMutation } from "src/services/properties";
import { useRouter } from "next/router";

interface IImageSectionProps {
	files: string[];
	setFiles: Dispatch<SetStateAction<(string | File)[]>>;
}

const ImagesSection: React.FC<IImageSectionProps> = ({ files, setFiles }) => {
	const router = useRouter();
	const { propertyId } = router.query;

	const [galleryManagerOpen, setGalleryManagerOpen] = useState(false);

	const [addThumbnail] = useAddPropertyThumbnailMutation();

	const uploadFile = async (image: File, addMutation: any): Promise<string> => {
		const filename = image.name;
		const contentType = image.type;

		if (!filename || !contentType)
			throw new Error("filename or contentType cannot be null");

		// get amazon url
		const fileResponse = await addMutation({
			id: +propertyId!,
			body: { filename, contentType },
		}).unwrap();

		if (!fileResponse) throw new Error("Error: FileResponse: " + fileResponse);

		const key = fileResponse.key;
		const url = fileResponse.url;
		const cdnUrl = fileResponse.cdnUrl;

		// PUT to amazon url
		const response = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": contentType,
			},
			body: image,
		});

		if (!response) throw new Error("PUT request failed: " + response);
		if (!response.ok) throw new Error("Uploading the image failed!");

		return cdnUrl;
	};

	const uploadThumbnail = (image: File): Promise<string> => {
		return uploadFile(image, addThumbnail);
	};
	const uploadImage = (image: File) => {};

	const handleDropMultiFile = useCallback(
		(acceptedFiles: File[]) => {
			if (files.length === 0) {
				// this is the first image we are adding; therefore it is the mainImage
				uploadThumbnail(acceptedFiles[0])
					.then((cdnUrl) => {
						setFiles([...files, cdnUrl]);
					})
					.catch((reason) => console.error("uploadThumbnail: ", reason));

				// TODO: add the rest secondary images
			} else {
				// treat every file as secondary image
			}
		},
		[files]
	);

	const handleRemoveFile = (inputFile: File | string) => {
		const filtered = files.filter((file) => file !== inputFile);
		setFiles(filtered);
	};

	const handleRemoveAllFiles = () => {
		setFiles([]);
	};

	const handleOpenGalleryManager = () => {
		setGalleryManagerOpen(true);
	};
	const handleCloseGalleryManager = () => {
		setGalleryManagerOpen(false);
	};

	if (!propertyId) return;

	return (
		<>
			<Card>
				<CardHeader
					title="Upload Images"
					action={
						files.length > 0 && (
							<SoftButton onClick={handleOpenGalleryManager}>Edit</SoftButton>
						)
					}
					sx={{
						display: "flex",
						alignItems: "center",
						"& .MuiCardHeader-action": {
							position: "absolute",
							alignSelf: "flex-end",
						},
					}}
				/>
				<CardContent>
					<UploadDnd
						multiple
						thumbnail={true}
						files={files}
						onDrop={handleDropMultiFile}
						onRemove={handleRemoveFile}
						onRemoveAll={handleRemoveAllFiles}
					/>
				</CardContent>
			</Card>

			{files && files.length > 0 && (
				<GalleryManager
					open={galleryManagerOpen}
					images={files}
					onClose={handleCloseGalleryManager}
					onDelete={(file: string) => {
						handleRemoveFile(file);
					}}
				/>
			)}
		</>
	);
};
export default ImagesSection;

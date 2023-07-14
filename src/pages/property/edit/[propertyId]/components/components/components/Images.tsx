import { Card, CardContent, CardHeader } from "@mui/material";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

import UploadDnd from "src/components/upload/UploadDnd";
import GalleryManager from "src/components/GalleryManager";
import { SoftButton } from "src/components/SoftButton";
import {
	useAddPropertyThumbnailMutation,
	useAddPropertyImageMutation,
} from "src/services/properties";
import { useRouter } from "next/router";
import { IPropertyImage, IPropertyImagePOST } from "src/types/file";

interface IImageSectionProps {
	files: IPropertyImage[];
	addFile: (image: IPropertyImage | IPropertyImagePOST) => void;
	setCdnUrlForFile: (orderNumber: number, cdnUrl: string) => void;
	setFiles: (images: IPropertyImage[]) => void;
}

const ImagesSection: React.FC<IImageSectionProps> = ({
	files,
	addFile,
	setFiles,
	setCdnUrlForFile,
}) => {
	const router = useRouter();
	const { propertyId } = router.query;

	const [galleryManagerOpen, setGalleryManagerOpen] = useState(false);

	const [addThumbnail] = useAddPropertyThumbnailMutation();
	const [addImage] = useAddPropertyImageMutation();

	const uploadFile = async (
		image: File,
		addMutation: any
	): Promise<{ orderNumber: number; cdnUrl: string }> => {
		const filename = image.name;
		const contentType = image.type;
		const orderNumber = files.length + 1;

		if (!filename || !contentType)
			throw new Error("filename or contentType cannot be null");

		const body =
			typeof addMutation === typeof useAddPropertyImageMutation
				? {
						filename,
						contentType,
						orderNumber,
				  }
				: { filename, contentType };

		// get amazon url
		const fileResponse = await addMutation({
			id: +propertyId!,
			body: body,
		}).unwrap();

		if (!fileResponse) throw new Error("Error: FileResponse: " + fileResponse);

		const key = fileResponse.key;
		const url = fileResponse.url;
		const cdnUrl = fileResponse.cdnUrl;

		addFile(body);

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

		return { orderNumber, cdnUrl };
	};

	const uploadThumbnail = (
		image: File
	): Promise<{ orderNumber: number; cdnUrl: string }> => {
		return uploadFile(image, addThumbnail);
	};
	const uploadImage = (
		image: File
	): Promise<{ orderNumber: number; cdnUrl: string }> => {
		return uploadFile(image, addImage);
	};

	const handleDropMultiFile = useCallback(
		(acceptedFiles: File[]) => {
			if (files.length === 0) {
				// this is the first image we are adding; therefore it is the mainImage
				uploadThumbnail(acceptedFiles[0])
					.then(({ orderNumber, cdnUrl }) =>
						setCdnUrlForFile(orderNumber, cdnUrl)
					)
					.catch((reason) => console.error("uploadThumbnail: ", reason));

				for (let i = 1; i < acceptedFiles.length; i++)
					uploadImage(acceptedFiles[i])
						.then(({ orderNumber, cdnUrl }) =>
							setCdnUrlForFile(orderNumber, cdnUrl)
						)
						.catch((reason) => console.error("uploadImage: ", reason));
			} else {
				// treat every file as secondary image
				acceptedFiles.forEach((acceptedFile) =>
					uploadImage(acceptedFile)
						.then(({ orderNumber, cdnUrl }) =>
							setCdnUrlForFile(orderNumber, cdnUrl)
						)
						.catch((reason) => console.error("uploadImage: ", reason))
				);
			}
		},
		[files]
	);

	const handleRemoveFile = (inputFile: IPropertyImage) => {
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
					onDelete={(file: IPropertyImage) => {
						handleRemoveFile(file);
					}}
				/>
			)}
		</>
	);
};
export default ImagesSection;

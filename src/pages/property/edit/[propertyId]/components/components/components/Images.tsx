import { Card, CardContent, CardHeader } from "@mui/material";
import { useCallback, useState } from "react";

import UploadDnd from "src/components/upload/UploadDnd";
import GalleryManager from "src/components/GalleryManager";
import { SoftButton } from "src/components/SoftButton";
import {
	useAddPropertyImageMutation,
	useSetPropertyThumbailMutation,
	useDeletePropertyImageMutation,
} from "src/services/properties";
import { useRouter } from "next/router";
import { IPropertyImage, IPropertyImagePOST } from "src/types/file";

interface IImageSectionProps {
	files: IPropertyImage[];
	addFile: (image: IPropertyImagePOST) => void;
	setCdnUrlForNextAvailable: (cdnUrl: string) => void;
	setFiles: (images: IPropertyImage[]) => void;
}

const ImagesSection: React.FC<IImageSectionProps> = ({
	files,
	addFile,
	setFiles,
	setCdnUrlForNextAvailable,
}) => {
	const router = useRouter();
	const { propertyId } = router.query;

	const [galleryManagerOpen, setGalleryManagerOpen] = useState(false);

	const [addImage] = useAddPropertyImageMutation();
	const [setThumbnail] = useSetPropertyThumbailMutation();
	const [deleteImage] = useDeletePropertyImageMutation();

	const uploadFile = async (
		image: File
	): Promise<{ cdnUrl: string; key: string }> => {
		const filename = image.name;
		const contentType = image.type;

		if (!filename || !contentType)
			throw new Error("filename or contentType cannot be null");

		const body: IPropertyImagePOST = {
			filename,
			contentType,
		};

		// get amazon url
		const fileResponse = await addImage({
			id: +propertyId!,
			body: body,
		}).unwrap();

		if (!fileResponse) throw new Error("Error: FileResponse: " + fileResponse);

		const key = fileResponse.key;
		const url = fileResponse.url;
		const cdnUrl = fileResponse.cdnUrl;

		addFile({ ...body, key });

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

		return { cdnUrl, key };
	};

	const handleDropMultiFile = useCallback(
		(acceptedFiles: File[]) => {
			if (files.length === 0) {
				// this is the first image we are adding; therefore it is the mainImage
				uploadFile(acceptedFiles[0])
					.then(({ cdnUrl, key }) => {
						setCdnUrlForNextAvailable(cdnUrl);
						setThumbnail({ propertyId: +propertyId!, imageKey: key });
					})
					.catch((reason) => console.error("uploadThumbnail: ", reason));

				for (let i = 1; i < acceptedFiles.length; i++)
					uploadFile(acceptedFiles[i])
						.then(({ cdnUrl, key }) => setCdnUrlForNextAvailable(cdnUrl))
						.catch((reason) => console.error("uploadImage: ", reason));
			} else {
				// treat every file as secondary image
				acceptedFiles.forEach((acceptedFile) =>
					uploadFile(acceptedFile)
						.then(({ cdnUrl, key }) => setCdnUrlForNextAvailable(cdnUrl))
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
	const handleReorder = (sourceIndex: number, newIndex: number) => {};

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
						setFiles={setFiles}
						onDrop={handleDropMultiFile}
						onReorder={handleReorder}
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

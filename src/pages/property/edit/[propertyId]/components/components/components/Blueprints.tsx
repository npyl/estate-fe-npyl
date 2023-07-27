import { Card, CardHeader, CardContent } from "@mui/material";
import { Upload } from "src/components/upload";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
	addPropertyBlueprint,
	selectPropertyBlueprints,
	setCdnUrlForNextAvailableBlueprint,
} from "src/slices/property/files";
import {
	IExtendedPropertyBlueprint,
	IPropertyBlueprintPOST,
} from "src/types/file";
import {
	useAddPropertyBlueprintMutation,
	useDeletePropertyBlueprintMutation,
} from "src/services/properties";
import { useRouter } from "next/router";

const BlueprintsSection: React.FC = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { t } = useTranslation();

	const { propertyId } = router.query;

	const blueprints = useSelector(selectPropertyBlueprints);

	const [addBlueprint] = useAddPropertyBlueprintMutation();
	const [deleteBlueprint] = useDeletePropertyBlueprintMutation();

	const uploadFile = async (
		image: File
	): Promise<{ cdnUrl: string; key: string }> => {
		const filename = image.name;
		const contentType = image.type;

		if (!filename || !contentType)
			throw new Error("filename or contentType cannot be null");

		const body: IPropertyBlueprintPOST = {
			filename,
			contentType,
		};

		// get amazon url
		const fileResponse = await addBlueprint({
			id: +propertyId!,
			body: body,
		}).unwrap();

		if (!fileResponse) throw new Error("Error: FileResponse: " + fileResponse);

		const key = fileResponse.key;
		const url = fileResponse.url;
		const cdnUrl = fileResponse.cdnUrl;

		dispatch(addPropertyBlueprint({ ...body, key, filename }));

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

		dispatch(setCdnUrlForNextAvailableBlueprint(cdnUrl));

		return { cdnUrl, key };
	};

	const handleDropMultiFile = useCallback(
		(acceptedFiles: File[]) =>
			acceptedFiles.forEach((file) => uploadFile(file)),
		[blueprints]
	);

	const handleRemoveFile = (inputFile: IExtendedPropertyBlueprint) => {
		deleteBlueprint({
			propertyId: +propertyId!,
			imageKey: blueprints.filter(
				(blueprint) => blueprint.url === inputFile.url
			)[0].key,
		});
	};

	const handleRemoveAllFileData = () => {
		blueprints.forEach((blueprint) =>
			deleteBlueprint({
				propertyId: +propertyId!,
				imageKey: blueprint.key,
			})
		);
	};

	return (
		<Card>
			<CardHeader title={t("Blueprints")} />
			<CardContent>
				<Upload
					multiple
					thumbnail={false}
					files={blueprints}
					onDrop={handleDropMultiFile}
					onRemove={handleRemoveFile}
					onRemoveAll={handleRemoveAllFileData}
				/>
			</CardContent>
		</Card>
	);
};
export default BlueprintsSection;

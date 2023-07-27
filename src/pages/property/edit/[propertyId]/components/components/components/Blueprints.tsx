import { Card, CardHeader, CardContent } from "@mui/material";
import { Upload } from "src/components/upload";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectPropertyBlueprints } from "src/slices/property/files";
import { IPropertyBlueprintPOST } from "src/types/file";
import {
	properties,
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
		(acceptedFiles: File[]) =>
			acceptedFiles.forEach((file) => uploadFile(file).then(() => reRender())),
		[blueprints]
	);

	const urls = useMemo(
		() => blueprints.map((blueprint) => blueprint.url),
		[blueprints]
	);

	const handleRemoveFile = (inputFile: File | string) => {
		deleteBlueprint({
			propertyId: +propertyId!,
			imageKey: blueprints.filter(
				(blueprint) => blueprint.url === (inputFile as string)
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

	const reRender = () => {
		dispatch(properties.util.invalidateTags(["PropertyById"]));
	};

	return (
		<Card>
			<CardHeader title={t("Blueprints")} />
			<CardContent>
				<Upload
					multiple
					thumbnail={false}
					files={urls}
					onDrop={handleDropMultiFile}
					onRemove={handleRemoveFile}
					onRemoveAll={handleRemoveAllFileData}
				/>
			</CardContent>
		</Card>
	);
};
export default BlueprintsSection;

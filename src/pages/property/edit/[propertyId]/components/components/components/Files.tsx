import { Card, CardHeader, CardContent } from "@mui/material";
import { Upload } from "src/components/upload";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectPropertyBlueprints } from "src/slices/property/files";

const FileSection: React.FC = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const blueprints = useSelector(selectPropertyBlueprints);

	const handleDropMultiFile = useCallback(
		(acceptedFileData: File[]) => {},
		[blueprints]
	);

	const urls = useMemo(
		() => blueprints.map((blueprint) => blueprint.url),
		[blueprints]
	);

	const handleRemoveFile = (inputFile: File | string) => {};

	const handleRemoveAllFileData = () => {};

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
export default FileSection;

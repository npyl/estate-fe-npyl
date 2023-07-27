import { Theme } from "@mui/material/styles";
import { Tooltip, SxProps, Stack } from "@mui/material";
import DownloadButton from "./DownloadButton";
import Image from "../image/Image";
import PreviewImage from "../image/PreviewImage";
import { IExtendedPropertyBlueprint } from "src/types/file";

// ----------------------------------------------------------------------

type FileIconProps = {
	file: IExtendedPropertyBlueprint;
	tooltip?: boolean;
	imageView?: boolean;
	onDownload?: VoidFunction;
	sx?: SxProps<Theme>;
	imgSx?: SxProps<Theme>;
};

export default function FileThumbnail({
	file,
	tooltip,
	imageView,
	onDownload,
	sx,
	imgSx,
}: FileIconProps) {
	const renderContent = file.url ? (
		<Image
			src={file.url}
			sx={{
				width: 32,
				height: 32,
				flexShrink: 0,
				...sx,
			}}
		/>
	) : (
		<PreviewImage
			sx={{
				width: 32,
				height: 32,
				flexShrink: 0,
				...sx,
			}}
			animate
		/>
	);

	return tooltip ? (
		<Tooltip title={file.filename}>
			<Stack
				flexShrink={0}
				component="span"
				alignItems="center"
				justifyContent="center"
				sx={{
					width: "fit-content",
					height: "inherit",
				}}
			>
				{renderContent}
				{onDownload && <DownloadButton onDownload={onDownload} />}
			</Stack>
		</Tooltip>
	) : (
		<>
			{renderContent}
			{onDownload && <DownloadButton onDownload={onDownload} />}
		</>
	);
}

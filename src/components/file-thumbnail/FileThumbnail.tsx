import { Theme } from "@mui/material/styles";
import { Tooltip, SxProps, Stack } from "@mui/material";
//
import { fileData } from "./utils";
import DownloadButton from "./DownloadButton";
import PreviewImage from "../image/PreviewImage";

// ----------------------------------------------------------------------

type FileIconProps = {
	file: File | string;
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
	const { name = "", path = "", preview = "" } = fileData(file);

	const renderContent =
		typeof file === "string" ? (
			<PreviewImage
				src={file as string}
				sx={{
					width: 32,
					height: 32,
					flexShrink: 0,
					...sx,
				}}
			/>
		) : (
			<PreviewImage
				src={preview}
				sx={{
					width: 1,
					height: 1,
					flexShrink: 0,
					objectFit: "cover",
					...imgSx,
				}}
			/>
		);

	return tooltip ? (
		<Tooltip title={name}>
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

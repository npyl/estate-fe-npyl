import { CircularProgress } from "@mui/material";
import Image from "./image/Image";

interface IPreviewImageProps {
	animate?: boolean;
}

const PreviewImage = (props: IPreviewImageProps) => {
	const { animate = false } = props;

	// Default image
	const defaultImage = "/static/img/previewImage.png";

	return (
		<div style={{ position: "relative", display: "inline-block" }}>
			<Image src={defaultImage} />
			{animate && (
				<CircularProgress
					sx={{
						position: "absolute",
						top: "calc(50% - 20px)",
						left: "calc(50% - 20px)",
						transform: "translate(-50%, -50%)",
					}}
				/>
			)}
		</div>
	);
};

export default PreviewImage;

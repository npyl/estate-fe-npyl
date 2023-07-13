import Image from "./image/Image";

const PreviewImage = () => {
	// Default image
	const defaultImage = "/static/img/previewImage.png";

	return <Image src={defaultImage} />;
};

export default PreviewImage;

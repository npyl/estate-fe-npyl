import { FC, useMemo } from "react";
import { ComparisonFrame, ComparisonImage } from "./styled";
import usePropertyImages from "../../../../hook";

interface ContentProps {
    selectedKey: string;
    setSelectedKey: (s: string) => void;
    image1Key: string;
    image2Key: string;
}

const Content: FC<ContentProps> = ({
    selectedKey,
    setSelectedKey,
    image1Key,
    image2Key,
}) => {
    const { images } = usePropertyImages();

    const { image1, image2 } = useMemo(
        () => ({
            image1: images.find(({ key }) => key === image1Key),
            image2: images.find(({ key }) => key === image2Key),
        }),
        [images, image1Key, image2Key]
    );

    return (
        <ComparisonFrame>
            <ComparisonImage
                isSelected={selectedKey === image1?.key}
                src={image1?.url || ""}
                alt="image 1"
                onClick={() => setSelectedKey(image1Key)}
            />
            <ComparisonImage
                isSelected={selectedKey === image2?.key}
                src={image2?.url || ""}
                alt="image 1"
                onClick={() => setSelectedKey(image2Key)}
            />
        </ComparisonFrame>
    );
};

export default Content;

import LabeledImage from "@/components/image/LabeledImage";
import PreviewImage from "@/components/image/PreviewImage";
import { IPropertyImage } from "@/types/file";
import { motion } from "framer-motion";

export interface ItemProps {
    image: IPropertyImage;
    onClick: () => void;
}

const Item = ({ image, onClick }: ItemProps) => {
    const { url, hidden, thumbnail } = image;

    return url ? (
        <motion.div
            whileHover={{
                scale: 0.95,
            }}
        >
            <LabeledImage
                borderRadius={0.3}
                src={url}
                hidden={hidden}
                label={thumbnail ? "main" : ""}
                onClick={onClick}
            />
        </motion.div>
    ) : (
        <PreviewImage animate borderRadius={0.3} />
    );
};

export default Item;

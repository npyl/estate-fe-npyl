import { UploadPropertyImageProps } from "../types";

import PreviewImage from "src/components/image/PreviewImage";
import { LabeledImage } from "src/components/image";

import { IPropertyImage } from "src/types/file";
import { useCallback, useMemo } from "react";

import { motion } from "framer-motion";
import { TwoDimentionsDnd } from "src/components/TwoDimentionsDnd";
import { DropResult } from "react-beautiful-dnd";

interface MultiFilePreviewReorder extends UploadPropertyImageProps {
    xs?: number;
}

interface CardProps {
    image: IPropertyImage;
    index: number;
    onClick: () => void;
}

const Item = ({ image, index, onClick }: CardProps) => {
    const { url, hidden } = useMemo(() => image, [image]);

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
                label={index === 0 ? "main" : ""}
                onClick={onClick}
            />
        </motion.div>
    ) : (
        <PreviewImage animate borderRadius={0.3} />
    );
};

export default function MultiFilePreviewReorder({
    files,
    xs = 4,
    setFiles,
    onImageClick,
    onReorder,
}: MultiFilePreviewReorder) {
    if (!files || !files?.length) return null;

    const items = useMemo(
        () =>
            files.map((f, index) => ({
                id: index,
                value: (
                    <Item
                        image={f}
                        index={index}
                        onClick={() => onImageClick && onImageClick(f)}
                    />
                ),
            })),
        [files]
    );

    const handleDragEnd = useCallback(
        (result: DropResult) => {
            if (!result.destination) return;

            const { source, destination } = result;
            const updatedItems = [...files];
            const [removed] = updatedItems.splice(source.index, 1);
            updatedItems.splice(destination.index, 0, removed);

            setFiles(updatedItems);

            // reorder callback
            onReorder && onReorder(updatedItems.map((i) => i.key));
        },
        [files]
    );

    return (
        <TwoDimentionsDnd
            gap={0.2}
            columns={12 / xs}
            items={items}
            onDragEnd={handleDragEnd}
        />
    );
}

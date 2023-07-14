import { ImageList, ImageListItem } from "@mui/material";
import Image from "src/components/image/Image";

import { UploadPropertyImageProps } from "../types";
import {
	DragDropContext,
	Draggable,
	Droppable,
	DropResult,
} from "react-beautiful-dnd";

import PreviewImage from "src/components/PreviewImage";

export default function MultiFilePreviewReorder({
	files,
	setFiles,
	onImageClick,
}: UploadPropertyImageProps) {
	if (!files || !files?.length) return null;

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const { source, destination } = result;
		const updatedItems = [...files];
		const [removed] = updatedItems.splice(source.index, 1);
		updatedItems.splice(destination.index, 0, removed);

		setFiles(updatedItems);
	};

	return (
		<>
			<DragDropContext onDragEnd={handleDragEnd}>
				<Droppable droppableId="droppable">
					{(provided) => (
						<ImageList {...provided.droppableProps} ref={provided.innerRef}>
							{files.map((file, index) => (
								<ImageListItem>
									<Draggable
										key={index}
										draggableId={index.toString()}
										index={index}
									>
										{(provided) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												{file.url ? (
													<Image
														src={file.url}
														onClick={() => {
															onImageClick && onImageClick(files[index]);
														}}
													/>
												) : (
													<PreviewImage />
												)}
											</div>
										)}
									</Draggable>
								</ImageListItem>
							))}
							{provided.placeholder}
						</ImageList>
					)}
				</Droppable>
			</DragDropContext>
		</>
	);
}

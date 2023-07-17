import { useEffect, useRef, useState } from "react";
// @mui
import { Box } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
// utils
import { bgGradient } from "src/utils/cssStyles";
// components
import Carousel from "./carousel";
import CarouselArrowIndex from "./carousel/CarouselArrowIndex";

import Image, { ImageRatio, LabeledImage } from "src/components/image";
import ICarouselImage from "./carousel/types";

// ----------------------------------------------------------------------

const THUMB_SIZE = 64;

type Props = {
	ratio?: string;
	data: ICarouselImage[];
	mainLabel?: string;
	onImageChange?: (newImage: ICarouselImage) => void;
	onImageClick?: () => void;
};

type StyledThumbnailsContainerProps = {
	length: number;
};

const StyledThumbnailsContainer = styled("div", {
	shouldForwardProp: (prop) => prop !== "length",
})<StyledThumbnailsContainerProps>(({ length, theme }) => ({
	margin: theme.spacing(0, "auto"),

	position: "relative",

	"& .slick-slide": {
		opacity: 0.48,
		"&.slick-current": {
			opacity: 1,
		},
		"& > div": {
			padding: theme.spacing(0, 0.75),
			paddingBottom: 10,
		},
	},

	...(length === 1 && {
		maxWidth: THUMB_SIZE * 1 + 16,
	}),
	...(length === 2 && {
		maxWidth: THUMB_SIZE * 2 + 32,
	}),
	...((length === 3 || length === 4) && {
		maxWidth: THUMB_SIZE * 3 + 48,
	}),
	...(length >= 5 && {
		maxWidth: THUMB_SIZE * 6,
	}),
	...(length > 2 && {
		"&:before, &:after": {
			...bgGradient({
				direction: "to left",
				startColor: `${alpha(theme.palette.background.default, 0)} 0%`,
				endColor: `${theme.palette.background.default} 100%`,
			}),
			top: 0,
			zIndex: 9,
			content: "''",
			height: "100%",
			position: "absolute",
			width: (THUMB_SIZE * 2) / 3,
		},
		"&:after": {
			right: 0,
			transform: "scaleX(-1)",
		},
	}),
}));

// ----------------------------------------------------------------------

export default function CarouselSimple({
	data,
	onImageChange,
	onImageClick,
	mainLabel,
	ratio = "16/9",
}: Props) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const [nav1, setNav1] = useState<Carousel | undefined>(undefined);

	const carousel1 = useRef<Carousel | null>(null);

	const carouselSettings1 = {
		dots: false,
		arrows: false,
		slidesToShow: 1,
		draggable: false,
		slidesToScroll: 1,
		adaptiveHeight: true,
		beforeChange: (current: number, next: number) => setCurrentIndex(next),
		afterChange: (currentSlide: number) =>
			onImageChange && onImageChange(data[currentSlide]),
	};

	useEffect(() => {
		if (carousel1.current) {
			setNav1(carousel1.current);
		}
	}, []);

	const handlePrev = () => {
		carousel1.current?.slickPrev();
	};

	const handleNext = () => {
		carousel1.current?.slickNext();
	};

	const renderLargeImg = (
		<Box
			sx={{
				mb: 1,
				zIndex: 0,
				overflow: "hidden",
				position: "relative",
			}}
		>
			<Carousel {...carouselSettings1} asNavFor={nav1} ref={carousel1}>
				{data.map((item, index) => (
					<LabeledImage
						key={item.id}
						alt={item.title}
						src={item.image}
						label={mainLabel && index === 0 ? mainLabel : ""}
						onClick={onImageClick}
						ratio={ratio! as ImageRatio}
					/>
				))}
			</Carousel>

			<CarouselArrowIndex
				index={currentIndex}
				total={data.length}
				onNext={handleNext}
				onPrevious={handlePrev}
			/>
		</Box>
	);

	return (
		<Box
			sx={{
				"& .slick-slide": {
					float: (theme) => (theme.direction === "rtl" ? "right" : "left"),
				},
			}}
		>
			{renderLargeImg}
		</Box>
	);
}

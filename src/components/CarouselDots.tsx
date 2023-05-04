import { useRef } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
// components
import Image from "src/components/image";
import Carousel, { CarouselArrows, CarouselDots as Dots } from "./carousel";

// ----------------------------------------------------------------------

type Props = {
  data?: {
    id: string;
    title: string;
    image: string;
    description: string;
  }[];
};

export default function CarouselDots({ data }: Props) {
  const carouselRef = useRef<Carousel | null>(null);

  const carouselSettings = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    ...Dots({
      rounded: true,
      sx: { mt: 3 },
    }),
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <>
      <CarouselArrows
        filled
        shape='rounded'
        onNext={handleNext}
        onPrevious={handlePrev}
      >
        <Carousel ref={carouselRef} {...carouselSettings}>
          {data &&
            data.map((item) => <CarouselItem key={item.id} item={item} />)}
        </Carousel>
      </CarouselArrows>
    </>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  title: string;
  description: string;
  image: string;
};

function CarouselItem({ item }: { item: CarouselItemProps }) {
  const { image, title } = item;

  return <Image alt={title} src={image} ratio='6/4' />;
}

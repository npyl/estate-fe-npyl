import { useRef, useState } from 'react';
// @mui
import { Box, Card, Paper } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// components
import Carousel, { CarouselArrowIndex } from './carousel';
import Image from './image';
// next
// ----------------------------------------------------------------------

type Props = {
  data: {
    id: string;
    title: string;
    image: string;
    description: string;
    path: string;
  }[];
};

export default function CarouselAnimation({ data }: Props) {
  const theme = useTheme();

  const carouselRef = useRef<Carousel | null>(null);

  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? data.length - 1 : 0);

  const carouselSettings = {
    speed: 800,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card>
      <Carousel ref={carouselRef} {...carouselSettings}>
        {data.map((item, index) => (
          <CarouselItem key={item.id} item={item} isActive={index === currentIndex} />
        ))}
      </Carousel>

      <CarouselArrowIndex
        index={currentIndex}
        total={data.length}
        onNext={handleNext}
        onPrevious={handlePrev}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: {
    title: string;
    description: string;
    image: string;
    path: string;
  };
  isActive: boolean;
};

function CarouselItem({ item, isActive }: CarouselItemProps) {
  const theme = useTheme();

  const { image, title } = item;

  return (
    <Paper sx={{ position: 'relative', maxHeight: '70vh' }}>
      <Image alt={title} src={image} ratio="16/9" />

      <Box
        sx={{
          top: 0,
          width: 1,
          height: 1,
          position: 'absolute',
          ...bgGradient({
            direction: 'to top',
            startColor: `${theme.palette.grey[900]} 0%`,
            endColor: `${alpha(theme.palette.grey[900], 0)} 100%`,
          }),
        }}
      />
     
    </Paper>
  );
}

import { m } from "framer-motion";
import { varFade } from "src/components/animate";
import CarouselThumbnail from "src/components/CarouselThumbnail";
import { IProperties } from "src/types/properties";

interface ImageSectionProps {
  data: IProperties;
}

const ImageSection: React.FC<ImageSectionProps> = (props) => {
  const { data } = props;

  const _carouselsExample = [
    {
      id: "1",
      title: "Repository",
      image: `data:image/jpeg;base64,${data?.propertyImage}`,
      description: "A registry of multidisciplinar artefacts...",
      path: "/repository",
    },
    {
      id: "2",
      title: "Matchmaking Services",
      image:
        "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
      description:
        "Artificial Intelligence mobilized to accelerate your business",
      path: "/matchmaking",
    },
    {
      id: "3",
      title: "Matchmaking Services",
      image:
        "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      description:
        "Artificial Intelligence mobilized to accelerate your business",
      path: "/matchmaking",
    },
    {
      id: "4",
      title: "Matchmaking Services",
      image:
        "https://images.unsplash.com/photo-1550686041-366ad85a1355?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHJhbmRvbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      description:
        "Artificial Intelligence mobilized to accelerate your business",
      path: "/matchmaking",
    },
  ];

  return (
    <m.div variants={varFade().in}>
      <CarouselThumbnail data={_carouselsExample} />
    </m.div>
  );
};

export default ImageSection;

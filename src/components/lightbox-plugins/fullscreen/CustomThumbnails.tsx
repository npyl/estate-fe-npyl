// import React from "react";
// import { Box } from "@mui/material";
// import { usePlugin } from "yet-another-react-lightbox";

// type CustomThumbnailsProps = {
//   data: {
//     id: string;
//     title: string;
//     image: string;
//     description: string;
//   }[];
//   currentIndex: number;
//   onClickThumbnail: (index: number) => void;
// };

// const CustomThumbnails: React.FC<CustomThumbnailsProps> = ({
//   data,
//   currentIndex,
//   onClickThumbnail,
// }) => {
//   const { CarouselPlugin } = usePlugin();

//   return (
//     <Box>
//       <CarouselPlugin>
//         {data.map((item, index) => (
//           <img
//             key={item.id}
//             src={item.image}
//             alt={item.title}
//             onClick={() => onClickThumbnail(index)}
//             style={{
//               width: "80px",
//               height: "80px",
//               objectFit: "cover",
//               cursor: "pointer",
//               border: currentIndex === index ? "2px solid blue" : "none",
//               marginRight: "8px",
//             }}
//           />
//         ))}
//       </CarouselPlugin>
//     </Box>
//   );
// };

// export default CustomThumbnails;

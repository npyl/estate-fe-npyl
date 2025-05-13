import { IAgreementType } from "@/types/agreements";

interface CardImageProps {
    variant: IAgreementType;
}
const CardImage: React.FC<CardImageProps> = ({ variant }) => (
    <img
        src="/static/files/ic_file.svg"
        alt={variant}
        width={0}
        height={0}
        style={{
            height: "100%",
            width: "30%",
        }}
    />
);

export default CardImage;

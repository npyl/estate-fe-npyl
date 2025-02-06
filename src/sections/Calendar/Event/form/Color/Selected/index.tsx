import ColorBox from "../Box";
import useCurrentColor from "./useCurrentColor";

const SelectedColorBox = () => {
    const bgcolor = useCurrentColor();
    return <ColorBox bgcolor={bgcolor} />;
};

export default SelectedColorBox;

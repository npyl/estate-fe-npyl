import useDraw from "./useDraw";
import Picker from "./Picker";
import { FC } from "react";
import { DrawProps } from "./types";

const Draw: FC<DrawProps> = (props) => {
    const {
        drawCircle,
        drawPolygon,
        drawRectangle,
        // ...
        clear,
        // ...
        Renderer,
    } = useDraw(props);

    return (
        <>
            {Renderer}

            <Picker
                drawCircle={drawCircle}
                drawPolygon={drawPolygon}
                drawRectangle={drawRectangle}
                // ...
                clear={clear}
            />
        </>
    );
};

export default Draw;

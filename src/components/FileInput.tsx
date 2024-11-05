import {
    ComponentType,
    FC,
    HTMLAttributes,
    InputHTMLAttributes,
    useCallback,
    useRef,
} from "react";

export type OpenerBaseProps = { onClick: VoidFunction };
type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

interface FileInputProps<T extends OpenerBaseProps = OpenerBaseProps>
    extends InputProps {
    Opener: ComponentType<T>;
}

const FileInput: FC<FileInputProps> = ({ Opener, style, ...props }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = useCallback(() => fileInputRef.current?.click(), []);

    return (
        <>
            <Opener onClick={handleClick} />

            {/* Invisible Input Element */}
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none", ...style }}
                accept="image/*"
                {...props}
            />
        </>
    );
};

export default FileInput;

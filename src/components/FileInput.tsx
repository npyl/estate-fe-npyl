import {
    ChangeEvent,
    ComponentType,
    FC,
    InputHTMLAttributes,
    useCallback,
    useRef,
} from "react";

export type OpenerBaseProps = { loading?: boolean; onClick: VoidFunction };
type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

interface FileInputProps<T extends OpenerBaseProps = OpenerBaseProps>
    extends InputProps {
    Opener: ComponentType<T>;
    loading?: boolean;
}

const FileInput: FC<FileInputProps> = ({
    Opener,
    loading,
    style,
    onChange,
    ...props
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = useCallback(() => fileInputRef.current?.click(), []);

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            onChange?.(e);

            // INFO: reset input (can select same file again)
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        },
        [onChange]
    );

    return (
        <>
            <Opener loading={loading} onClick={handleClick} />

            {/* Invisible Input Element */}
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none", ...style }}
                accept="image/*"
                onChange={handleChange}
                {...props}
            />
        </>
    );
};

export default FileInput;

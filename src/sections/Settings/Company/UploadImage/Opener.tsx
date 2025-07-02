import { FC, MouseEvent, useCallback } from "react";
import { CompanyImageType } from "@/types/company";
import { useRemoveCompanyImageMutation } from "@/services/company";
import DeleteIcon from "@mui/icons-material/DeleteOutlineRounded";
import { OpenerBaseProps } from "@/components/FileInput";
import { ContentStack, StyledAvatar, StyledButtonBackground } from "./styled";
import LoadingIconButton from "@/components/LoadingIconButton";

// -------------------------------------------------------------------------------------

interface RemoveButtonProps {
    variant: CompanyImageType;
}

const RemoveButton: FC<RemoveButtonProps> = ({ variant }) => {
    const [removeImage, { isLoading }] = useRemoveCompanyImageMutation();

    const handleRemove = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        removeImage(variant);
    }, []);

    return (
        <StyledButtonBackground position="absolute" top={10} right={-10}>
            <LoadingIconButton
                disabled={isLoading}
                loading={isLoading}
                color="error"
                size="small"
                onClick={handleRemove}
            >
                <DeleteIcon />
            </LoadingIconButton>
        </StyledButtonBackground>
    );
};

// -------------------------------------------------------------------------------------

interface OpenerProps extends OpenerBaseProps {
    src: string;
    variant: CompanyImageType;
}

const Opener: FC<OpenerProps> = ({ variant, src, onClick }) => (
    <ContentStack onClick={onClick}>
        <StyledAvatar
            alt=""
            src={src}
            style={{ width: "200px", height: "200px" }}
        />
        {src ? <RemoveButton variant={variant} /> : null}
    </ContentStack>
);

export default Opener;

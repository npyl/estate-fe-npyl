import { IPropertyBlueprint, IPropertyImage } from "src/types/file";

type GeneralFile = IPropertyImage & IPropertyBlueprint;

export default interface ICarouselImage extends Partial<GeneralFile> {
    url: string; // required
}

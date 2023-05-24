export interface ILabel {
  id?: number;
  color: string;
  name: string;
}

export interface ILabels {
  customerLabels: ILabel[];
  propertyLabels: ILabel[];
}
import { IAgreementReq } from "@/types/agreements";

type Draft<T> = T | Partial<T>;
type TForm = Draft<IAgreementReq>;

export type { TForm };

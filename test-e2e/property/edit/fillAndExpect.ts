import { Page } from "@playwright/test";
import _fillAndExpect from "../../_util/fillAndExpect";

const DEEPER = true;

const fillAndExpect = (page: Page, FIELD_ID: string, value: string) =>
    _fillAndExpect(page, FIELD_ID, value, DEEPER);

export default fillAndExpect;

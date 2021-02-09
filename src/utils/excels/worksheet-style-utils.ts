import { provideSingletonNamed } from "@src.shared/infra/ioc/decorators";
import { SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES } from "@src.shared/shared/constants";
import { IWorksheetStyleUtil, IWorksheetStyleWrapper } from "@src.shared/shared/interfaces";
import { WorksheetStyleWrapper } from "./worksheet-style-wrapper";

@provideSingletonNamed(SHARED_PROVIDER_TYPES.UTIL, SHARED_PROVIDER_NAMES.EXCEL_STYLE)
export class WorksheetStyleUtil implements IWorksheetStyleUtil {
  public formatCell(): IWorksheetStyleWrapper {
    const newStyleWrapper = new WorksheetStyleWrapper();

    return newStyleWrapper;
  }
}
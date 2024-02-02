import { TReviewerAction } from "./reviever";
import { TSettingsAction } from "./settings";

export * from "./reviever";
export * from "./settings";

export type TAllActions = TSettingsAction | TReviewerAction;

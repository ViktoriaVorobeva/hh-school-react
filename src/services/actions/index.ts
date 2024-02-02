import { TSettingsAction } from './reviever';
import { TReviewerAction } from './settings';

export * from './reviever';
export * from './settings';

export type TAllActions = TSettingsAction | TReviewerAction;
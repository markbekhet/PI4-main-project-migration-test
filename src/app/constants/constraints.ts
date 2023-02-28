import { AlternativeShift } from "../models/AlternativeShift";
import { Constraint } from "../models/Constraint";
import { MinMaxShiftConstraint } from "../models/MinMaxShiftConstraint";
import { ShiftConstraint } from "../models/ShiftConstraint";
import { UnwantedPatterns } from "../models/UnwantedPatterns";

export const BASE_VALUE = "0";
export const UNWANTED_PATTERNS_ID= "unwantedPatterns";
export const UNWANTED_PATTERNS_DISPLAY_NAME = "unwanted patterns"
export const ALTERNATIVE_SHIFT_ID="alternativeShift";
export const ALTERNATIVE_SHIFT_DISPLAY_NAME="alternative shift"
export const FREE_DAYS_AFTER_SHIFT_ID = "freeDaysAfterhift";
export const FREE_DAYS_AFTER_SHIFT_DISPLAY_NAME = "free days after shift";
export const MIN_MAX_CONSECUTIVE_SHIFT_TYPE_ID = "minMaxConsecutiveShiftType";
export const MIN_MAX_CONSECUTIVE_SHIFT_TYPE_DISPLAY_NAME = "minimum maximum consecutive shift type";
export const IDENTICAL_WEEKEND_DISPLAY_ID = "identicalWeekend";
export const IDENTICAL_WEEKEND_DISPLAY_NAME = "Identical Weekend";
export const COMPLETE_WEEKEND_DISPLAY_ID = "completeWeekend";
export const COMPLETE_WEEKEND_DISPLAY_NAME = "Complete Weekend";
export const WEIGHT_LABEL = "weight";

export const CONSTRAINTS = [
    UNWANTED_PATTERNS_DISPLAY_NAME, ALTERNATIVE_SHIFT_DISPLAY_NAME,
    FREE_DAYS_AFTER_SHIFT_DISPLAY_NAME, MIN_MAX_CONSECUTIVE_SHIFT_TYPE_DISPLAY_NAME,
];

export const DISPLAY_NAME_ID_MAP: Map<string,string> = new Map();
DISPLAY_NAME_ID_MAP.set(UNWANTED_PATTERNS_DISPLAY_NAME, UNWANTED_PATTERNS_ID);
DISPLAY_NAME_ID_MAP.set(ALTERNATIVE_SHIFT_DISPLAY_NAME, ALTERNATIVE_SHIFT_ID);
DISPLAY_NAME_ID_MAP.set(FREE_DAYS_AFTER_SHIFT_DISPLAY_NAME, FREE_DAYS_AFTER_SHIFT_ID);
DISPLAY_NAME_ID_MAP.set(MIN_MAX_CONSECUTIVE_SHIFT_TYPE_DISPLAY_NAME, MIN_MAX_CONSECUTIVE_SHIFT_TYPE_ID);

export const DISPLAY_NAME_CONSTRAINT_MAP: Map<string,Constraint> = new Map();
DISPLAY_NAME_CONSTRAINT_MAP.set(UNWANTED_PATTERNS_DISPLAY_NAME, new UnwantedPatterns(UNWANTED_PATTERNS_ID, UNWANTED_PATTERNS_DISPLAY_NAME));
DISPLAY_NAME_CONSTRAINT_MAP.set(ALTERNATIVE_SHIFT_DISPLAY_NAME, new AlternativeShift(ALTERNATIVE_SHIFT_ID, ALTERNATIVE_SHIFT_DISPLAY_NAME));
DISPLAY_NAME_CONSTRAINT_MAP.set(FREE_DAYS_AFTER_SHIFT_DISPLAY_NAME, new ShiftConstraint(FREE_DAYS_AFTER_SHIFT_ID,FREE_DAYS_AFTER_SHIFT_DISPLAY_NAME));
DISPLAY_NAME_CONSTRAINT_MAP.set(MIN_MAX_CONSECUTIVE_SHIFT_TYPE_DISPLAY_NAME, new MinMaxShiftConstraint(MIN_MAX_CONSECUTIVE_SHIFT_TYPE_ID, MIN_MAX_CONSECUTIVE_SHIFT_TYPE_DISPLAY_NAME));

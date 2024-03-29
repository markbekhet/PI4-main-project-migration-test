export const BASE_VALUE = "0";
export const WEIGHT_INITIAL_VALUE = "";
export const WEIGHT_MIN_VALUE = -100;
export const WEIGHT_MAX_VALUE = 100;
export const UNWANTED_PATTERNS_ID = "unwantedPatterns";
export const UNWANTED_PATTERNS_DISPLAY_NAME = "unwanted patterns";
export const TOTAL_NUMBER_OF_WEEKENDS_IN_FOUR_WEEKS_ID =
  "totalNumberOfWeekendsInFourWeeks";
export const TOTAL_NUMBER_OF_WEEKENDS_IN_FOUR_WEEKS_DISPLAY_NAME =
  "Total Number of weekends in four weeks.";
export const TOTAL_WEEKENDS_IN_FOUR_WEEKS_ID = "TotalWeekendsInFourWeeks";
export const TOTAL_WEEKENDS_IN_FOUR_WEEKS_DISPLAY_NAME =
  "Minimum and Maximum Number of Weekends in Four Weeks";
export const ALTERNATIVE_SHIFT_ID="AlternativeShift";
export const ALTERNATIVE_SHIFT_DISPLAY_NAME="Unwanted shift"
export const FREE_DAYS_AFTER_SHIFT_ID = "NumberOfFreeDaysAfterShift";
export const FREE_DAYS_AFTER_SHIFT_DISPLAY_NAME = "Number of free days after shift";
export const MIN_MAX_CONSECUTIVE_SHIFT_TYPE_ID = "MinMaxConsecutiveShiftType";
export const MIN_MAX_CONSECUTIVE_SHIFT_TYPE_DISPLAY_NAME = "Minimum and Maximum of consecutive type";
export const IDENTICAL_WEEKEND_ID = "IdentShiftTypesDuringWeekend";
export const IDENTICAL_WEEKEND_DISPLAY_NAME = "Identical shift types during Weekend";
export const COMPLETE_WEEKEND_ID = "CompleteWeekends";
export const COMPLETE_WEEKEND_DISPLAY_NAME = "Complete Weekends";
export const WEIGHT_LABEL = "weight";
export const MIN_MAX_NUM_ASSIGNMENTS_IN_FOUR_WEEKS_ID = "MinMaxNumAssignmentsInFourWeeks";
export const MIN_MAX_NUM_ASSIGNMENTS_IN_FOUR_WEEKS_DISPLAY_NAME = "Minimum and Maximum of number of assignments in four weeks";
export const MIN_MAX_CONSECUTIVE_WORKING_WEEKENDS_ID =
  "MinMaxConsecutiveWeekends";
export const MIN_MAX_CONSECUTIVE_WORKING_WEEKENDS_DISPLAY_NAME =
  "Minimim and Maximum of consecutive working weekends";

export const UNWANTED_SKILLS_ID="unwantedSkills";
export const UNWANTED_SKILLS_DISPLAY_NAME = "Unwanted skills";

export const CONSTRAINTS = [
    UNWANTED_PATTERNS_DISPLAY_NAME, ALTERNATIVE_SHIFT_DISPLAY_NAME,
    FREE_DAYS_AFTER_SHIFT_DISPLAY_NAME, MIN_MAX_CONSECUTIVE_SHIFT_TYPE_DISPLAY_NAME,
    IDENTICAL_WEEKEND_DISPLAY_NAME, COMPLETE_WEEKEND_DISPLAY_NAME, TOTAL_WEEKENDS_IN_FOUR_WEEKS_DISPLAY_NAME,
    MIN_MAX_CONSECUTIVE_WORKING_WEEKENDS_DISPLAY_NAME, MIN_MAX_NUM_ASSIGNMENTS_IN_FOUR_WEEKS_DISPLAY_NAME,
    UNWANTED_SKILLS_DISPLAY_NAME
];

export const DISPLAY_NAME_ID_MAP: Map<string,string> = new Map();
DISPLAY_NAME_ID_MAP.set(UNWANTED_PATTERNS_DISPLAY_NAME, UNWANTED_PATTERNS_ID);
DISPLAY_NAME_ID_MAP.set(ALTERNATIVE_SHIFT_DISPLAY_NAME, ALTERNATIVE_SHIFT_ID);
DISPLAY_NAME_ID_MAP.set(FREE_DAYS_AFTER_SHIFT_DISPLAY_NAME, FREE_DAYS_AFTER_SHIFT_ID);
DISPLAY_NAME_ID_MAP.set(MIN_MAX_CONSECUTIVE_SHIFT_TYPE_DISPLAY_NAME, MIN_MAX_CONSECUTIVE_SHIFT_TYPE_ID);
DISPLAY_NAME_ID_MAP.set(TOTAL_WEEKENDS_IN_FOUR_WEEKS_ID, TOTAL_WEEKENDS_IN_FOUR_WEEKS_DISPLAY_NAME);

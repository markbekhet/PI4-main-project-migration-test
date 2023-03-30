import { UserInfo } from "../models/Credentials";
import { SchedulePreferenceElement } from "../models/GenerationRequest";
import { Solution } from "../models/Schedule";

export const TOKEN_STRING = "token";
const IS_ADMIN_STRING = "isAdmin";
export const USERNAME_STRING = "username";
export const PROFILE_STRING = "profile";
export const CURRENT_SCHEDULE = "schedule";

export class CacheUtils {

    static savedPreferencesKeys: string[] = []

    public static getUserInfo(): UserInfo{
        const token = localStorage.getItem(TOKEN_STRING);
        const isAdmin = localStorage.getItem(IS_ADMIN_STRING);
        const username = localStorage.getItem(USERNAME_STRING);
        if(token === undefined || token === null || isAdmin === undefined || isAdmin === null ||
             username === undefined || username === null){
            throw new Error("User is not logged in");
        }
        return {
            token: token,
            isAdmin: isAdmin === "true"? true: false,
            username: username
        }
    }

    public static pushUserInfo(info: UserInfo) {
        localStorage.setItem(TOKEN_STRING, info.token);
        localStorage.setItem(IS_ADMIN_STRING, JSON.stringify(info.isAdmin));
        localStorage.setItem(USERNAME_STRING, info.username);
    }

    public static getUserToken(): string {
        const token = localStorage.getItem(TOKEN_STRING);
        if(token === undefined || token === null) {
            throw new Error("User is not logged in");
        }
        return token;
    }

    public static getIsAdmin(): boolean {
        const isAdmin = localStorage.getItem(IS_ADMIN_STRING);
        if(isAdmin === undefined || isAdmin === null){
            throw new Error("User is not logged in");
        }
        return isAdmin === "true"? true : false;
    }

    public static emptyCache() {
        localStorage.removeItem(TOKEN_STRING);
        localStorage.removeItem(IS_ADMIN_STRING);
        localStorage.removeItem(USERNAME_STRING);
        localStorage.removeItem(PROFILE_STRING);
        for(const key of this.savedPreferencesKeys){
            localStorage.removeItem(key)
        }
    }

    public static getUsername(): string{
        const username = localStorage.getItem(USERNAME_STRING);
        if(username === undefined || username === null){
            throw new Error("user not logged in");
        }
        return username;
    }

    public static setProfile(profileName: string): void{
        localStorage.setItem(PROFILE_STRING, profileName);
    }

    public static getProfile(): string {
        const ret = localStorage.getItem(PROFILE_STRING);
        if(ret === null || ret === undefined){
            throw new Error("");
        }
        return ret;
    }

    public static setCurrentSchedule(schedule: Solution){
        localStorage.setItem(CURRENT_SCHEDULE, JSON.stringify(schedule));
    }

    public static getCurrentSchedule(): Solution | undefined {
        const savedSolution = localStorage.getItem(CURRENT_SCHEDULE);
        if(!savedSolution){
            return undefined
        }
        return JSON.parse(savedSolution) as Solution;
    }

    public static savePreferences(solution: Solution, preferences: SchedulePreferenceElement[]){
        const cacheKey = JSON.stringify(solution)
        localStorage.setItem(cacheKey, JSON.stringify(preferences))
        if(!this.savedPreferencesKeys.includes(cacheKey)){
            this.savedPreferencesKeys.push(cacheKey)
        }
    }

    public static getPreferences(solution: Solution): undefined | SchedulePreferenceElement[]{
        const savedPrefrences = localStorage.getItem(JSON.stringify(solution))
        if(!savedPrefrences){
            return undefined
        }
        return JSON.parse(savedPrefrences) as SchedulePreferenceElement[]
    }
}
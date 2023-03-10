import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  ADD_CONTRACT_URL,
  DELETE_CONTRACT,
  FETCH_CONTRACT_BY_NAME,
  FETCH_CONTRACT_NAMES,
  FETCH_SHIFT_GROUP_NAMES,
  FETCH_SHIFT_NAMES,
  FETCH_SHIFT_TYPE_NAMES,
  FETCH_SKILLS,
  LOGIN_URL,
  LOGOUT_URL,
  PROTOTYPE_SCHEDULE_URL,
  TEST_URL,
  UPDATE_CONTRACT_URL,
} from "src/app/constants/api-constants";
import { EmployeeSchedule } from "src/app/models/Assignment";
import { ContractInterface } from "src/app/models/Contract";
import { Credentials, UserInfo } from "src/app/models/Credentials";
import { CacheUtils, TOKEN_STRING } from "src/app/utils/CacheUtils";
import { Exception } from "src/app/utils/Exception";

@Injectable({
  providedIn: "root",
})
export class APIService {

  constructor(private httpClient: HttpClient) {}

  login(credentials:Credentials): Observable<UserInfo> {
    return this.httpClient.post<UserInfo>(LOGIN_URL, credentials);
  }

  logout():Observable<HttpResponse<string>>{
    try{
      let queryParams = new HttpParams();
      queryParams = queryParams.append(TOKEN_STRING, CacheUtils.getUserToken());
      return this.httpClient.post<HttpResponse<string>>(LOGOUT_URL, null, {
        params: queryParams
      });
    } catch(err){
      throw new Exception("user not logged in")
    }
  }

  test(): Observable<string> {
    return this.httpClient.get<string>(TEST_URL);
  }

  getPrototypeSchedule(): Observable<EmployeeSchedule> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("version", 1);
    return this.httpClient.get<EmployeeSchedule>(PROTOTYPE_SCHEDULE_URL, {
      params: queryParams,
    });
  }

  addContract(contract: ContractInterface):Observable<HttpResponse<string>>{
    try{
      let queryParams = new HttpParams();
      queryParams = queryParams.append(TOKEN_STRING, CacheUtils.getUserToken());
      return this.httpClient.post<HttpResponse<string>>(ADD_CONTRACT_URL, contract, {
        params: queryParams,
      });
    }catch(err){
      throw new Exception("user not logged in");
    }
  }

  getShiftNames():Observable<string[]> {
    try{
      let queryParams = new HttpParams();
      queryParams = queryParams.append(TOKEN_STRING, CacheUtils.getUserToken());
      return this.httpClient.get<string[]>(FETCH_SHIFT_NAMES, {
        params: queryParams,
      });
    }catch(err){
      throw new Exception("user not logged in")
    }
  }

  getShiftGroupNames():Observable<string[]> {
    try{
      let queryParams = new HttpParams();
      queryParams = queryParams.append(TOKEN_STRING, CacheUtils.getUserToken());
      return this.httpClient.get<string[]>(FETCH_SHIFT_GROUP_NAMES, {
        params: queryParams,
      });
    }catch(err){
      throw new Exception("user not logged in");
    }
  }

  getShiftTypeNames():Observable<string[]> {
    try{
      let queryParams = new HttpParams();
      queryParams = queryParams.append(TOKEN_STRING, CacheUtils.getUserToken());
      return this.httpClient.get<string[]>(FETCH_SHIFT_TYPE_NAMES, {
        params: queryParams,
      });
    }catch(err){
      throw new Exception("user not logged in");
    }
  }

  getContractNames():Observable<string[]> {
    try{
      let queryParams = new HttpParams();
      queryParams = queryParams.append(TOKEN_STRING, CacheUtils.getUserToken());
      return this.httpClient.get<string[]>(FETCH_CONTRACT_NAMES, {
        params: queryParams,
      });
    }catch(err){
      throw new Exception("user not logged in");
    }
  }

  getAllSkills(): Observable<string[]> {
    try{
      let queryParams = new HttpParams();
      queryParams = queryParams.append(TOKEN_STRING, CacheUtils.getUserToken());
      return this.httpClient.get<string[]>(FETCH_SKILLS, {
        params: queryParams,
      });
    }catch(err){
      throw new Exception("user not logged in");
    }
  }

  getContractByName(name:string):Observable<ContractInterface> {
    try{
      let queryParams = new HttpParams();
      queryParams = queryParams.append("name", name);
      queryParams = queryParams.append(TOKEN_STRING, CacheUtils.getUserToken());
      return this.httpClient.get<ContractInterface>(FETCH_CONTRACT_BY_NAME, {
        params: queryParams,
      })
    }catch(err){
      throw new Exception("user not logged in");
    }    
  }

  updateContract(contract: ContractInterface):Observable<HttpResponse<string>> {
    try{
      let queryParams = new HttpParams();
      queryParams = queryParams.append(TOKEN_STRING, CacheUtils.getUserToken());
      return this.httpClient.put<HttpResponse<string>>(UPDATE_CONTRACT_URL, contract, {
        params: queryParams,
      });
    }catch(err){
      throw new Exception("user not logged in");
    }
  }

  deleteContract(contract:string):Observable<HttpResponse<string>> {
    try{
      let queryParams = new HttpParams();
      queryParams = queryParams.append(TOKEN_STRING, CacheUtils.getUserToken());
      queryParams = queryParams.append("name", contract);
      return this.httpClient.delete<HttpResponse<string>>(DELETE_CONTRACT,{
        params: queryParams,
      });
    } catch(err){
      throw new Exception("user not logged in");
    }
  }
}

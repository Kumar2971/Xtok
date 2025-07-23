import LeaderboardModel from "../models/Leaderboard.model";

export enum APICallID {
  getLiveStreamAcceptorList = "getLiveStreamAcceptorList",
  getLiveStreamDonatorList = "getLiveStreamDonatorList",
}

export interface Meta {
  message: string;
}

export interface ApiResponse {
  data: LeaderboardModel[];
  meta?: Meta;
  message?: string;
}

export interface IHandleRestAPIResponse {
  callid: APICallID;
  response: ApiResponse;
  error?: object;
}

export interface ApiCallData {
  callID: string;
  header?: Record<string, string>;
  endpoint: string;
  method: string;
  body?: Record<string, string>;
}

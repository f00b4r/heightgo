import { get, post } from "./../httpclient";
import { RequestOptions } from "https";
import { URL } from "url";
import _ from "lodash";
import CONFIG from "./../config";

export async function createTask(task: HeightTask): Promise<HeightTask> {
  return await doRequest(`tasks`, task);
}

export async function createActivity(task: HeightActivity): Promise<HeightActivity> {
  return await doRequest(`activities`, task);
}

async function doRequest(path: string, data: object | null, options: RequestOptions = {}): Promise<any> {
  if (!CONFIG.height) {
    throw "Missing height.token";
  }

  // Default options
  const defaultOptions: RequestOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Authorization
  const authOptions: RequestOptions = {
    headers: {
      'Authorization': `api-key ${CONFIG.height.token}`,
    },
  }

  const url = new URL(`https://api.height.app/${path}`);

  if (data) {
    return await post(url, data, _.merge(defaultOptions, authOptions, options));
  } else {
    return await get(url, _.merge(defaultOptions, authOptions, options));
  }
}

import { get } from "./../httpclient";
import { RequestOptions } from "https";
import { URL } from "url";
import CONFIG from "./../config";

export async function fetchOrganization(org: string): Promise<GithubOrg> {
  return await doGet(`orgs/${org}`);
}

export async function fetchRepositories(org: string): Promise<GithubOrg> {
  return await doGet(`orgs/${org}/repos?per_page=200`);
}

export async function fetchTeam(org: string): Promise<GithubMember[]> {
  const data = await doGet(`orgs/${org}/members`);

  return data as GithubMember[];
}

async function doGet(path: string, options: RequestOptions = {}): Promise<any> {
  if (!CONFIG.github) {
    throw "Missing github.token";
  }

  // Authorization
  const authOptions: RequestOptions = {
    headers: {
      'Authorization': `token ${CONFIG.github.token}`
    },
  }

  const url = new URL(`https://api.github.com/${path}`);

  const data = await get(url, {
    ...authOptions,
    ...options
  });

  return data;
}

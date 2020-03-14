import { get } from "./../httpclient";
import { RequestOptions } from "https";
import { URL } from "url";
import CONFIG from "./../config";

export async function fetchBoardCards(boardId: string): Promise<TrelloCard[]> {
  return await doGet(`1/boards/${boardId}/cards/all`);
}

export async function fetchCardActions(cardId: string): Promise<TrelloCardAction[]> {
  return await doGet(`1/cards/${cardId}/actions`);
}

async function doGet(path: string, options: RequestOptions = {}): Promise<any> {
  if (!CONFIG.trello) {
    throw "Missing trello.key and trello.token";
  }

  const url = new URL(`https://api.trello.com/${path}`);

  // Authorization
  url.searchParams.append('key', CONFIG.trello.key);
  url.searchParams.append('token', CONFIG.trello.token);

  const data = await get(url, {
    ...options
  });

  return data;
}

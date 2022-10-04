import { request } from "."

export const getAllGames = async () => {
  return request.get('/games')
}

export interface adRequest {
  game: string,
  name: string,
  yearsPlaying: number,
  discord: string,
  weekDays: number[],
  hourStart: string,
  hourEnd: string,
  useVoiceChannel: boolean,
}

export const postAd = async (body: adRequest) => {
  return request.post(`/games/${body.game}/ads`, body)
}
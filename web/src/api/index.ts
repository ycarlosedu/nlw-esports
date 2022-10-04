import axios from "axios";

export const request = axios.create({
  baseURL: 'http://localhost:3333/',
  timeout: 30000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  }
});
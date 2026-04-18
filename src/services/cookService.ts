import { api } from "./api";
import type { Cook } from "../types";

export const getCooks = async (): Promise<Cook[]> => {
  const response = await api.get<Cook[]>("/cooks");
  return response.data;
};

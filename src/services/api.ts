import axios from "axios";

import { APP_CONFIG } from "../config/env";

export const api = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
  timeout: 10000,
});

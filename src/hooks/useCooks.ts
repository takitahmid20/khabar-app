import { useEffect, useState } from "react";

import { getCooks } from "../services/cookService";
import type { Cook } from "../types";
import { getErrorMessage } from "../utils/error";

export const useCooks = () => {
  const [data, setData] = useState<Cook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchCooks = async () => {
      try {
        const cooks = await getCooks();
        if (active) {
          setData(cooks);
        }
      } catch (err) {
        if (active) {
          setError(getErrorMessage(err));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchCooks();

    return () => {
      active = false;
    };
  }, []);

  return { data, loading, error };
};

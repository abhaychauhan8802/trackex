import { useCallback, useState } from "react";

import axios from "@/config/axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";

type HttpMethod = "get" | "post" | "put" | "delete";

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T = any>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const request = useCallback(
    async (
      method: HttpMethod,
      url: string,
      options?: {
        data?: any;
        params?: any;
        config?: AxiosRequestConfig;
      }
    ): Promise<AxiosResponse<T> | void> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await axios.request<T>({
          method,
          url,
          data: options?.data,
          params: options?.params,
          ...options?.config,
        });

        setState({ data: response.data, loading: false, error: null });
        return response;
      } catch (err: any) {
        setState({
          data: null,
          loading: false,
          error: err.response?.data?.message || err.message,
        });
      }
    },
    []
  );

  return { ...state, request };
}
